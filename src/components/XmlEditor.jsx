import TextField from '@mui/material/TextField'
import { useScript } from '../ScriptContext.jsx'

export default function XmlEditor() {
  const { scriptXML, setScriptXML } = useScript()

  return (
    <TextField
      label="Script XML"
      placeholder="Paste script XML"
      multiline
      minRows={10}
      maxRows={30}
      fullWidth
      value={scriptXML}
      onChange={(event) => setScriptXML(event.target.value)}
    />
  )
}
