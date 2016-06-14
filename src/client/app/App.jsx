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
      <div className="main-container pure-u-1">
        <div className="pure-u-0 pure-u-sm-0 pure-u-md-1-8 pure-u-lg-1-5"></div>
        <div className="column pure-u-1 pure-u-sm-2-3 pure-u-md-1-2 pure-u-lg-2-5">
          <CommandLineContainer />
          <RoomContainer />
          <LogContainer />
        </div>
        <div className="column pure-u-1 pure-u-sm-1-3 pure-u-md-1-4 pure-u-lg-1-5">
          <InventoryContainer />
          <ActionsContainer />
        </div>
        <div className="pure-u-0 pure-u-sm-0 pure-u-md-1-8 pure-u-g-1-5"></div>
      </div>
    );
  }
}

export default App;