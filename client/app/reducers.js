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
            return state.concat({text: '> ' + commandLineText, class: 'log-command'});
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

export function currentRoomReducer(state = {}, action) {
    switch(action.type) {
        case ACTIONS.DROP_ITEM:
        case ACTIONS.TAKE_ITEM:
            return _.extend({}, state, { itemIds: room_itemIdsReducer(state.itemIds, action) });
        case ACTIONS.ENTER_ROOM:
            return action.roomData;
        default:
            return state;
    }
}

export function inventoryReducer(state = [], action) {
    switch(action.type) {
        case ACTIONS.TAKE_ITEM:
            return state.concat(action.item.id);
        case ACTIONS.DROP_ITEM:
            const itemIndex = _.findIndex(state, item => action.item.id);
            return [...state.slice(0, itemIndex), ...state.slice(itemIndex + 1)];
        default:
            return state;
    }
}


// export function roomsReducer(state = {}, action, currentRoomId) {
//     switch(action.type) {
//         case ACTIONS.TAKE_ITEM:
//         case ACTIONS.DROP_ITEM:
//             return _.extend({}, state, { [currentRoomId]: roomReducer(state[currentRoomId], action) });
//         default:
//             return state;
//     }
// }

export function itemsReducer(state = {}, action) {
    switch(action.type) {
        case ACTIONS.ADD_ITEMS:
            return _.extend({}, state, action.items);
        default:
            return state;
    }
}

export function gameStateReducer(state = {}, action) {
    switch(action.type) {
        case ACTIONS.SET_GAME_LOADED:
            return _.extend({}, state, { loaded: true });
        case ACTIONS.SET_ROOM_LOADED:
            return _.extend({}, state, { roomLoaded: true });
        case ACTIONS.LEAVE_ROOM:
            return _.extend({}, state, { roomLoaded: false });
        default:
            return state;
    }
}

export function singleRoomChangeReducer(state = {}, action) {
    switch(action.type) {
        case ACTIONS.TAKE_ITEM:
            const itemIds = action.currentRoom.itemIds;
            const itemIndex = _.findIndex(itemIds, itemId => itemId === action.item.id);
            return _.extend({}, state, {
                itemIds: [...itemIds.slice(0, itemIndex), ...itemIds.slice(itemIndex + 1)]
            });
        case ACTIONS.DROP_ITEM:
            return _.extend({}, state, {
                itemIds: action.currentRoom.itemIds.concat(action.item.id)
            });
        default:
            return state;
    }
}

export function roomChangesReducer(state = {}, action) {
    switch(action.type) {
        case ACTIONS.DROP_ITEM:
        case ACTIONS.TAKE_ITEM:
            return _.extend({}, state, {
                [action.currentRoom.id] : singleRoomChangeReducer(state[action.currentRoom.id], action)
            });
        default:
            return state;
    }
}

export function mainReducer(state = {}, action) {
    return _.extend({}, state, {
        gameState: gameStateReducer(state.gameState, action),
        commandLine: commandLineReducer(state.commandLine, action),
        log: logReducer(state.log, action, state.rooms),
        currentRoom: currentRoomReducer(state.currentRoom, action),
        items: itemsReducer(state.items, action),
        // roomItems: roomItemsReducer(state.roomItems, action, items),
        inventory: inventoryReducer(state.inventory, action),
        roomChanges: roomChangesReducer(state.roomChanges, action)
    });
};
