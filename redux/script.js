const decode = require('labtech-script-decode');

const initialState = {
  scriptDecoded: false,
  scriptDecodeError: undefined,
  activeIndex: 0,
  LabTechScript: undefined,
  scriptXML: '',
  scriptJSON: '',
};

const DECODE_SCRIPT = 'script/DECODE_SCRIPT';
const DECODE_SCRIPT_SUCCESS = 'script/DECODE_SCRIPT_SUCCESS';
const DECODE_SCRIPT_FAIL = 'script/DECODE_SCRIPT_FAIL';

const CHANGE_TAB = 'script/CHANGE_TAB';
const XML_CLEAR = 'script/XML_CLEAR';
const XML_SET = 'script/XML_SET';
const JSON_SET = 'script/JSON_SET';
const FILE_READ_ERROR = 'script/FILE_READ_ERROR';
const FILE_DROP_REJECTED = 'script/FILE_DROP_REJECTED';
const UNLOAD = 'script/UNLOAD';

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case DECODE_SCRIPT_FAIL:
      return {
        ...state,
        scriptDecodeError: action.error,
        scriptDecoded: false,
        LabTechScript: undefined,
      };
    case DECODE_SCRIPT_SUCCESS:
      return {
        ...state,
        scriptDecoded: true,
        scriptDecodeError: undefined,
        LabTechScript: action.result,
        scriptJSON: JSON.stringify(action.result, null, 2),
      };
    case CHANGE_TAB:
      return {
        ...state,
        activeIndex: action.result,
      };
    case XML_CLEAR:
      return {
        ...state,
        ...initialState,
      };
    case XML_SET:
      return {
        ...state,
        scriptXML: action.result,
      };
    case JSON_SET:
      return {
        ...state,
        scriptJSON: action.result,
      };
    case FILE_READ_ERROR:
      return {
        ...state,
        scriptDecoded: false,
        scriptDecodeError: action.error,
        LabTechScript: undefined,
      };
    case FILE_DROP_REJECTED:
      return {
        ...state,
        scriptDecoded: false,
        scriptDecodeError: action.error,
        LabTechScript: undefined,
      };
    case UNLOAD:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export function decodeScript({scriptXML}) {
  return {
    types: [DECODE_SCRIPT, DECODE_SCRIPT_SUCCESS, DECODE_SCRIPT_FAIL],
    promise: () => decode.decodeXML(scriptXML),
  };
}

export function encodeScript({LabTechScript}) {
  return (dispatch) => {
    decode.encode(LabTechScript)
      .then((scriptXML) => {
        dispatch(setXML({scriptXML}));
      });
  };
}

export function changeTab({activeIndex}) {
  return (dispatch, getState) => {
    if (getState().script.LabTechScript !== undefined) {
      return dispatch({
        type: CHANGE_TAB,
        result: activeIndex,
      });
    }
  };
}

export function setXML({scriptXML}) {
  return (dispatch) => {
    dispatch({
      type: XML_SET,
      result: scriptXML,
    });
    if (scriptXML && scriptXML.length > 0) {
      dispatch(decodeScript({scriptXML}));
    } else {
      dispatch({
        type: XML_CLEAR,
      });
    }
  };
}

export function setJSON({scriptJSON}) {
  return (dispatch, getState) => {
    dispatch({
      type: JSON_SET,
      result: scriptJSON,
    });
    decode.encodeXML(scriptJSON)
      .then((scriptXML) => {
        dispatch(decodeScript({scriptXML}));
      });
    const {LabTechScript} = getState().script;
    dispatch(encodeScript({LabTechScript}));
  };
}

export function fileReadError({error}) {
  return {
    type: FILE_READ_ERROR,
    error,
  };
}

export function fileDropRejected() {
  return {
    type: FILE_DROP_REJECTED,
    error: {msg: 'File is not a LabTech XML file'},
  };
}

export function unload() {
  return {
    type: UNLOAD,
  };
}
