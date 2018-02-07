import React, {Component} from 'react';
import {Container, Accordion, Menu} from 'semantic-ui-react';
import types from '../../types';
import './LabTechScriptStepView.css';

import LabTechScriptStep from './LabTechScriptStep';

export default class LabTechScriptStepView extends Component {
  state = {activeIndex: 0};

  handleClick = (e, titleProps) => {
    const {index} = titleProps;
    const {activeIndex} = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({activeIndex: newIndex});
  };

  render() {
    const {
      LabTechScript: {
        PackedScript: {
          NewDataSet: {
            Table: {
              ScriptData: {
                ScriptSteps,
              },
            },
          },
        },
      },
    } = this.props;

    const {activeIndex} = this.state;

    return (
      <Container className="StepContainer">
        <Accordion as={Menu} vertical fluid>
          {ScriptSteps.map((ScriptStep, idx) => {
            const {Indentation} = ScriptStep;
            return (

              <div style={{marginLeft: Indentation * 20}}>
                <Accordion.Title
                  active={activeIndex === idx}
                  content={ScriptStep.StepDescription}
                  index={idx}
                  onClick={this.handleClick}
                />
                <Accordion.Content
                  active={activeIndex === idx}
                  content={<LabTechScriptStep LabTechScriptStep={ScriptStep}/>}
                />
              </div>
            );
          })}
        </Accordion>
      </Container>
    );
  }
}

LabTechScriptStepView.propTypes = {
  LabTechScript: types.LabTechScript.isRequired,
};
