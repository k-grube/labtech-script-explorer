import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useEffect } from 'react'
import { ScriptProvider, useScript } from '../ScriptContext.jsx'
import TextView from '../components/TextView.jsx'
import JsonView from '../components/JsonView.jsx'

const xml = readFileSync(join(import.meta.dirname, 'export-test.xml'), 'utf8')
const bundleXml = readFileSync(join(import.meta.dirname, 'hell-script.xml'), 'utf8')
const demoXml = readFileSync(join(import.meta.dirname, 'Script Function Demonstration.xml'), 'utf8')

function LoadFixture({ children, source = xml }) {
  const { setScriptXML } = useScript()
  useEffect(() => {
    setScriptXML(source)
  }, [setScriptXML, source])
  return children
}

describe('TextView', () => {
  it('renders script sections as text', async () => {
    render(
      <ScriptProvider>
        <LoadFixture>
          <TextView />
        </LoadFixture>
      </ScriptProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText(/ScriptId 6401/)).toBeInTheDocument()
    })
    expect(screen.getByText('Then')).toBeInTheDocument()
  })

  it('labels primary and bundled scripts, primary first', async () => {
    render(
      <ScriptProvider>
        <LoadFixture source={bundleXml}>
          <TextView />
        </LoadFixture>
      </ScriptProvider>,
    )
    // hell fixture: primary 6570 bundles 5784, lib returns bundled-first
    await waitFor(() => {
      expect(screen.getByText(/Primary Script \(ScriptId 6570\)/)).toBeInTheDocument()
    })
    const bundled = screen.getByText(/Bundled Script \(ScriptId 5784\)/)
    const primary = screen.getByText(/Primary Script \(ScriptId 6570\)/)
    expect(primary.compareDocumentPosition(bundled) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('shows a script nav for bundles, none for single scripts', async () => {
    const { unmount } = render(
      <ScriptProvider>
        <LoadFixture source={bundleXml}>
          <TextView />
        </LoadFixture>
      </ScriptProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('Scripts')).toBeInTheDocument()
    })
    expect(screen.getByText('Hell Script v2')).toBeInTheDocument()
    expect(screen.getByText('Add Reflexion Monitoring')).toBeInTheDocument()
    unmount()

    render(
      <ScriptProvider>
        <LoadFixture>
          <TextView />
        </LoadFixture>
      </ScriptProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText(/ScriptId 6401/)).toBeInTheDocument()
    })
    expect(screen.queryByText('Scripts')).not.toBeInTheDocument()
  })

  it('renders functions 257-259 with editor display text', async () => {
    render(
      <ScriptProvider>
        <LoadFixture source={demoXml}>
          <TextView />
        </LoadFixture>
      </ScriptProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText(/:NewScriptLabelFunction - Label/)).toBeInTheDocument()
    })
    const text = screen.getByText(/Script Resume State: Resume disabled/)
    expect(text).toBeInTheDocument()
    expect(screen.getByText(/Script Resume State: Resume from last executed script step/)).toBeInTheDocument()
  })
})

describe('JsonView', () => {
  it('copies the full decoded json', async () => {
    const writeText = vi.fn().mockResolvedValue()
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    render(
      <ScriptProvider>
        <LoadFixture>
          <JsonView />
        </LoadFixture>
      </ScriptProvider>,
    )
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Copy JSON' })).toBeInTheDocument()
    })
    screen.getByRole('button', { name: 'Copy JSON' }).click()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
    })
    const payload = JSON.parse(writeText.mock.calls[0][0])
    expect(payload.PackedScript.NewDataSet.Table.ScriptName).toBe('Export Test')
  })

  it('renders the decoded script as a collapsible tree', async () => {
    render(
      <ScriptProvider>
        <LoadFixture>
          <JsonView />
        </LoadFixture>
      </ScriptProvider>,
    )
    // leaf label format is `key: value`, visible via default depth-5 expansion
    await waitFor(() => {
      expect(screen.getByText('ScriptName: Export Test')).toBeInTheDocument()
    })
    expect(screen.getAllByRole('treeitem').length).toBeGreaterThan(0)
    // step subtrees sit below the default expansion depth, collapsed
    expect(screen.queryByText(/StepDescription/)).not.toBeInTheDocument()
  })
})
