import {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {decodeXML, toText} from 'labtech-script-decode';

const ScriptContext = createContext(null);

export function ScriptProvider({children}) {
  const [scriptXML, setXML] = useState('');
  const [script, setScript] = useState(undefined);
  const [scriptText, setScriptText] = useState([]);
  const [error, setError] = useState(undefined);

  const setScriptXML = useCallback((xml) => {
    setXML(xml);
    if (!xml.trim()) {
      setScript(undefined);
      setScriptText([]);
      setError(undefined);
      return;
    }
    decodeXML(xml)
      .then((decoded) => Promise.all([decoded, toText(decoded)]))
      .then(([decoded, text]) => {
        setScript(decoded);
        setScriptText(text);
        setError(undefined);
      })
      .catch((err) => {
        setScript(undefined);
        setScriptText([]);
        // ajv failures reject with an errors array, not an Error
        setError(err instanceof Error ? err : new Error(JSON.stringify(err)));
      });
  }, []);

  const value = useMemo(
    () => ({scriptXML, script, scriptText, error, setScriptXML}),
    [scriptXML, script, scriptText, error, setScriptXML],
  );

  return <ScriptContext.Provider value={value}>{children}</ScriptContext.Provider>;
}

export function useScript() {
  const ctx = useContext(ScriptContext);
  if (!ctx) {
    throw new Error('useScript requires ScriptProvider');
  }
  return ctx;
}
