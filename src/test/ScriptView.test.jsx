import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ScriptProvider, useScript } from '../ScriptContext.jsx'
import ScriptView from '../components/ScriptView.jsx'
import { useEffect } from 'react'

// new URL(x, import.meta.url) gets rewritten by vite's asset-URL handling under jsdom, breaks fs reads
const xml = readFileSync(join(import.meta.dirname, 'export-test.xml'), 'utf8')

function LoadFixture({ children }) {
  const { setScriptXML } = useScript()
  useEffect(() => {
    setScriptXML(xml)
  }, [setScriptXML])
  return children
}

describe('ScriptView', () => {
  it('renders script name, folder, and step rows', async () => {
    render(
      <ScriptProvider>
        <LoadFixture>
          <ScriptView />
        </LoadFixture>
      </ScriptProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('Export Test')).toBeInTheDocument()
    })
    // fixture script has steps; every step row shows its description cell
    expect(screen.getAllByTestId('script-step').length).toBeGreaterThan(0)
  })
})
