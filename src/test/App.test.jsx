import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from '../App.jsx'

// new URL(x, import.meta.url) gets rewritten by vite's asset-URL handling under jsdom, breaks fs reads
const xml = readFileSync(join(import.meta.dirname, 'export-test.xml'), 'utf8')

describe('App', () => {
  it('toggles dark mode from the nav bar', async () => {
    const user = userEvent.setup()
    render(<App />)
    const toggle = await screen.findByRole('switch', { name: 'Dark mode' })
    expect(toggle).not.toBeChecked()
    await user.click(toggle)
    expect(toggle).toBeChecked()
    localStorage.clear()
  })

  it('shows the four tabs', () => {
    render(<App />)
    for (const label of ['Script XML', 'Script JSON', 'Script View', 'Text View']) {
      expect(screen.getByRole('tab', { name: label })).toBeInTheDocument()
    }
  })

  it('disables view tabs until a script loads, then jumps to text view', async () => {
    const user = userEvent.setup()
    render(<App />)
    for (const label of ['Script JSON', 'Script View', 'Text View']) {
      expect(screen.getByRole('tab', { name: label })).toBeDisabled()
    }
    const editor = screen.getByLabelText(/script xml/i)
    await user.click(editor)
    await user.paste(xml)
    await waitFor(() => {
      expect(screen.getByRole('tab', { name: 'Text View' })).toHaveAttribute('aria-selected', 'true')
    })
    expect(screen.getByText(/Primary Script \(ScriptId 6401\)/)).toBeInTheDocument()
  })

  it('decodes pasted xml and renders the script view', async () => {
    const user = userEvent.setup()
    render(<App />)
    const editor = screen.getByLabelText(/script xml/i)
    await user.click(editor)
    await user.paste(xml)
    await waitFor(() => {
      expect(screen.getByRole('tab', { name: 'Script View' })).toBeEnabled()
    })
    await user.click(screen.getByRole('tab', { name: 'Script View' }))
    await waitFor(() => {
      expect(screen.getByText('Export Test')).toBeInTheDocument()
    })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('shows an error alert for invalid xml', async () => {
    const user = userEvent.setup()
    render(<App />)
    const editor = screen.getByLabelText(/script xml/i)
    await user.click(editor)
    await user.paste('<garbage/>')
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/could not parse/i)
    })
  })

  it('shows a drop overlay while dragging a file over the window', () => {
    render(<App />)
    fireEvent.dragEnter(window, { dataTransfer: { types: ['Files'] } })
    expect(screen.getByText('Drop script XML')).toBeInTheDocument()
    fireEvent.dragLeave(window, { dataTransfer: { types: ['Files'] } })
  })

  it('loads a dropped xml file', async () => {
    const user = userEvent.setup()
    render(<App />)
    const file = new File([xml], 'export-test.xml', { type: 'text/xml' })
    fireEvent.drop(window, { dataTransfer: { types: ['Files'], files: [file] } })
    await waitFor(() => {
      expect(screen.getByRole('tab', { name: 'Script View' })).toBeEnabled()
    })
    await user.click(screen.getByRole('tab', { name: 'Script View' }))
    await waitFor(() => {
      expect(screen.getByText('Export Test')).toBeInTheDocument()
    })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
