import PropTypes from 'prop-types';

const LabTechScriptStep = PropTypes.shape({
  Action: PropTypes.number,
  FunctionId: PropTypes.number,
  Param1: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  Param2: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  Param3: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  Param4: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  Param5: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  Sort: PropTypes.number,
  Continue: PropTypes.number,
  OsLimit: PropTypes.number,
  Indentation: PropTypes.number,
  ActionObject: PropTypes.string,
  ContinueObject: PropTypes.string,
  OsLimitObject: PropTypes.string,
  StepDescription: PropTypes.string,
  FunctionObject: {
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
});

const PackedScript = PropTypes.shape({
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
});

const APIError = PropTypes.shape({
  name: PropTypes.string,
  msg: PropTypes.string,
  errors: PropTypes.array,
  status: PropTypes.number,
});

export default {
  PackedScript,
  LabTechScriptStep,
  LabTechScript,
  APIError,
};
