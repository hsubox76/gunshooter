import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/main.scss';
import 'font-awesome/css/font-awesome.css';
import LogContainer from './LogContainer';
import RoomContainer from './RoomContainer';
import InventoryContainer from './InventoryContainer';
import ActionsContainer from './ActionsContainer';
import CommandLineContainer from './CommandLineContainer';

import * as Actions from '../actions/actions';

function mapStateToProps(state) {
 return {
     gameState: state.gameState
 };
}

function mapDispatchToActions(dispatch) {
    return { actions: bindActionCreators(Actions, dispatch) };
}

class App extends React.Component {
  componentDidMount () {
    this.props.actions.initAll();
  }
  render () {
    if (!this.props.gameState.loaded) {
      return null;
    }
    return (
      <div className="main-unit pure-u-1">
        <div className="main-container pure-g">
          <div className="side-margin pure-u-0 pure-u-sm-0 pure-u-md-1-8 pure-u-lg-1-5"></div>
          <div className="content-container pure-u-1 pure-u-sm-1 pure-u-md-3-4 pure-u-lg-3-5">
            <div className="pure-g">
              <CommandLineContainer />
              <div className="top-spacer pure-u-1"></div>
              <div className="column pure-u-1">
                <LogContainer />
              </div>
              <div className="column pure-u-1 pure-u-sm-2-3 pure-u-md-2-3 pure-u-lg-2-3">
                <RoomContainer />
              </div>
              <div className="column pure-u-1 pure-u-sm-1-3 pure-u-md-1-3 pure-u-lg-1-3">
                <InventoryContainer />
                <ActionsContainer />
              </div>
            </div>
          </div>
          <div className="side-margin pure-u-0 pure-u-sm-0 pure-u-md-1-8 pure-u-lg-1-5"></div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToActions)(App);