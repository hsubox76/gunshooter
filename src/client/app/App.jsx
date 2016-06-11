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
      <div className="main-container">
        <div className="column left-column">
          <InventoryContainer />
          <div className="container map-container">map container</div>
        </div>
        <div className="column center-column">
          <CommandLineContainer />
          <RoomContainer />
          <LogContainer />
        </div>
        <div className="column right-column">
          <ActionsContainer />
        </div>
      </div>
    );
  }
}

export default App;