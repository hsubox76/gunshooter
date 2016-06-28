import { ACTION_WORDS } from '../data/action-words';
import * as Actions from './actions';
import _ from 'lodash';

export function executeTake(mainObject, state, dispatch) {
    if (!mainObject) {
        dispatch(Actions.logText("Take what?"));
        return;
    }
    if (mainObject.id[0] === 'i') {
        if (_.includes(state.inventory, mainObject.id)) {
            dispatch(Actions.logText('I already have that.'));
        } else {
            dispatch(Actions.takeItem(mainObject));
        }
    } else {
        dispatch(Actions.logText('I can\'t take that.'));
    }
}

export function executeDrop(mainObject, state, dispatch) {
    if (!mainObject) {
        dispatch(Actions.logText("I drop dramatically to the floor."));
        return;
    }
    if (mainObject.id[0] === 'i') {
        if (_.includes(state.inventory, mainObject.id)) {
            dispatch(Actions.dropItem(mainObject));
        } else {
            dispatch(Actions.logText('I don\'t have that.'));
        }
    } else {
        dispatch(Actions.logText('I can\'t take that.'));
    }
}

export function executeShoot(mainObject, state, dispatch) {
    if (!mainObject) {
        dispatch(Actions.logText("Shoot what?"));
        return;
    }
    if (!_.includes(state.inventory, 'i1001')) {
        dispatch(Actions.logText('I don\'t have a gun.'));
        return;
    }
    const bulletCount = _.has(state, 'itemChanges.i1001.bulletCount')
        ? state.itemChanges['i1001'].bulletCount : state.items['i1001'].bulletCount;
    if (bulletCount === 0) {
        dispatch(Actions.logText("I'm out of bullets."));
        return;
    }
    if (mainObject.id[0] === 'i') {
        if (_.includes(state.inventory, mainObject.id)) {
            dispatch(Actions.logText('I try not to shoot things I\'m holding.'));
        } else {
            dispatch(Actions.decrementBullets());
            dispatch(Actions.logText('I shoot the ' + mainObject.word + '.'));
            if (bulletCount === 1) {
                dispatch(Actions.logText('That was my last bullet.'));
            }
        }
    } else {
        dispatch(Actions.decrementBullets());
        dispatch(Actions.logText('I shoot the ' + mainObject.word + '.'));
    }
}

export function executeLook(mainObject, state, dispatch) {
    if (!mainObject) {
        dispatch(Actions.logText("Look at what?"));
        return;
    }
    if (mainObject.id === 'i1001') {
        dispatch(Actions.logText(mainObject.description));
        const bulletWord = mainObject.bulletCount === 1 ? 'bullet' : 'bullets';
        dispatch(Actions.logText('It has ' + mainObject.bulletCount + ' ' + bulletWord + ' left.'));
    } else {
        dispatch(Actions.logText(mainObject.description));
    }
}

export function executeCommand(commandLine) {
    return (dispatch, getState) => {
        const state = getState();
        if (commandLine.length > 0) {
            const commandWord = commandLine[0];
            const mainObject = commandLine[1];
            let updatedMainObject = mainObject;
            if (mainObject.id[0] === 'i') {
                updatedMainObject = _.extend({}, mainObject, state.itemChanges[mainObject.id]);
            }
            switch(commandWord.word) {
                case ACTION_WORDS.LOOK:
                    executeLook(updatedMainObject, state, dispatch);
                    break;
                case ACTION_WORDS.TAKE:
                    executeTake(updatedMainObject, state, dispatch);
                    break;
                case ACTION_WORDS.DROP:
                    executeDrop(updatedMainObject, state, dispatch);
                    break;
                case ACTION_WORDS.SHOOT:
                    executeShoot(updatedMainObject, state, dispatch);
                    break;
                default:
                    actions.logText('Nothing happens.');
            }
        }
    }
}
