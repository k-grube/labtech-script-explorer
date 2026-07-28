import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

// sticky script list for bundle exports, hidden for single-script exports
export default function ScriptNav({ items }) {
  if (items.length < 2) {
    return null
  }

  return (
    <List
      dense
      sx={{ position: 'sticky', top: 80, minWidth: 220, flexShrink: 0 }}
      subheader={<ListSubheader disableSticky>Scripts</ListSubheader>}
    >
      {items.map((item) => (
        <ListItemButton
          key={item.id}
          onClick={() => document.getElementById(item.id)?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })}
        >
          <ListItemText primary={item.label} secondary={`ScriptId ${item.scriptId}`} />
        </ListItemButton>
      ))}
    </List>
  )
}
