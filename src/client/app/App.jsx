import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';

class App extends React.Component {
  render () {
    return (
      <div className="main-container">
        <div className="column left-column">
          <div className="container inventory-container">inventory container</div>
          <div className="container map-container">map container</div>
        </div>
        <div className="column center-column">
          <div className="container description-container">description container</div>
          <div className="container command-container">command container</div>
        </div>
        <div className="column right-column">
          <div className="container keywords-container">keywords container</div>
        </div>
      </div>
    );
  }
}

export default App;