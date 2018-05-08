import React from 'react';
import {Grid, Item, Icon} from 'semantic-ui-react';
import types from '../../types';

export default function LabTechScriptInfo(props) {
  const {
    PackedScript: {
      NewDataSet: {
        Table: {
          ScriptName,
          ScriptNotes,
          ComputerScript,
          LocationScript,
          MaintenanceScript,
          FunctionScript,
          ScriptGuid,
        },
      },
      ScriptFolder,
    },
  } = props;

  const ScriptTypeLabels = ['Computer', 'Location', 'Maintenance', 'Function'];
  const ScriptType = [ComputerScript, LocationScript, MaintenanceScript, FunctionScript]
    .reduce((prev, el, idx) => {
      return el === '1' ? `${prev} ${ScriptTypeLabels[idx]}` : prev;
    }, '');

  const ScriptFolders = [];
  let folderString = '';

  if (ScriptFolder && ScriptFolder.length > 0) {
    ScriptFolder.forEach((folder) => {
      if (folder && folder.NewDataSet) {
        ScriptFolders.push(folder.NewDataSet.Table);
      } else {
        ScriptFolders.push({
          ParentID: 0,
          Name: 'No Script Folder Specified',
        });
      }
    });
  }

  if (ScriptFolders.length === 2) {
    if (ScriptFolders[0].ParentID === 0) {
      folderString = `${ScriptFolders[0].Name}/${ScriptFolders[1].Name}`;
    } else if (ScriptFolders[1].ParentID === 0) {
      folderString = `${ScriptFolders[1].Name}/${ScriptFolders[0].Name}`;
    }
  } else {
    folderString = `${ScriptFolders[0].Name}`;
  }

  return (
    <Grid
      celled="internally"
      columns={16}
    >
      <Grid.Row>
        <Grid.Column width={8}>
          <Item>
            <Item.Content>
              <Item.Header>{ScriptName}</Item.Header>
              <Item.Description>Script Type: {ScriptType ? `${ScriptType}` : 'No Flags'}</Item.Description>
              <Item.Meta>{ScriptGuid}</Item.Meta>
            </Item.Content>
          </Item>
        </Grid.Column>
        <Grid.Column width={8}>
          <Item>
            <Item.Content>
              <Item.Description>Folder: {folderString}</Item.Description>
              <Item.Description>Extra Data Fields: </Item.Description>
              <Item.Description>Included Files: </Item.Description>
            </Item.Content>
          </Item>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Item>
            <Item.Content>
              <Item.Header><Icon name="tags"/> Script Notes</Item.Header>
              <Item.Description>{ScriptNotes}</Item.Description>
            </Item.Content>
          </Item>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

LabTechScriptInfo.propTypes = {
  PackedScript: types.PackedScript.isRequired,
};
