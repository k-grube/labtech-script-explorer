const initialState = {
  scriptDecoded: false,
  scriptDecodeError: undefined,
};

const LOAD_SCRIPTS = 'script/LOAD_SCRIPTS';
const LOAD_SCRIPTS_SUCCESS = 'script/LOAD_SCRIPTS_SUCCESS';
const LOAD_SCRIPTS_FAIL = 'script/LOAD_SCRIPTS_FAIL';

const DECODE_SCRIPT = 'script/DECODE_SCRIPT';
const DECODE_SCRIPT_SUCCESS = 'script/DECODE_SCRIPT_SUCCESS';
const DECODE_SCRIPT_FAIL = 'script/DECODE_SCRIPT_FAIL';

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
      };
    default:
      return state;
  }
}

export function loadScripts({page = 0, pageSize = 25, search = ''}) {
  return {
    types: [LOAD_SCRIPTS, LOAD_SCRIPTS_SUCCESS, LOAD_SCRIPTS_FAIL],
    promise: client => client.get('/api/scripts', {
      params: {
        page,
        pageSize,
        search,
      },
    }),
  };
}

export function decodeScript({scriptXML}) {
  return {
    types: [DECODE_SCRIPT, DECODE_SCRIPT_SUCCESS, DECODE_SCRIPT_FAIL],
    promise: client => client.post('/api/script/decode', {
      data: {
        scriptXML,
      },
    }),
  };
}
