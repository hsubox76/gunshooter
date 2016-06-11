import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Container from './Container';

function mapStateToProps(state) {
 return {
     log: state.log
 };
}

class LogContainer extends Component {
    render() {
        return (
            <Container
                id="log"
                displayName="Log">
                <div className="log-content">
                    {_.map(this.props.log, (entry, index) => {
                      return (
                        <div key={index}>
                            {entry.header || null}
                            <div>{entry.text}</div>
                        </div>);  
                    })}
                </div>
            </Container>
        );
    }
}

LogContainer.propTypes = {

};

export default connect(mapStateToProps)(LogContainer);