import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import 'font-awesome/css/font-awesome.css';
import LogContainer from './components/LogContainer';
import RoomContainer from './components/RoomContainer';
import InventoryContainer from './components/InventoryContainer';
import ActionsContainer from './components/ActionsContainer';
import CommandLineContainer from './components/CommandLineContainer';

class App extends React.Component {
  render () {
    return (
      <div className="main-unit pure-u-1">
        <div className="main-container pure-g">
          <div className="side-margin pure-u-0 pure-u-sm-0 pure-u-md-1-8 pure-u-lg-1-5"></div>
          <div className="content-container pure-u-1 pure-u-sm-1 pure-u-md-3-4 pure-u-lg-3-5">
            <div className="pure-g">
              <CommandLineContainer />
              <div className="top-spacer pure-u-1"></div>
              <div className="column pure-u-1 pure-u-sm-2-3 pure-u-md-2-3 pure-u-lg-2-3">
                <RoomContainer />
                <LogContainer />
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

export default App;