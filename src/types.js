import PropTypes from 'prop-types';

const LabTechScriptStep = PropTypes.shape({
  Action: PropTypes.string,
  FunctionId: PropTypes.string,
  Param1: PropTypes.string,
  Param2: PropTypes.string,
  Param3: PropTypes.string,
  Param4: PropTypes.string,
  Param5: PropTypes.string,
  Sort: PropTypes.string,
  Continue: PropTypes.string,
  OsLimit: PropTypes.string,
  Indentation: PropTypes.string,
  Function: {
    FunctionId: PropTypes.string,
    Name: PropTypes.string,
    Parameters: PropTypes.arrayOf(PropTypes.shape({
      ParamName: PropTypes.string,
      Values: PropTypes.arrayOf(PropTypes.string),
      Description: PropTypes.string,
      Value: PropTypes.string,
    })),
    FunctionType: PropTypes.string,
    ParamNames: PropTypes.string,
    Description: PropTypes.string,
    FunctionFlag: PropTypes.string,
  },
});

const LabTechScript = PropTypes.shape({
  LabTech_Expansion: {
    $: {
      Version: PropTypes.string,
      Name: PropTypes.string,
      Type: PropTypes.string,
    },
    PackedScript: {
      NewDataSet: {
        Table: {
          ScriptId: PropTypes.string,
          FolderId: PropTypes.string,
          ScriptName: PropTypes.string,
          ScriptNotes: PropTypes.string,
          Permission: PropTypes.string,
          EditPermission: PropTypes.string,
          ComputerScript: PropTypes.string,
          LocationScript: PropTypes.string,
          MaintenanceScript: PropTypes.string,
          FunctionScript: PropTypes.string,
          LicenseData: {
            Type: PropTypes.string,
            RunCounter: PropTypes.string,
            ExpireDate: PropTypes.string,
            ScriptVersion: PropTypes.string,
            ScriptGuid: PropTypes.string,
          },
          ScriptData: PropTypes.arrayOf(LabTechScriptStep),
        },
      },
      ScriptFolder: {
        NewDataSet: {
          Table: {
            FolderID: PropTypes.string,
            ParentID: PropTypes.string,
            Name: PropTypes.string,
            GUID: PropTypes.string,
          },
        },
      },
    },
  },
});

const APIError = PropTypes.shape({
  name: PropTypes.string,
  msg: PropTypes.string,
  errors: PropTypes.array,
  status: PropTypes.number,
});

export default {
  LabTechScriptStep,
  LabTechScript,
  APIError,
};
