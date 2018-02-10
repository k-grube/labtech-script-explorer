import React, {Component} from 'react';
import {Container, Divider} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import types from '../../types';
import LabTechScriptInfo from './LabTechScriptInfo';
import LabTechScriptStepView from './LabTechScriptStepView';

class LabTechScriptView extends Component {
  render() {
    const {PackedScript} = this.props;

    return (
      <Container>
        <LabTechScriptInfo PackedScript={PackedScript}/>
        <LabTechScriptStepView PackedScript={PackedScript}/>
      </Container>
    );
  }
}

LabTechScriptView.propTypes = {
  PackedScript: types.PackedScript.isRequired,
};

export default LabTechScriptView;
