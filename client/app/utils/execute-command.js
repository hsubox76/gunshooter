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

function executeShoot(mainObject, inventory, actions) {
    if (!mainObject) {
        actions.logText("Shoot what?");
        return;
    }
    if (mainObject.id[0] === 'i') {
        if (_.includes(inventory, mainObject.id)) {
            actions.dropItem(mainObject);
        } else {
            actions.logText('I try not to shoot things I\'m holding.');
        }
    } else {
        actions.logText('I can\'t take that.');
    }
}

export function executeCommand(commandLine, inventory, actions) {
    if (commandLine.length > 0) {
        const commandWord = commandLine[0];
        const mainObject = commandLine[1];
        switch(commandWord.word) {
            case ACTION_WORDS.LOOK:
                if (commandLine.length === 2) {
                    actions.logText(mainObject.description);
                } else {
                    actions.logText("Look at what?");
                }
                break;
            case ACTION_WORDS.TAKE:
                executeTake(mainObject, inventory, actions);
                break;
            case ACTION_WORDS.DROP:
                executeDrop(mainObject, inventory, actions);
                break;
            default:
                actions.logText('Nothing happens.');
        }
    }
}
 