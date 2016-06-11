import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Container from './Container';

function mapStateToProps(state) {
 return {
     commands: state.commands
 };
}

class KeywordsContainer extends Component {
    render() {
        return (
            <Container
                id="keywords"
                displayName="Commands">
                {_.map(this.props.commands, (command) => {
                    return (<div className="keyword-command">{command.word}</div>);
                })}
            </Container>
        );
    }
}

KeywordsContainer.propTypes = {

};

export default connect(mapStateToProps)(KeywordsContainer);