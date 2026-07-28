import { useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { RichTreeView } from '@mui/x-tree-view/RichTreeView'
import { useScript } from '../ScriptContext.jsx'

// expand this many levels by default, deeper nodes start collapsed
const EXPAND_DEPTH = 5
const MAX_LABEL = 80

function leafLabel(key, value) {
  if (typeof value === 'string' && value.length > MAX_LABEL) {
    return `${key}: ${value.slice(0, MAX_LABEL)}...`
  }
  return `${key}: ${String(value)}`
}

function buildItems(value, path, depth, expanded, parentIsArray) {
  return Object.entries(value).map(([key, child]) => {
    const id = `${path}.${key}`
    const name = parentIsArray ? `[${key}]` : key
    if (child !== null && typeof child === 'object') {
      if (depth < EXPAND_DEPTH) {
        expanded.push(id)
      }
      const isArray = Array.isArray(child)
      return {
        id,
        label: isArray ? `${name} [${child.length}]` : name,
        children: buildItems(child, id, depth + 1, expanded, isArray),
      }
    }
    return { id, label: leafLabel(name, child) }
  })
}

export default function JsonView() {
  const { script } = useScript()
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef(null)

  const tree = useMemo(() => {
    if (!script) {
      return null
    }
    const expanded = []
    const items = buildItems(script, '$root', 0, expanded, false)
    return { items, expanded }
  }, [script])

  if (!tree) {
    return null
  }

  function copyJson() {
    navigator.clipboard.writeText(JSON.stringify(script, null, 2)).then(() => {
      setCopied(true)
      clearTimeout(copiedTimer.current)
      copiedTimer.current = setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Button size="small" variant="outlined" onClick={copyJson}>
          {copied ? 'Copied' : 'Copy JSON'}
        </Button>
      </Box>
      <RichTreeView items={tree.items} defaultExpandedItems={tree.expanded} />
    </Box>
  )
}
