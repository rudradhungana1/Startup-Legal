import Box from "@mui/material/Box";
import {useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {contracts} from "../../../../../utils/contracts";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";


const TablePendingContracts = () =>{
  // ** States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const router = useRouter();

  const handleSign = (row) => {
     router.push(`/contracts/sign/${row.id}`);
  }

  const handleReject = () => {

  }

  const columns = [
    { id: 'id', label: 'S.N.', minWidth: 170 },
    { id: 'title', label: 'Title', minWidth: 100 },
    {
      id: 'status',
      label: 'Status',
      minWidth: 170,
      align: 'right',
      format: value => value.toLocaleString('en-US')
    },
    {
      id: 'date',
      label: 'Date',
      minWidth: 170,
      align: 'right',
      format: value => value.toLocaleString('en-US')
    },
    {
      id:'action',
      label:'Actions',
      minWidth: 170,
      align: 'center',
      render: (row) => (
        <Box sx={{display:'flex', gap:2}}>
          <Button
            variant={'contained'}
            color={"primary"}
            onClick={() => handleSign(row)}>
            Sign
          </Button>
          <Button
            variant={'outlined'}
            sx={{ backgroundColor:'red', color:'white', '&:hover':{backgroundColor:'#FFCDD2', color:'black'}}}
            onClick={() => handleReject(row)}>
            Reject
          </Button>
        </Box>
      ),
    }
  ]


  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Box>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts
              .filter((a) => a.status.toLowerCase() === 'pending')
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => (
                    <TableCell key={column.id} align={column.align}>
                      {column.render ? column.render(row) : (column.format && typeof row[column.id] === 'number' ? column.format(row[column.id]) : row[column.id])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={contracts.filter((a) => a.status.toLowerCase() === 'pending').length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </Box>
  );
}

export default TablePendingContracts;
