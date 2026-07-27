import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
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

function Explorer() {
  const [tab, setTab] = useState(0)
  const { error } = useScript()

  return (
    <Container sx={{ py: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {`Parsing error: ${error.message}`}
        </Alert>
      )}
      <Tabs value={tab} onChange={(event, next) => setTab(next)} sx={{ mb: 2 }}>
        <Tab label="Script XML" />
        <Tab label="Script JSON" />
        <Tab label="Script View" />
        <Tab label="Text View" />
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

export default function App() {
  return (
    <ScriptProvider>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">LabTech Script Explorer</Typography>
        </Toolbar>
      </AppBar>
      <Explorer />
      <FileDrop />
    </ScriptProvider>
  )
}
