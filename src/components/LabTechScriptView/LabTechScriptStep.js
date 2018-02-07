import React from 'react';
import PropTypes from 'prop-types';
import {Container} from 'semantic-ui-react';

import types from '../../types';

/**
 *
 * @param {ScriptStep} ScriptStep
 */
const getFunctionDescriptions = ({Function: {ParamNames}}) => {
  /* eslint-disable object-curly-newline */
  return ParamNames.map(({ParamName, Values, Description, Value}) => {
    let value = Value;
    if (Values && Values.length > 0 && Number.isInteger(value)) {
      value = Values[Value];
    }
    return `${ParamName} ${value} - ${Description} `;
  });
};

export default function LabTechScriptStep(props) {
  const {
    LabTechScriptStep: {
      Action,
      Continue,
      OsLimit,
      Indentation,
      FunctionObject: {
        Name,
        FunctionType,
        ParamNames,
        Description,
      },
    },
  } = props;

  return (
    <Container style={{paddingLeft: 24}}>
      {Description}
    </Container>
  );
}

LabTechScriptStep.propTypes = {
  LabTechScriptStep: types.LabTechScriptStep.isRequired,
};
