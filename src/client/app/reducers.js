import { ACTIONS } from './actions';

export function commandLineReducer(state = [], action) {
  switch(action.type) {
      case ACTIONS.ADD_COMMAND_WORD:
        return state.concat(action.word);
      case ACTIONS.REMOVE_COMMAND_WORD:
        return state.slice(0, -1);
      case ACTIONS.CLEAR_COMMAND_LINE:
        return [];
      default:
        return state;
  }  
};

export function logReducer(state = [], action, rooms) {
    switch(action.type) {
        case ACTIONS.LOG_COMMAND:
            const commandLineText = _.map(action.commandLine, (commandLineWord, index) => {
                return commandLineWord.word
                    + (commandLineWord.preposition && index < action.commandLine.length - 1
                        ? ' ' + commandLineWord.preposition : '');
            }).join(' ');
            return state.concat({text: '> ' + commandLineText});
        case ACTIONS.LOG_TEXT:
            return state.concat({text: action.text});
        case ACTIONS.CHANGE_ROOM:
            const roomDescription = rooms[action.roomId].description.replace(/\|\~.*?\:(.*?)\|/g, '$1');
            return state.concat({header: rooms[action.roomId].title, text: roomDescription});
        case ACTIONS.TAKE_ITEM:
            return state.concat({text: 'I pick up the ' + action.item.word + '.'});
        case ACTIONS.DROP_ITEM:
            return state.concat({text: 'I drop the ' + action.item.word + '.'});
        default:
            return state;
    }
}

export function currentRoomIdReducer(state = {}, action) {
    switch(action.type) {
        case ACTIONS.CHANGE_ROOM:
            return action.roomId;
        default:
            return state;
    }
}

export function inventoryReducer(state = [], action) {
    switch(action.type) {
        case ACTIONS.TAKE_ITEM:
            return state.concat(action.item);
        case ACTIONS.DROP_ITEM:
            const itemIndex = _.findIndex(state, {id: action.item.id});
            return [...state.slice(0, itemIndex), ...state.slice(itemIndex + 1)];
        default:
            return state;
    }
}

export function room_itemIdsReducer(state = [], action) {
    switch(action.type) {
        case ACTIONS.TAKE_ITEM:
            const itemIndex = _.findIndex(state, (itemId) => { return itemId === action.item.id; });
            return [...state.slice(0, itemIndex), ...state.slice(itemIndex + 1)];
        case ACTIONS.DROP_ITEM:
            return state.concat(action.item.id);
        default:
            return state;
    }
}

export function roomReducer(state = {}, action) {
    switch(action.type) {
        case ACTIONS.TAKE_ITEM:
        case ACTIONS.DROP_ITEM:
            return _.extend({}, state, { itemIds: room_itemIdsReducer(state.itemIds, action) });
        default:
            return state;
    }
}

export function roomsReducer(state = {}, action, currentRoomId) {
    switch(action.type) {
        case ACTIONS.TAKE_ITEM:
        case ACTIONS.DROP_ITEM:
            return _.extend({}, state, { [currentRoomId]: roomReducer(state[currentRoomId], action) });
        default:
            return state;
    }
}

export function mainReducer(state = {}, action) {
    return _.extend({}, state, {
        commandLine: commandLineReducer(state.commandLine, action),
        log: logReducer(state.log, action, state.rooms),
        currentRoomId: currentRoomIdReducer(state.currentRoomId, action),
        rooms: roomsReducer(state.rooms, action, state.currentRoomId),
        // roomItems: roomItemsReducer(state.roomItems, action, items),
        inventory: inventoryReducer(state.inventory, action)
    });
};
