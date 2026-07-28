import { useState } from 'react'
import { ThemeProvider, useColorScheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import DarkModeSwitch from './components/DarkModeSwitch.jsx'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import { ScriptProvider, useScript } from './ScriptContext.jsx'
import XmlEditor from './components/XmlEditor.jsx'
import JsonView from './components/JsonView.jsx'
import ScriptView from './components/ScriptView.jsx'
import TextView from './components/TextView.jsx'
import FileDrop from './components/FileDrop.jsx'
import theme from './theme.js'

function Explorer() {
  const [tab, setTab] = useState(0)
  const { script, error } = useScript()

  // fresh load jumps to text view, losing the script falls back to the editor
  // transition gate keeps per-keystroke re-decodes from yanking the tab mid-edit
  const [prevScript, setPrevScript] = useState(null)
  if (script !== prevScript) {
    setPrevScript(script)
    if (script && !prevScript) {
      setTab(3)
    }
    if (!script) {
      setTab(0)
    }
  }

  return (
    <Container sx={{ py: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {`Parsing error: ${error.message}`}
        </Alert>
      )}
      <Tabs value={tab} onChange={(event, next) => setTab(next)} sx={{ mb: 2 }}>
        <Tab label="Script XML" />
        <Tab label="Script JSON" disabled={!script} />
        <Tab label="Script View" disabled={!script} />
        <Tab label="Text View" disabled={!script} />
      </Tabs>
      <Box hidden={tab !== 0}>
        <XmlEditor />
      </Box>
      <Box hidden={tab !== 1}>
        <JsonView />
      </Box>
      <Box hidden={tab !== 2}>
        <ScriptView />
      </Box>
      <Box hidden={tab !== 3}>
        <TextView />
      </Box>
    </Container>
  )
}

function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme()
  if (!mode) {
    return null
  }
  // untouched mode is 'system', the switch reflects the resolved scheme
  const dark = (mode === 'system' ? systemMode : mode) === 'dark'
  return (
    <DarkModeSwitch
      checked={dark}
      onChange={(event) => setMode(event.target.checked ? 'dark' : 'light')}
      slotProps={{ input: { 'aria-label': 'Dark mode' } }}
    />
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <ScriptProvider>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              LabTech Script Explorer
            </Typography>
            <ThemeToggle />
          </Toolbar>
        </AppBar>
        <Explorer />
        <FileDrop />
      </ScriptProvider>
    </ThemeProvider>
  )
}
