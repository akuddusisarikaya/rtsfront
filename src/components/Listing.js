import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Listing({ row }) {
  const [open, setOpen] = React.useState(false);

  // Eğer row bir object ise ve direk gösterilmek isteniyorsa, JSON.stringify kullanılabilir
  return (
    <React.Fragment>
      <p>{JSON.stringify(row)}</p> {/* Or any specific properties you want to display */}
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.ProviderEmail}
        </TableCell>
        <TableCell align="right">{new Date(row.Date).toLocaleDateString()}</TableCell>
        <TableCell align="right">{row.StartTime} - {row.EndTime}</TableCell>
        <TableCell align="right">{row.Activate ? 'Active' : 'Inactive'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Appointment Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableBody>
                  <TableRow>
                    <TableCell>Services</TableCell>
                    <TableCell align="right">{Array.isArray(row.Services) ? row.Services.join(', ') : 'No Services'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Company Name</TableCell>
                    <TableCell align="right">{row.CompanyName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Notes</TableCell>
                    <TableCell align="right">{row.Notes || 'No Notes'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Created At</TableCell>
                    <TableCell align="right">{new Date(row.CreatedAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
