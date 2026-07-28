import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useScript } from '../ScriptContext.jsx'
import ScriptNav from './ScriptNav.jsx'

const sections = [
  ['InitialCheck', 'Initial Check'],
  ['ThenSection', 'Then'],
  ['ElseSection', 'Else'],
]

// ScriptId -> ScriptName across the primary and nested bundled scripts
function collectNames(script) {
  const names = {}
  function walk(packed) {
    if (!packed) {
      return
    }
    for (const p of [].concat(packed)) {
      const table = p.NewDataSet?.Table
      if (table) {
        names[table.ScriptId] = table.ScriptName
      }
      walk(p.PackedScript)
    }
  }
  walk(script?.PackedScript)
  return names
}

export default function TextView() {
  const { script, scriptText } = useScript()

  const primaryId = script?.PackedScript?.NewDataSet?.Table?.ScriptId
  const names = collectNames(script)
  // lib emits bundled scripts first, show primary first like the script view
  const ordered = [...scriptText].sort((a, b) => {
    return (b.ScriptId === primaryId) - (a.ScriptId === primaryId)
  })

  const navItems = ordered.map((entry, idx) => ({
    id: `text-script-${idx}`,
    label: names[entry.ScriptId] ?? `ScriptId ${entry.ScriptId}`,
    scriptId: entry.ScriptId,
  }))

  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
      <ScriptNav items={navItems} />
      <Stack spacing={3} sx={{ flex: 1, minWidth: 0 }}>
        {ordered.map((entry, idx) => (
          <Paper
            key={`${entry.ScriptId}-${idx}`}
            id={`text-script-${idx}`}
            variant="outlined"
            sx={{ p: 2, scrollMarginTop: 80 }}
          >
            <Typography variant="h6" gutterBottom>
              {`${entry.ScriptId === primaryId ? 'Primary Script' : 'Bundled Script'} (ScriptId ${entry.ScriptId})`}
            </Typography>
            {sections
              .filter(([key]) => entry[key])
              .map(([key, label]) => (
                <Box key={key} sx={{ mb: 1.5 }}>
                  <Typography variant="overline" color="text.secondary">
                    {label}
                  </Typography>
                  <Box component="pre" sx={{ m: 0, overflowX: 'auto', fontSize: 13, lineHeight: 1.6 }}>
                    {entry[key]}
                  </Box>
                </Box>
              ))}
          </Paper>
        ))}
      </Stack>
    </Box>
  )
}
