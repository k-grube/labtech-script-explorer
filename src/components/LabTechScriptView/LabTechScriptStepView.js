import React, {Component} from 'react';
import {Container, Accordion, Menu} from 'semantic-ui-react';
import types from '../../types';
import './LabTechScriptStepView.css';

import LabTechScriptStep from './LabTechScriptStep';

const getFunctionString = ScriptStep => {
  const {
    Function: {
      Name,
      FunctionType,
      ParamNames,
    },
  } = ScriptStep;

  let base = `${FunctionType === 'If' ? FunctionType : ''} ${Name} - `;

  ParamNames.forEach(param => {
    const {
      ParamName, Values, Value,
    } = param;
    let value = Value;
    if (Values && Values.length > 0 && Number.isInteger(value)) {
      value = Values[Value];
    }

    base += `${ParamName} ${value} `;
  });
  return base;
};

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
        LabTech_Expansion: {
          PackedScript: {
            NewDataSet: {
              Table: {
                ScriptData,
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
          {ScriptData.map((ScriptStep, idx) => {
            const {Indentation} = ScriptStep;
            const intIndentation = parseInt(Indentation, 10);
            return (

              <div style={{marginLeft: intIndentation * 20}}>
                <Accordion.Title
                  active={activeIndex === idx}
                  content={getFunctionString(ScriptStep)}
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
