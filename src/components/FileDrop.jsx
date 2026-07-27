import { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Typography from '@mui/material/Typography'
import { useScript } from '../ScriptContext.jsx'

function hasFiles(event) {
  return [...(event.dataTransfer?.types ?? [])].includes('Files')
}

export default function FileDrop() {
  const { setScriptXML } = useScript()
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    // depth counter, dragenter/dragleave fire per child element
    let depth = 0

    function onDragEnter(event) {
      if (!hasFiles(event)) {
        return
      }
      depth += 1
      setDragging(true)
    }

    function onDragLeave(event) {
      if (!hasFiles(event)) {
        return
      }
      depth = Math.max(0, depth - 1)
      if (depth === 0) {
        setDragging(false)
      }
    }

    function onDragOver(event) {
      if (hasFiles(event)) {
        event.preventDefault()
      }
    }

    function onDrop(event) {
      if (!hasFiles(event)) {
        return
      }
      event.preventDefault()
      depth = 0
      setDragging(false)
      const file = event.dataTransfer.files?.[0]
      if (!file) {
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        setScriptXML(String(reader.result))
      }
      reader.readAsText(file)
    }

    window.addEventListener('dragenter', onDragEnter)
    window.addEventListener('dragleave', onDragLeave)
    window.addEventListener('dragover', onDragOver)
    window.addEventListener('drop', onDrop)
    return () => {
      window.removeEventListener('dragenter', onDragEnter)
      window.removeEventListener('dragleave', onDragLeave)
      window.removeEventListener('dragover', onDragOver)
      window.removeEventListener('drop', onDrop)
    }
  }, [setScriptXML])

  return (
    <Backdrop open={dragging} sx={{ zIndex: (theme) => theme.zIndex.modal + 1, pointerEvents: 'none' }}>
      <Typography variant="h5" sx={{ color: 'common.white' }}>
        Drop script XML
      </Typography>
    </Backdrop>
  )
}
