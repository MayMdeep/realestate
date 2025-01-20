import React, { useState, useEffect } from "react";
import { api_Routes } from "../../api_Route";
import { Helper } from "../../Tools/Helper";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Grid,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  LinearProgress,
} from "@mui/material";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const Log = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0); // Page starts from 0 for TablePagination
  const [values, setValues] = useState({});
  const [values_Filter, setFilter_Values] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [logs, setLogs] = useState([]);

  const BaseApi = api_Routes.logs.all;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getLogs(signal);

    return () => {
      controller.abort();
    };
  }, [values_Filter, page, perPage]);

  const getLogs = async (signal) => {
    let url = BaseApi + '?1=1';

    // Add filters to the URL
    if (values_Filter.action) {
      url += `&filters[action]=${values_Filter.action}`;
    }
    if (values_Filter.ipAddress) {
      url += `&filters[ipAddress]=${values_Filter.ipAddress}`;
    }
    if (values_Filter.userAgent) {
      url += `&filters[userAgent]=${values_Filter.userAgent}`;
    }

    // Add pagination parameters
    url += `&page=${page + 1}&perPage=${perPage}`; // page + 1 because backend starts from 1

    setIsLoading(true);

    const { response, message } = await Helper.Get({
      url: url,
      hasToken: true,
      signal: signal,
    });

    if (response) {
      // console.log(response);
      setLogs(response.data); // Set the logs state to response.data
      setTotalItems(response.pagination.total); // Set the total items to response.pagination.total
      setIsLoading(false);
    } else {
      // console.log(message);/
      setIsLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update the page state
  };

  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10)); // Update rows per page
    setPage(0); // Reset to the first page
  };

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilter = () => {
    setFilter_Values(values);
  };

  return (
    <>
      <Container sx={{ marginBottom: "20px" }}>
        <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Grid item>
            <Typography sx={{ fontSize: "28px", fontWeight: "600", color: "#1e1b1b" }}>Logs</Typography>
          </Grid>
        </Grid>
        <Card sx={{ marginTop: "20px" }}>
          <CardContent>
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="filled-basic"
                    label="Search By Action"
                    variant="standard"
                    name="action"
                    color="primary"
                    size="small"
                    onChange={(e) => { handleChange("action", e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="filled-basic"
                    label="Search By IP Address"
                    variant="standard"
                    name="ipAddress"
                    color="primary"
                    size="small"
                    onChange={(e) => { handleChange("ipAddress", e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="filled-basic"
                    label="Search By User Agent"
                    variant="standard"
                    name="userAgent"
                    color="primary"
                    size="small"
                    onChange={(e) => { handleChange("userAgent", e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} sx={{ marginTop: "5px" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#244770",
                      textAlign: "right",
                      fontSize: "13px",
                      borderRadius: "7px",
                      height: "38px",
                      '&:hover': { backgroundColor: "#244770" },
                    }}
                    onClick={handleFilter}
                  >
                    <ManageSearchIcon />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>

      {isLoading ? (
        <LinearProgress sx={{ marginTop: "30px", color: "#244770" }} />
      ) : (
        <Container fluid="true">
          <Grid container>
            <Grid item lg={12}>
              <Card>
                <CardContent>
                  <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
                    <Table>
                      <TableHead sx={{ backgroundColor: "#244770 !important", color: "white !important" }}>
                        <TableRow>
                          <TableCell sx={{ color: "white" }}>Action</TableCell>
                          <TableCell sx={{ color: "white" }}>Details</TableCell>
                          <TableCell sx={{ color: "white" }}>IP Address</TableCell>
                          <TableCell sx={{ color: "white" }}>User Agent</TableCell>
                          <TableCell sx={{ color: "white" }}>Created At</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {logs.length > 0 ? (
                          logs.map((log) => (
                            <TableRow key={log._id}>
                              <TableCell>{log.action}</TableCell>
                              <TableCell>{log.details}</TableCell>
                              <TableCell>{log.ipAddress}</TableCell>
                              <TableCell>{log.userAgent}</TableCell>
                              <TableCell>
                                {log.createdAt ? new Date(log.createdAt).toLocaleString() : 'N/A'}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} align="center">
                              No logs found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>

                    {/* TablePagination */}
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, 50, 100]}
                      component="div"
                      count={totalItems} // Total number of items
                      rowsPerPage={perPage} // Rows per page
                      page={page} // Current page (starts from 0)
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage} 
                    />
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Log;