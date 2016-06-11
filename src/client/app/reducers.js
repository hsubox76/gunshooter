import { ACTIONS } from './actions';

export function commandLineReducer(state = [], action) {
  switch(action.type) {
      case ACTIONS.ADD_COMMAND_WORD:
        return state.concat(action.word);
      default:
        return state;
  }  
};

export function logReducer(state = [], action, rooms) {
    switch(action.type) {
        case ACTIONS.EXECUTE_COMMAND:
            const commandLineText = _.map(action.commandLine, (commandLineWord) => {
                return commandLineWord.word;
            }).join(' ');
            return state.concat({text: commandLineText + '.'});
        case ACTIONS.CHANGE_ROOM:
            return state.concat({header: rooms[action.roomId].title, text: rooms[action.roomId].description});
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
        log: logReducer(state.log, action, state.rooms),
        currentRoomId: currentRoomIdReducer(state.currentRoomId, action)
    });
};
