import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {render, screen, waitFor} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import {useEffect} from 'react';
import {ScriptProvider, useScript} from '../ScriptContext.jsx';
import TextView from '../components/TextView.jsx';

const xml = readFileSync(join(import.meta.dirname, 'export-test.xml'), 'utf8');

function LoadFixture({children}) {
  const {setScriptXML} = useScript();
  useEffect(() => {
    setScriptXML(xml);
  }, [setScriptXML]);
  return children;
}

describe('TextView', () => {
  it('renders script sections as text', async () => {
    render(
      <ScriptProvider>
        <LoadFixture>
          <TextView/>
        </LoadFixture>
      </ScriptProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText(/ScriptId 6401/)).toBeInTheDocument();
    });
    expect(screen.getByText('Then')).toBeInTheDocument();
  });
});
