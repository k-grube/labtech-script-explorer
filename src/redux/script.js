const decode = require('labtech-script-decode');

const initialState = {
  scriptDecoded: false,
  scriptDecodeError: undefined,
  activeIndex: 0,
  LabTechScript: undefined,
  scriptXML: '',
  scriptJSON: '',
};

const LOAD_SCRIPTS = 'script/LOAD_SCRIPTS';
const LOAD_SCRIPTS_SUCCESS = 'script/LOAD_SCRIPTS_SUCCESS';
const LOAD_SCRIPTS_FAIL = 'script/LOAD_SCRIPTS_FAIL';

const DECODE_SCRIPT = 'script/DECODE_SCRIPT';
const DECODE_SCRIPT_SUCCESS = 'script/DECODE_SCRIPT_SUCCESS';
const DECODE_SCRIPT_FAIL = 'script/DECODE_SCRIPT_FAIL';

const CHANGE_TAB = 'script/CHANGE_TAB';
const XML_SET = 'script/XML_SET';
const JSON_SET = 'script/JSON_SET';

export default function reducer(state = initialState, action = {}) {
  // console.log('SCRIPT REDUCER', action);
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
  return {
    type: CHANGE_TAB,
    result: activeIndex,
  };
}

export function setXML({scriptXML}) {
  return (dispatch) => {
    dispatch({
      type: XML_SET,
      result: scriptXML,
    });
    dispatch(decodeScript({scriptXML}));
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
