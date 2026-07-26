import {useMemo} from 'react';
import {RichTreeView} from '@mui/x-tree-view/RichTreeView';
import {useScript} from '../ScriptContext.jsx';

// expand this many levels by default, deeper nodes start collapsed
const EXPAND_DEPTH = 5;
const MAX_LABEL = 80;

function leafLabel(key, value) {
  if (typeof value === 'string' && value.length > MAX_LABEL) {
    return `${key}: ${value.slice(0, MAX_LABEL)}...`;
  }
  return `${key}: ${String(value)}`;
}

function buildItems(value, path, depth, expanded, parentIsArray) {
  return Object.entries(value).map(([key, child]) => {
    const id = `${path}.${key}`;
    const name = parentIsArray ? `[${key}]` : key;
    if (child !== null && typeof child === 'object') {
      if (depth < EXPAND_DEPTH) {
        expanded.push(id);
      }
      const isArray = Array.isArray(child);
      return {
        id,
        label: isArray ? `${name} [${child.length}]` : name,
        children: buildItems(child, id, depth + 1, expanded, isArray),
      };
    }
    return {id, label: leafLabel(name, child)};
  });
}

export default function JsonView() {
  const {script} = useScript();

  const tree = useMemo(() => {
    if (!script) {
      return null;
    }
    const expanded = [];
    const items = buildItems(script, '$root', 0, expanded, false);
    return {items, expanded};
  }, [script]);

  if (!tree) {
    return null;
  }

  return <RichTreeView items={tree.items} defaultExpandedItems={tree.expanded}/>;
}
