import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Container from './Container';
import * as Actions from '../actions/actions';
import * as CommandActions from '../actions/command-actions';

function mapStateToProps(state) {
 return {
     commandLine: state.commandLine,
     inventory: state.inventory,
     itemChanges: state.itemChanges
 };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
        commandActions: bindActionCreators(CommandActions, dispatch)
    }
}

class CommandLineContainer extends Component {
    constructor(props) {
        super(props);
        this.executeCommand = this.executeCommand.bind(this);
        this.adjustWidth = this.adjustWidth.bind(this);
        this.state = {
            width: 200
        }
    }
    adjustWidth() {
        const container = document.getElementsByClassName('content-container');
        const width = container[0].clientWidth;
        this.setState({width: width});
    }
    componentDidMount() {
        this.adjustWidth();
        window.addEventListener('resize', this.adjustWidth);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.adjustWidth);
    }
    executeCommand() {
        this.props.actions.logCommand(this.props.commandLine);
        this.props.commandActions.executeCommand(this.props.commandLine, this.props.inventory, this.props.actions, this.props.itemChanges);
        this.props.actions.clearCommandLine();
    }
    render() {
        const style = {
            width: this.state.width + 'px'
        };
        const commandLineContent = this.props.commandLine.length === 0
            ? (<div className="command-line empty">(click some words)</div>)
            : (<div className="command-line">
                    {_.map(this.props.commandLine, (word, index) => {
                        return (
                            <div className={'command-line-word ' + 'word-type-' + word.wordType}
                                 key={word.word}>
                                {word.word} {word.preposition && index < this.props.commandLine.length - 1 ? word.preposition : null}
                            </div>
                            );
                    })}
                </div>);
        return (
            <div className="command-line-area pure-u-1" style={style}>
                <div className="container command-line-container">
                    <div className="prompt-text">What next?</div>
                    {commandLineContent}
                    <div className="command-line-buttons">
                        <div className="button backspace-button" onClick={this.props.actions.removeCommandWord}>
                            <span className="fa fa-undo"></span>
                        </div>
                        <div
                            className="button execute-button"
                            onClick={this.executeCommand}>
                            <span className="fa fa-thumbs-up"></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CommandLineContainer.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(CommandLineContainer);