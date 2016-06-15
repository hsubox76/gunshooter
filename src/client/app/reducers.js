import { ACTIONS } from './actions';
import items from './data/items';
import rooms from './data/rooms';

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

export function logReducer(state = [], action) {
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
        default:
            return state;
    }
}

export function currentRoomReducer(state = {}, action) {
    switch(action.type) {
        case ACTIONS.CHANGE_ROOM:
            return rooms[action.roomId];
        default:
            return state;
    }
}

export function roomItemsReducer(state = [], action) {
    switch(action.type) {
        case ACTIONS.CHANGE_ROOM:
            return _.map(rooms[action.roomId].itemIds, (itemId) => {
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
        log: logReducer(state.log, action),
        currentRoom: currentRoomReducer(state.currentRoom, action),
        roomItems: roomItemsReducer(state.roomItems, action),
        inventory: inventoryReducer(state.inventory, action)
    });
};
