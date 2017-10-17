import React from 'react';
import {List} from 'semantic-ui-react';

import types from '../../types';

export default function LabTechScriptInfo(props) {
  const {
    LabTechScript: {
      LabTech_Expansion: {
        $: {
          Version,
        },
        PackedScript: {
          NewDataSet: {
            Table: {
              ScriptName,
              ScriptNotes,
              ComputerScript,
              LocationScript,
              MaintenanceScript,
              FunctionScript,
            },
          },
        },
      },
    },
  } = props;

  const ScriptTypeLabels = ['Computer', 'Location', 'Maintenance', 'Function'];
  const ScriptType = [ComputerScript, LocationScript, MaintenanceScript, FunctionScript]
    .reduce((prev, el, idx) => {
      return el === '1' ? `${prev} ${ScriptTypeLabels[idx]}` : prev;
    }, '');

  return (
    <List>
      <List.Item>
        <List.Content>
          <List.Header>{ScriptName}</List.Header>
          <List.Description>{ScriptNotes === '' ? 'No script notes.' : ScriptNotes}</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Target Version</List.Header>
          <List.Description>{Version}</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Script Type</List.Header>
          <List.Description>{ScriptType}</List.Description>
        </List.Content>
      </List.Item>
    </List>
  );
}

LabTechScriptInfo.propTypes = {
  LabTechScript: types.LabTechScript.isRequired,
};
