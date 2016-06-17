import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Container from './Container';

function mapStateToProps(state) {
 return {
     log: state.log
 };
}

class LogContainer extends Component {
    componentDidUpdate(prevProps, prevState) {
        this.refs.logContent.scrollTop = this.refs.logContent.scrollHeight;
    }
    render() {
        return (
            <Container
                id="log"
                displayName="Log">
                <div ref="logContent" className="log-content">
                    {_.map(this.props.log, (entry, index) => {
                      return (
                        <div key={index}>
                            {(<div className="log-header">{entry.header}</div>) || null}
                            <div className={"log-entry-text " + entry.class}>{entry.text}</div>
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