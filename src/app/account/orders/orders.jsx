import arrivalStyles from "../../../styles/arrivals.module.css";
import {
  Backdrop,
  Box,
  Chip,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Profile from "../../../components/profile";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/account.module.css";
import { downloadReportApi, getOrders } from "../../../services/apiCalls";
import { useAuth0 } from "@auth0/auth0-react";
import { useSnackbar } from "notistack";
import { Download, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Link from "next/link";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      getOrders(await getAccessTokenSilently(), user.email)
        .then((value) => {
          setOrders(value);
          setLoading(false);
        })
        .catch((reason) => {
          setLoading(false);
          enqueueSnackbar("Error occurred when placing order.", { variant: "error" });
        });
    }
    fetchData();
  }, []);

  async function downloadReport(orderId) {
    setLoading(true);
    downloadReportApi(await getAccessTokenSilently(), orderId)
      .then((value) => {
        setLoading(false);
        let link = document.createElement("a");
        link.download = "order-invoice.pdf";
        link.href = value.dataStr;
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch((e) => {
        enqueueSnackbar("Error occurred when downloading invoice.", { variant: "error" });
        setLoading(false);
      });
  }

  function getTag(type) {
    if (type === "P") {
      return <Chip label="Pending" />;
    } else if (type === "PR") {
      return <Chip label="Processing" color="primary" />;
    } else if (type === "S") {
      return <Chip label="Shipped" color="primary" />;
    } else if (type === "D") {
      return <Chip label="Delivered" color="primary" />;
    } else if (type === "C") {
      return <Chip label="Cancelled" color="error" />;
    } else if (type === "F") {
      return <Chip label="Completed" color="success" />;
    }
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          {/*<TableCell component="th" scope="row" align="center">
                        {row._id}
                    </TableCell>
                    <TableCell align="center">{row.username}</TableCell>*/}
          <TableCell align="center">{new Date(row.date).toLocaleString()}</TableCell>
          <TableCell align="center">{row.delivery}</TableCell>
          <TableCell align="center">{getTag(row.status)}</TableCell>
          <TableCell align="center">
            {row.tracking && (
              <Link href={row.tracking} passHref>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <Chip
                    label="Track Order"
                    href={row.tracking}
                    color="primary"
                    style={{ cursor: "pointer" }}
                  />
                </a>
              </Link>
            )}
          </TableCell>
          <TableCell align="center">
            <IconButton onClick={() => downloadReport(row._id)}>
              <Download />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1, marginLeft: "60px", marginBottom: "60px" }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Image</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Color</TableCell>
                      {/* <TableCell align="center">Size</TableCell> */}
                      <TableCell align="center">Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.orderItems.map(
                      (historyRow) =>
                        historyRow.itemId && (
                          <TableRow key={historyRow.itemId._id}>
                            <TableCell align="center" component="th" scope="row">
                              <Box
                                component="img"
                                style={{ height: "60px", width: "60px", objectFit: "cover" }}
                                src={historyRow.itemId.image}
                              />
                            </TableCell>
                            <TableCell align="center">{historyRow.itemId.name}</TableCell>
                            <TableCell align="center">
                              <div
                                style={{
                                  height: "30px",
                                  width: "30px",
                                  borderRadius: "15px",
                                  backgroundColor: historyRow.itemColor,
                                }}
                              />
                            </TableCell>
                            {/* <TableCell align="center">{historyRow.itemSize}</TableCell> */}
                            <TableCell align="center">{historyRow.itemQuantity}</TableCell>
                          </TableRow>
                        )
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress style={{ color: "#FF6B6B" }} />
      </Backdrop>
      <div
        // style={{ padding: "50px 6rem 50px 6rem", fontSize: "25px" }}
        className={styles.infoContainer}
      >
        <div className={arrivalStyles.title}>MY ACCOUNT</div>
        <Grid container className={styles.container} gap={6}>
          <Grid item xs={12} lg={4}>
            <Profile current={"order"} />
          </Grid>

          <Grid item xs={12} lg={7}>
            <h2 className={styles.heading}>My Orders</h2>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    {/*<TableCell align="center">Order ID</TableCell>
                                        <TableCell align="center">User</TableCell>*/}
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Delivery</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Tracking</TableCell>
                    <TableCell align="center">Download</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((row) => (
                    <Row key={row._id} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Orders;
