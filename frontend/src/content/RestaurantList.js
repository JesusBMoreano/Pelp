import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RestaurantList() {
  const [message, setMessage] = useState("");
  const [duplicate, setDuplicate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRestaurants();
  }, [duplicate]);

  const getRestaurants = async () => {
    try {
      const url = duplicate ? "/restaurants/getDuplicates" : "/restaurants";

      const respo = await axios.get(url, {
        withCredentials: true,
      });
      console.log("res", respo);
      setMessage(respo);
      console.log(respo);
      setLoading(false);
      setRows(respo.data.map((data) => ({ id: data.id })));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRestaurant = async (id) => {
    try {
      await axios.delete(`/restaurant/${id}`);
      getRestaurants();
    } catch (error) {
      console.error(error);
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}></Box>
        </Modal>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Restaurant List
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack
          direction="row"
          spacing={2}
          className="my-2 mb-2"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ width: "97%" }}
        >
          <FormControlLabel
            control={
              <Checkbox
                style={{ marginLeft: "auto" }}
                checked={duplicate}
                onChange={(e) => setDuplicate(e.target.checked)}
              />
            }
            label="Show Duplicates"
          />
        </Stack>
        <Box height={10} />
        <TableContainer sx={{ maxHeight: 650 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  ID
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  OwnerId
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Rating
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Price
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Address
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Zip Code
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Open Hours
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Close Hours
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Status
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <div className="load">
                  <BeatLoader
                    color={"#2196f3"}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                message.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell key={row.id} align="left">
                          {row.id}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.ownerId}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.name}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.rating}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.price}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.address}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.zipCode}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.openHour}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.closeHour}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.openStatus ? (
                            <CheckCircleOutlineIcon
                              style={{
                                color: "green",
                              }}
                            />
                          ) : (
                            <CloseIcon
                              style={{
                                color: "red",
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            {row.openStatus ? (
                              ""
                            ) : (
                              <DeleteIcon
                                style={{
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  color: "blue",
                                }}
                                onClick={() => {
                                  deleteRestaurant(row.id);
                                }}
                              />
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
