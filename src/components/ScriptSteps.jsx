import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const sections = [
  { action: 1, title: 'IF' },
  { action: 2, title: 'THEN' },
  { action: 3, title: 'ELSE' },
]

export default function ScriptSteps({ steps }) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell width={60}>#</TableCell>
          <TableCell>Step</TableCell>
          <TableCell width={160}>On Failure</TableCell>
          <TableCell width={200}>OS Limit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sections.map(({ action, title }) => {
          const rows = steps.filter((step) => step.Action === action)
          if (!rows.length) {
            return null
          }
          return [
            <TableRow key={`head-${action}`}>
              <TableCell colSpan={4} sx={{ fontWeight: 'bold' }}>
                {title}
              </TableCell>
            </TableRow>,
            ...rows.map((step) => (
              <TableRow key={`${action}-${step.Sort}`} data-testid="script-step">
                <TableCell>{step.Sort + 1}</TableCell>
                <TableCell sx={{ pl: 2 + step.Indentation }}>{step.StepDescription}</TableCell>
                <TableCell>{step.ContinueObject}</TableCell>
                <TableCell>{step.OsLimitObject}</TableCell>
              </TableRow>
            )),
          ]
        })}
      </TableBody>
    </Table>
  )
}
