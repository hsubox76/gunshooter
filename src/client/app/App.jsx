import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import 'font-awesome/css/font-awesome.css';
import DescriptionContainer from './components/DescriptionContainer';
import InventoryContainer from './components/InventoryContainer';
import KeywordsContainer from './components/KeywordsContainer';

class App extends React.Component {
  render () {
    return (
      <div className="main-container">
        <div className="column left-column">
          <InventoryContainer />
          <div className="container map-container">map container</div>
        </div>
        <div className="column center-column">
          <DescriptionContainer />
          <div className="container command-container">command container</div>
        </div>
        <div className="column right-column">
          <KeywordsContainer />
        </div>
      </div>
    );
  }
}

export default App;