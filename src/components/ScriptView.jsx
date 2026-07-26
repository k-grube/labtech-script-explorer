import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import {useScript} from '../ScriptContext.jsx';
import ScriptSteps from './ScriptSteps.jsx';

function PackedScriptView({PackedScript, title}) {
  const {Table: table} = PackedScript.NewDataSet;
  const folders = PackedScript.ScriptFolder || [];

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
      <Typography variant="h6">{table.ScriptName}</Typography>
      <Typography variant="body2">
        {`ScriptId ${table.ScriptId}`}
        {folders[0] && folders[0].NewDataSet ? ` in folder ${folders[0].NewDataSet.Table.Name}` : ''}
      </Typography>
      {table.ScriptNotes ? <Typography variant="body2">{table.ScriptNotes}</Typography> : null}
      <ScriptSteps steps={table.ScriptData.ScriptSteps}/>
    </Stack>
  );
}

export default function ScriptView() {
  const {script} = useScript();

  if (!script || !script.PackedScript) {
    return null;
  }

  const primary = script.PackedScript;
  // bundled scripts nest under the primary packed script
  const bundled = [].concat(primary.PackedScript || []);

  return (
    <Stack spacing={3}>
      <PackedScriptView PackedScript={primary} title="Primary Script"/>
      {bundled.map((packed, idx) => (
        <div key={idx}>
          <Divider sx={{mb: 2}}/>
          <PackedScriptView PackedScript={packed} title={`Bundled Script #${idx + 1}`}/>
        </div>
      ))}
    </Stack>
  );
}
