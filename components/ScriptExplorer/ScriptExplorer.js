import React, {Component} from 'react';
import {Container, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import EditorView from './EditorView';
import {decodeScript} from '../../redux/script';
import types from '../../types';
import withRedux from '../../redux/withRedux';
import {initStore} from '../../redux/store';

class ScriptExplorer extends Component {
  render() {
    const {LabTechScript, scriptDecodeError, scriptDecoded} = this.props;
    return (
      <div>
        <Container>
          {scriptDecodeError &&
          <Message color="red">
            {`Parsing error: ${scriptDecodeError.msg || scriptDecodeError.message}`}
          </Message>
          }
        </Container>
        <EditorView/>
      </div>
    );
  }
}

ScriptExplorer.propTypes = {
  scriptDecoded: PropTypes.bool,
  scriptDecodeError: types.APIError,
  LabTechScript: PropTypes.shape({}),
};

ScriptExplorer.defaultProps = {
  LabTechScript: {},
  scriptDecodeError: undefined,
  scriptDecoded: false,
};

export default connect(
  (state) => ({
    LabTechScript: state.script.LabTechScript,
    scriptDecodeError: state.script.scriptDecodeError,
    scriptDecoded: state.script.scriptDecoded,
  }),
  {decodeScript},
)(ScriptExplorer);
