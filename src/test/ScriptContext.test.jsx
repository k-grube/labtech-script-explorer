import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {act, renderHook, waitFor} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import {ScriptProvider, useScript} from '../ScriptContext.jsx';

// new URL(x, import.meta.url) gets rewritten by vite's asset-URL handling under jsdom, breaks fs reads
const xml = readFileSync(join(import.meta.dirname, 'export-test.xml'), 'utf8');

const wrapper = ({children}) => <ScriptProvider>{children}</ScriptProvider>;

describe('ScriptContext', () => {
  it('decodes pasted xml', async () => {
    const {result} = renderHook(() => useScript(), {wrapper});
    act(() => {
      result.current.setScriptXML(xml);
    });
    await waitFor(() => {
      expect(result.current.script).toBeDefined();
    });
    expect(result.current.script.PackedScript.NewDataSet.Table.ScriptName).toBe('Export Test');
    expect(result.current.scriptText[0]).toHaveProperty('ThenSection');
    expect(result.current.error).toBeUndefined();
  });

  it('surfaces decode errors', async () => {
    const {result} = renderHook(() => useScript(), {wrapper});
    act(() => {
      result.current.setScriptXML('<not-a-script/>');
    });
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
    expect(result.current.script).toBeUndefined();
  });
});
