import {useScript} from '../ScriptContext.jsx';

export default function JsonView() {
  const {script} = useScript();

  if (!script) {
    return null;
  }

  return <pre style={{overflow: 'auto'}}>{JSON.stringify(script, null, 2)}</pre>;
}
