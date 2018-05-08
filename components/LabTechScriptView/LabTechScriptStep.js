import React from 'react';
import PropTypes from 'prop-types';
import {Container, Segment, GridRow, GridColumn} from 'semantic-ui-react';

import types from '../../types';

export default function LabTechScriptStep(props) {
  const {
    LabTechScriptStep: {
      Action,
      Continue,
      FunctionId,
      StepDescription,
      OsLimitObject,
      ContinueObject,
      Sort,
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
    <GridRow>
      <GridColumn width={1}>
        {`${Sort + 1}`}
      </GridColumn>
      <GridColumn width={9} style={{paddingLeft: Indentation * 10}}>
        {StepDescription}
      </GridColumn>
      <GridColumn width={3}>
        {ContinueObject}
      </GridColumn>
      <GridColumn width={3}>
        {OsLimitObject}
      </GridColumn>
    </GridRow>
  );
}

LabTechScriptStep.propTypes = {
  LabTechScriptStep: types.LabTechScriptStep.isRequired,
};
