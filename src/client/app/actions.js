export const ACTIONS = {
    ADD_COMMAND_WORD: 'ADD_COMMAND_WORD'
};

export function addCommandWord(word) {
    return { type: ACTIONS.ADD_COMMAND_WORD, word };    
};
