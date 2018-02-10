import React, {Component} from 'react';
import {Container, Grid, GridColumn, GridRow} from 'semantic-ui-react';
import types from '../../types';
import LabTechScriptSection from './LabTechScriptSection';
import './LabTechScriptView.css';

class LabTechScriptStepView extends Component {
  render() {
    const {
      PackedScript: {
        NewDataSet: {
          Table: {
            ScriptData: {
              ScriptSteps,
            },
          },
        },
      },
    } = this.props;

    const InitialCheck = [];
    const ThenSection = [];
    const ElseSection = [];

    ScriptSteps.forEach(step => {
      /* eslint-disable default-case */
      switch (step.ActionObject) {
        case 'InitialCheck':
          InitialCheck.push(step);
          break;
        case 'ThenSection':
          ThenSection.push(step);
          break;
        case 'ElseSection':
          ElseSection.push(step);
          break;
      }
    });

    return (
      <Container className="ScriptContainer">
        <LabTechScriptSection
          sectionName="Initial Check"
          steps={InitialCheck}
          style={{paddingBottom: '5px'}}
        />
        <LabTechScriptSection
          sectionName="Then Section"
          steps={ThenSection}
          style={{paddingTop: '5px', paddingBottom: '5px'}}/>
        <LabTechScriptSection
          sectionName="Else Section"
          steps={ElseSection}
          style={{paddingTop: '5px', paddingBottom: '5px'}}/>
      </Container>
    );
  }
}

LabTechScriptStepView.propTypes = {
  PackedScript: types.PackedScript.isRequired,
};

export default LabTechScriptStepView;
