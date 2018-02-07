import React, {Component} from 'react';
import {Container, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ScriptForm from '../../components/ScriptForm';
import LabTechScriptView from '../../components/LabTechScriptView/LabTechScriptView';
import {decodeScript} from '../../redux/script';
import types from '../../types';

@connect(state => ({
  LabTechScript: state.script.LabTechScript,
  scriptDecodeError: state.script.scriptDecodeError,
  scriptDecoded: state.script.scriptDecoded,
}), {decodeScript})
class ScriptExplorer extends Component {
  handleSubmit = data => {
    this.props.decodeScript(data);
  };

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
          <ScriptForm onSubmit={this.handleSubmit}/>
        </Container>
        <Container>
          {!scriptDecodeError && scriptDecoded &&
          <LabTechScriptView LabTechScript={LabTechScript}/>
          }
        </Container>
      </div>
    );
  }
}

ScriptExplorer.propTypes = {
  decodeScript: PropTypes.func.isRequired,
  scriptDecoded: PropTypes.bool,
  scriptDecodeError: types.APIError,
  LabTechScript: PropTypes.shape({}),
};

ScriptExplorer.defaultProps = {
  LabTechScript: {},
  scriptDecodeError: undefined,
  scriptDecoded: false,
};

export default ScriptExplorer;
