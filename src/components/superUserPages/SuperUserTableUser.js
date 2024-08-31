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
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// User koleksiyonu için kolon yapısı
const columns = [
  { id: "ID", label: "ID", minWidth: 70 },
  { id: "Name", label: "Name", minWidth: 170 },
  { id: "Email", label: "Email", minWidth: 200 },
  { id: "Role", label: "Role", minWidth: 100 },
  { id: "Phone", label: "Phone", minWidth: 150 },
  { id: "CompanyID", label: "Company", minWidth: 150 },
  {
    id: "CreatedAt",
    label: "Created At",
    minWidth: 170,
    align: "right",
    format: (value) => new Date(value).toLocaleString(),
  },
  {
    id: "SuperUser",
    label: "Super User",
    minWidth: 100,
    align: "center",
  },
];

export default function SuperUserTableUser() {
  const [data, setData] = React.useState([]); // API'den gelen veriler için state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Bileşen yüklendiğinde API çağrısını yapar
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/users"); // User koleksiyonuna istek
        if (!response.ok) throw new Error("Veriler alınamadı");
        const result = await response.json();
        setData(result); // Gelen veriyi state'e kaydet
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, []);

  // Veri güncelleme fonksiyonu
  const handleEdit = (id, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Verileri kaydetme fonksiyonu
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Veriler güncellenemedi");
      alert("Veriler başarıyla güncellendi!");
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      alert("Güncelleme sırasında bir hata oluştu.");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "SuperUser" ? (
                          <RadioGroup
                            row
                            value={value ? "yes" : "no"}
                            onChange={(e) =>
                              handleEdit(
                                row._id,
                                column.id,
                                e.target.value === "yes"
                              )
                            }
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        ) : column.format && typeof value !== "undefined" ? (
                          column.format(value)
                        ) : (
                          <TextField
                            value={value || ""}
                            onChange={(e) =>
                              handleEdit(row._id, column.id, e.target.value)
                            }
                            variant="outlined"
                            size="small"
                          />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSave}
        style={{ margin: "16px" }}
      >
        Save
      </Button>
    </Paper>
  );
}
