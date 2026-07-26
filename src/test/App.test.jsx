import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, it, expect} from 'vitest';
import App from '../App.jsx';

// new URL(x, import.meta.url) gets rewritten by vite's asset-URL handling under jsdom, breaks fs reads
const xml = readFileSync(join(import.meta.dirname, 'export-test.xml'), 'utf8');

describe('App', () => {
  it('shows the four tabs', () => {
    render(<App/>);
    for (const label of ['Script XML', 'Script JSON', 'Script View', 'Text View']) {
      expect(screen.getByRole('tab', {name: label})).toBeInTheDocument();
    }
  });

  it('decodes pasted xml and renders the script view', async () => {
    const user = userEvent.setup();
    render(<App/>);
    const editor = screen.getByLabelText(/script xml/i);
    await user.click(editor);
    await user.paste(xml);
    await user.click(screen.getByRole('tab', {name: 'Script View'}));
    // b4 strengthens this to assert rendered script content
    await waitFor(() => {
      expect(screen.getByRole('tab', {name: 'Script View'})).toHaveAttribute('aria-selected', 'true');
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows an error alert for invalid xml', async () => {
    const user = userEvent.setup();
    render(<App/>);
    const editor = screen.getByLabelText(/script xml/i);
    await user.click(editor);
    await user.paste('<garbage/>');
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/could not parse/i);
    });
  });
});
