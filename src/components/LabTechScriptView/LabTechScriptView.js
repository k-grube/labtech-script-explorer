import React, {Component} from 'react';
import {Container, Divider} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import types from '../../types';
import LabTechScriptInfo from './LabTechScriptInfo';
import LabTechScriptStepView from './LabTechScriptStepView';

class LabTechScriptView extends Component {
  render() {
    const {LabTechScript} = this.props;

    return (
      <Container>
        <LabTechScriptInfo LabTechScript={LabTechScript}/>
        <Divider/>
        <LabTechScriptStepView LabTechScript={LabTechScript}/>
      </Container>
    );
  }
}

LabTechScriptView.propTypes = {
  LabTechScript: types.LabTechScript.isRequired,
};

export default LabTechScriptView;
