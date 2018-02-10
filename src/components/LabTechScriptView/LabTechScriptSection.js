/**
 * Created by kgrube on 2/9/2018
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Grid, GridRow, GridColumn, Header} from 'semantic-ui-react';
import types from '../../types';
import './LabTechScriptView.css';
import LabTechScriptStep from './LabTechScriptStep';

class LabTechScriptSection extends Component {
  render() {
    const {steps, sectionName, style} = this.props;
    return (
      <div style={style}>
        {sectionName &&
        <Header as="h5">{sectionName}</Header>}
        <Container className="StepContainer">
          <Grid
            columns={16}
            celled="internally"
          >
            {steps.map((ScriptStep, idx) => <LabTechScriptStep LabTechScriptStep={ScriptStep} key={idx}/>)}
          </Grid>
        </Container>
      </div>
    );
  }
}

LabTechScriptSection.defaultProps = {
  steps: [],
  sectionName: '',
  style: {},
};

LabTechScriptSection.propTypes = {
  steps: PropTypes.arrayOf(types.LabTechScriptStep),
  sectionName: PropTypes.string,
  style: PropTypes.object,
};

export default LabTechScriptSection;
