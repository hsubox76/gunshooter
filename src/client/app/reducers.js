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

export function logReducer(state = [], action, roomsById) {
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
            const roomDescription = roomsById[action.roomId].description.replace(/\|\~.*?\:(.*?)\|/g, '$1');
            return state.concat({header: roomsById[action.roomId].title, text: roomDescription});
        default:
            return state;
    }
}

export function currentRoomIdReducer(state = 0, action) {
    switch(action.type) {
        case ACTIONS.CHANGE_ROOM:
            return action.roomId;
        default:
            return state;
    }
}

export function roomItemsReducer(state = [], action, roomsById, items) {
    switch(action.type) {
        case ACTIONS.CHANGE_ROOM:
            return _.map(roomsById[action.roomId].itemIds, (itemId) => {
                return _.find(items, {id: itemId});
            });
        case ACTIONS.TAKE_ITEM:
            const itemIndex = _.findIndex(state, {id: action.item.id});
            return [...state.slice(0, itemIndex), ...state.slice(itemIndex + 1)];
        default:
            return state;
    }
}

export function inventoryReducer(state = [], action) {
    switch(action.type) {
        case ACTIONS.TAKE_ITEM:
            return state.concat(action.item);
        default:
            return state;
    }
}

export function mainReducer(state = {}, action) {
    return _.extend({}, state, {
        commandLine: commandLineReducer(state.commandLine, action),
        log: logReducer(state.log, action, state.roomsById),
        currentRoomId: currentRoomIdReducer(state.currentRoomId, action),
        roomItems: roomItemsReducer(state.roomItems, action, state.roomsById, state.items),
        inventory: inventoryReducer(state.inventory, action)
    });
};
