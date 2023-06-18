import "./App.css";
import { api } from "./utils";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";

function App() {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [jenisBarang, setJenisBarang] = useState([]);
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    { field: "nama_barang", headerName: "Nama Barang", width: 130 },
    { field: "jenis_barang", headerName: "Jenis Barang", width: 130 },
    {
      field: "stock",
      headerName: "Stok",
      type: "number",
      width: 90,
    },
  ];

  const fetchData = () =>
    api.get("barang").then((response) => {
      setData(response.data.data);
    });

  const fetchJenisBarang = () =>
    api.get("jenis-barang").then((response) => {
      setJenisBarang(response.data.data);
    });

  const onSubmit = (e) => {};

  useEffect(() => {
    fetchData();
    fetchJenisBarang();
  }, []);

  return (
    <div className="App">
      <Paper
        style={{
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            maxHeight: "400px",
            width: "45%",
          }}
        >
          <DataGrid rows={data} columns={columns} pageSizeOptions={[5, 10]} />
        </div>

        <Paper style={{ width: "45%", padding: "16px" }}>
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              label="Nama Barang"
              required
              onChange={(event) => {
                setForm((prevForm) => ({
                  ...prevForm,
                  nama_barang: event.target.value,
                }));
              }}
              value={form?.nama_barang}
            />

            <TextField
              variant="outlined"
              label="Stok"
              type="number"
              required
              onChange={(event) => {
                setForm((prevForm) => ({
                  ...prevForm,
                  stock: event.target.value,
                }));
              }}
              value={form?.stock}
            />

            <FormControl fullWidth>
              <InputLabel>Jenis Barang</InputLabel>

              <Select
                label="Jenis Barang"
                required
                onChange={(event) => {
                  setForm((prevForm) => ({
                    ...prevForm,
                    id_jenis_barang: event.target.value,
                  }));
                }}
                value={jenisBarang.find(
                  (item) => item.id === form?.id_jenis_barang
                )}
              >
                {jenisBarang.map((item) => (
                  <MenuItem key={`jenis-barang-${item.id}`} value={item.id}>
                    {item.nama}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              type="button"
              onClick={() => setForm({})}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="outlined"
              endIcon={<SendIcon />}
              onSubmit={onSubmit}
            >
              Send
            </Button>
          </Stack>
        </Paper>
      </Paper>
    </div>
  );
}

export default App;
