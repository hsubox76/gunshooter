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
            return state.concat({header: roomsById[action.roomId].title, text: roomsById[action.roomId].description});
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

export function mainReducer(state = {}, action) {
    return _.extend({}, state, {
        commandLine: commandLineReducer(state.commandLine, action),
        log: logReducer(state.log, action, state.roomsById),
        currentRoomId: currentRoomIdReducer(state.currentRoomId, action)
    });
};
