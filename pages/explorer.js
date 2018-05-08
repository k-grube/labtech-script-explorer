import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {initStore} from '../redux/store';
import withRedux from '../redux/withRedux';
import Page from '../components/Page';
import ScriptExplorer from '../components/ScriptExplorer/ScriptExplorer';

class Explorer extends Component {
  render() {
    return (
      <Page title="Explorer">
        <ScriptExplorer/>
      </Page>
    );
  }
}

export default withRedux(initStore, null, null)(Explorer);
