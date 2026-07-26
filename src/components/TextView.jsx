import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {useScript} from '../ScriptContext.jsx';

const sections = [
  ['InitialCheck', 'Initial Check'],
  ['ThenSection', 'Then'],
  ['ElseSection', 'Else'],
];

export default function TextView() {
  const {script, scriptText} = useScript();

  const primaryId = script?.PackedScript?.NewDataSet?.Table?.ScriptId;
  // lib emits bundled scripts first, show primary first like the script view
  const ordered = [...scriptText].sort((a, b) => {
    return (b.ScriptId === primaryId) - (a.ScriptId === primaryId);
  });

  return (
    <Stack spacing={3}>
      {ordered.map((entry, idx) => (
        <Paper key={`${entry.ScriptId}-${idx}`} variant="outlined" sx={{p: 2}}>
          <Typography variant="h6" gutterBottom>
            {`${entry.ScriptId === primaryId ? 'Primary Script' : 'Bundled Script'} (ScriptId ${entry.ScriptId})`}
          </Typography>
          {sections.filter(([key]) => entry[key]).map(([key, label]) => (
            <Box key={key} sx={{mb: 1.5}}>
              <Typography variant="overline" color="text.secondary">{label}</Typography>
              <Box component="pre" sx={{m: 0, overflowX: 'auto', fontSize: 13, lineHeight: 1.6}}>
                {entry[key]}
              </Box>
            </Box>
          ))}
        </Paper>
      ))}
    </Stack>
  );
}
