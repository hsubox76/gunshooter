export const ACTIONS = {
    ADD_COMMAND_WORD: 'ADD_COMMAND_WORD',
    EXECUTE_COMMAND: 'EXECUTE_COMMAND',
    CHANGE_ROOM: 'CHANGE_ROOM'
};

export function addCommandWord(word) {
    return { type: ACTIONS.ADD_COMMAND_WORD, word };    
};

export function executeCommand(commandLine) {
    return { type: ACTIONS.EXECUTE_COMMAND, commandLine };    
};

export function changeRoom(roomId) {
    return { type: ACTIONS.CHANGE_ROOM, roomId };
};