import { createTheme } from '@mui/material/styles'

// light/dark via css vars, mode persisted by useColorScheme
export default createTheme({
  colorSchemes: { light: true, dark: true },
})
