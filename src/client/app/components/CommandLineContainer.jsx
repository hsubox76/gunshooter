import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Container from './Container';

function mapStateToProps(state) {
 return {
     commandLine: state.commandLine
 };
}

class CommandLineContainer extends Component {
    render() {
        const commandLineContent = this.props.commandLine.length === 0
            ? (<div className="command-line empty">(click some words)</div>)
            : (<div className="command-line">
                    {_.map(this.props.commandLine, (word) => {
                        return (<div className="command-line-word" key={word.word}>{word.word}</div>);
                    })}
                </div>);
        return (
            <div className="container command-line-container">
                <div className="prompt-text">What do I do next?</div>
                {commandLineContent}
            </div>
        );
    }
}

CommandLineContainer.propTypes = {

};

export default connect(mapStateToProps)(CommandLineContainer);