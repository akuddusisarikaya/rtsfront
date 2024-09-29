import * as React from "react";
import "../../App.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "_id", label: "ID", minWidth: 170 },
  { id: "company_id", label: "CompanyID", minWidth: 170 },
  { id:"company_name", label:"CompanyName", minWidth:170},
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "role", label: "Role", minWidth: 100 },
  { id: "phone", label: "Phone", minWidth: 150 },
];

export default function SuperUserTableAdmin() {
  const [data, setData] = React.useState([]); // Başlangıç değeri boş dizi olmalı
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const nav = useNavigate();

  const goAdd = () => {
    nav("/superuseradminadd");
  };

  // Bileşen yüklendiğinde API çağrısını yapar
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch("http://54.93.232.137:8080/superuser/getadmins", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        }); 
        if (!response.ok) throw new Error("Veriler alınamadı");
        const result = await response.json();
        setData(result || []); 
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        setData([]); // Hata durumunda data'yı boş dizi olarak ayarla
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const goEdit = () => {
    nav("/superuseradminedit");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Button onClick={goAdd} variant="contained" color="secondary">
        Add Admin
      </Button>
      <Button onClick={goEdit} variant="contained" color="secondary">
        Edit Admin
      </Button>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.ID}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value !== "undefined"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length} // Null kontrolü
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
