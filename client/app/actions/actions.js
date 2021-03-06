import * as api from '../api/api';

export const ACTIONS = {
    ADD_COMMAND_WORD: 'ADD_COMMAND_WORD',
    REMOVE_COMMAND_WORD: 'REMOVE_COMMAND_WORD',
    LOG_COMMAND: 'LOG_COMMAND',
    LOG_TEXT: 'LOG_TEXT',
    CLEAR_COMMAND_LINE: 'CLEAR_COMMAND_LINE',
    TAKE_ITEM: 'TAKE_ITEM',
    DROP_ITEM: 'DROP_ITEM',
    LEAVE_ROOM: 'LEAVE_ROOM',
    ENTER_ROOM: 'ENTER_ROOM',
    ADD_ITEMS: 'ADD_ITEMS',
    SET_GAME_LOADED: 'SET_GAME_LOADED',
    SET_ROOM_LOADED: 'SET_ROOM_LOADED',
    DECREMENT_BULLETS: 'DECREMENT_BULLETS'
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

export function enterRoom(roomData) {
    return { type: ACTIONS.ENTER_ROOM, roomData }
};

export function leaveRoom(roomData) {
    return { type: ACTIONS.LEAVE_ROOM, roomData }
};

export function takeItem(item) {
    return (dispatch, getState) => {
        const currentRoom = getState().currentRoom;
        dispatch({ type: ACTIONS.TAKE_ITEM, item, currentRoom });
    }
};

export function dropItem(item) {
    return (dispatch, getState) => {
        const currentRoom = getState().currentRoom;
        dispatch({ type: ACTIONS.DROP_ITEM, item, currentRoom });
    }
};

export function addItems(items) {
    return { type: ACTIONS.ADD_ITEMS, items };
}

export function setRoomLoaded() {
    return { type: ACTIONS.SET_ROOM_LOADED };
}

export function setGameLoaded() {
    return { type: ACTIONS.SET_GAME_LOADED };
}

export function decrementBullets(count = 1) {
    return (dispatch, getState) => {
        const items = getState().items;
        dispatch({ type: ACTIONS.DECREMENT_BULLETS, items, count });
    }
}

export function changeRoom(roomId) {
    return (dispatch, getState) => {
        const oldRoom = getState().currentRoom;
        const roomChanges = getState().roomChanges;
        api.fetchRoom(roomId)
            .then((data) => {
                dispatch(leaveRoom(oldRoom));
                const currentRoomChanges = roomChanges[data.id] || {};
                const room = _.extend({}, data, currentRoomChanges);
                dispatch(enterRoom(room));
                return room;
            })
            .then((room) => {
                if (room.itemIds) {
                    return api.fetchItems(room.itemIds);
                }
            })
            .then((items) => {
                dispatch(addItems(items));
                dispatch(setRoomLoaded());
                dispatch(setGameLoaded());
            })
            .catch((error) => {
                console.error(error);
            })
    }
};

export function initAll() {
    return (dispatch, getState) => {
        const inventory = getState().inventory;
        dispatch(changeRoom(1));
        dispatch(logText("He picked us all for different reasons. Some were ninjas, assassins, "
            + "ninja assassins, ex-MMA guys, soldiers, cyborgs - I think I even saw a werewolf. "
            + "He picked me because I'm good at shooting."));
        dispatch(logText("He kidnapped us all and dumped us on his private island. The sedative kicked in "
            + "while he was explaining so I'm a little fuzzy but I think he means to hunt us all for sport. "
            + "When I wake up, I find myself in a hedge maze."));
        api.fetchItems(inventory)
            .then((items) => {
                dispatch(addItems(items));
            });
    }
}