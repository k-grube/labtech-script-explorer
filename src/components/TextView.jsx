import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {useScript} from '../ScriptContext.jsx';

const sections = [
  ['InitialCheck', 'Initial Check'],
  ['ThenSection', 'Then'],
  ['ElseSection', 'Else'],
];

export default function TextView() {
  const {scriptText} = useScript();

  return (
    <Stack spacing={2}>
      {scriptText.map((script, idx) => (
        <div key={`${script.ScriptId}-${idx}`}>
          <Typography variant="subtitle1">{`ScriptId ${script.ScriptId}`}</Typography>
          {sections.map(([key, label]) => (
            <div key={key}>
              <Typography variant="subtitle2">{label}</Typography>
              <pre style={{margin: 0, whiteSpace: 'pre-wrap'}}>{script[key]}</pre>
            </div>
          ))}
        </div>
      ))}
    </Stack>
  );
}
