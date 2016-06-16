export const ACTIONS = {
    ADD_COMMAND_WORD: 'ADD_COMMAND_WORD',
    REMOVE_COMMAND_WORD: 'REMOVE_COMMAND_WORD',
    CHANGE_ROOM: 'CHANGE_ROOM',
    LOG_COMMAND: 'LOG_COMMAND',
    LOG_TEXT: 'LOG_TEXT',
    CLEAR_COMMAND_LINE: 'CLEAR_COMMAND_LINE',
    TAKE_ITEM: 'TAKE_ITEM',
    DROP_ITEM: 'DROP_ITEM'
};

export function addCommandWord(word) {
    return { type: ACTIONS.ADD_COMMAND_WORD, word };    
};

export function removeCommandWord() {
    return { type: ACTIONS.REMOVE_COMMAND_WORD };    
};

export function clearCommandLine() {
    return { type: ACTIONS.CLEAR_COMMAND_LINE };    
};

export function logCommand(commandLine) {
    return { type: ACTIONS.LOG_COMMAND, commandLine };    
};

export function logText(text) {
    return { type: ACTIONS.LOG_TEXT, text };    
};

export function changeRoom(roomId) {
    return { type: ACTIONS.CHANGE_ROOM, roomId };
};

export function takeItem(item) {
    return { type: ACTIONS.TAKE_ITEM, item };
};

export function dropItem(item) {
    return { type: ACTIONS.DROP_ITEM, item };
};
