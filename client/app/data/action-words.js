import _ from 'lodash';

export const ACTION_WORDS = {
    LOOK: 'look at',
    TAKE: 'take',
    SHOOT: 'shoot',
    USE: 'use',
    DROP: 'drop'
};

const actions = [
    {
        id: 1,
        word: ACTION_WORDS.LOOK,
        clickable: true,
        visible: true
    },
    {
        id: 2,
        word: ACTION_WORDS.TAKE,
        clickable: true,
        visible: true
    },
    {
        id: 3,
        word: ACTION_WORDS.SHOOT,
        clickable: true,
        visible: true
    },
    {
        id: 4,
        word: ACTION_WORDS.USE,
        preposition: 'on',
        clickable: true,
        visible: true
    },
    {
        id: 5,
        word: ACTION_WORDS.DROP,
        clickable: true,
        visible: true
    }
];

const actionsByWord = _.keyBy(actions, 'word');

export default actionsByWord;
