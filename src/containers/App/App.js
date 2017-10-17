import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header, Container} from 'semantic-ui-react';
import Routes from '../../routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <Header as="h1">
            LabTech Script Explorer
          </Header>
        </div>
        <Container>
          <Routes/>
        </Container>
      </div>
    );
  }
}

export default App;
