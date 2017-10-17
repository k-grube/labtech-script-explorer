import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Header} from 'semantic-ui-react';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Header as="h2">Home Page</Header>

        <Link to="/explorer">Script Explorer</Link>
      </div>
    );
  }
}

export default HomePage;
