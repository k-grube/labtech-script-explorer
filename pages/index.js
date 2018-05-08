import React, {Component} from 'react';
import {initStore} from '../redux/store';
import withRedux from '../redux/withRedux';
import Page from '../components/Page';
import ScriptExplorer from '../components/ScriptExplorer/ScriptExplorer';

class Index extends Component {
  static getInitialProps({store, isServer}) {
    return {isServer};
  }

  render() {
    return (
      <Page title="Home">
        <ScriptExplorer/>
      </Page>
    );
  }
}

export default withRedux(initStore, null, null)(Index);
