import { ACTION_WORDS } from '../data/action-words';
import _ from 'lodash';

function executeTake(mainObject, inventory, actions) {
    if (!mainObject) {
        actions.logText("Take what?");
        return;
    }
    if (mainObject.id[0] === 'i') {
        if (_.includes(inventory, mainObject.id)) {
            actions.logText('I already have that.');
        } else {
            actions.takeItem(mainObject);
        }
    } else {
        actions.logText('I can\'t take that.');
    }
}

function executeDrop(mainObject, inventory, actions) {
    if (!mainObject) {
        actions.logText("I drop dramatically to the floor.");
        return;
    }
    if (mainObject.id[0] === 'i') {
        if (_.includes(inventory, mainObject.id)) {
            actions.dropItem(mainObject);
        } else {
            actions.logText('I don\'t have that.');
        }
    } else {
        actions.logText('I can\'t take that.');
    }
}

function executeShoot(mainObject, inventory, actions, gunChanges) {
    if (!mainObject) {
        actions.logText("Shoot what?");
        return;
    }
    if (gunChanges && gunChanges.bulletCount === 0) {
        actions.logText("I'm out of bullets.");
        return;
    }
    if (mainObject.id[0] === 'i') {
        if (_.includes(inventory, mainObject.id)) {
            actions.logText('I try not to shoot things I\'m holding.');
        } else {
            actions.decrementBullets();
            actions.logText('I shoot the ' + mainObject.word + '.');
            if (gunChanges && gunChanges.bulletCount === 1) {
                actions.logText('That was my last bullet.');
            }
        }
    } else {
        actions.decrementBullets();
        actions.logText('I shoot the ' + mainObject.word + '.');
    }
}

function executeLook(mainObject, actions) {
    if (!mainObject) {
        actions.logText("Look at what?");
        return;
    }
    if (mainObject.id === 'i1001') {
        actions.logText(mainObject.description);
        const bulletWord = mainObject.bulletCount === 1 ? 'bullet' : 'bullets';
        actions.logText('It has ' + mainObject.bulletCount + ' ' + bulletWord + ' left.');
    } else {
        actions.logText(mainObject.description);
    }
}

export function executeCommand(commandLine, inventory, actions, itemChanges) {
    if (commandLine.length > 0) {
        const commandWord = commandLine[0];
        const mainObject = commandLine[1];
        let updatedMainObject = mainObject;
        if (mainObject.id[0] === 'i') {
            updatedMainObject = _.extend({}, mainObject, itemChanges[mainObject.id]);
        }
        switch(commandWord.word) {
            case ACTION_WORDS.LOOK:
                executeLook(updatedMainObject, actions);
                break;
            case ACTION_WORDS.TAKE:
                executeTake(updatedMainObject, inventory, actions);
                break;
            case ACTION_WORDS.DROP:
                executeDrop(updatedMainObject, inventory, actions);
                break;
            case ACTION_WORDS.SHOOT:
                executeShoot(updatedMainObject, inventory, actions, itemChanges['i1001']);
                break;
            default:
                actions.logText('Nothing happens.');
        }
    }
}
 