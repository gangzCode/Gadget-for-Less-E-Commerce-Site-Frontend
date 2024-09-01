import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "../../styles/cart.module.css";
import React, { Fragment } from "react";

const CheckoutTable = ({ data, rawTotal, discounts, shipping, taxes, grandTotal, loading }) => {
  function currencyFormat(num) {
    return num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <>
      <TableContainer component={Paper} className={styles.removeShadow}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" className={styles.tableHeader} width="5%">
                Product Image
              </TableCell>
              <TableCell align="center" className={styles.tableHeader} width="40%">
                Product Name
              </TableCell>
              <TableCell align="center" className={styles.tableHeader} width="25%">
                Unit Price
              </TableCell>
              <TableCell align="center" className={styles.tableHeader} width="5%">
                Qty
              </TableCell>
              <TableCell align="center" className={styles.tableHeader} width="25%">
                Subtotal
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <Fragment key={row._id}>
                <TableRow>
                  <TableCell className={styles.tableBody} align="center">
                    <div>
                      <Box component="img" src={row.product.image} className={styles.tableImage} />
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableBody} align="center">
                    <div className={styles.tableCell}>{row.product.name}</div>
                  </TableCell>
                  <TableCell className={styles.tableBody} align="center">
                    <div className={styles.tableCell}>
                      {row.discountedPrice ? row.discountedPrice : row.price}
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableBody} align="center">
                    <div className={styles.tableCell}>{row.quantity}</div>
                  </TableCell>
                  <TableCell className={styles.tableBody} align="center">
                    <div className={styles.tableCell}>
                      {row.discountedPrice
                        ? row.discountedPrice * row.quantity
                        : row.price * row.quantity}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className={styles.tableEmptyGap} />
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container className={styles.textContainer}>
        <Grid item xs={8} className={styles.textRight + " " + styles.fontPop}>
          Subtotal
        </Grid>
        <Grid item xs={4} className={styles.textRight + " " + styles.fontPop}>
          $ {currencyFormat(rawTotal)}
        </Grid>
        <Grid item xs={8} className={styles.textRight + " " + styles.fontPop}>
          Discount
        </Grid>
        <Grid item xs={4} className={styles.textRight + " " + styles.fontPop}>
          $ {currencyFormat(discounts)}
        </Grid>
        {taxes.map((tax) => {
          return (
            <React.Fragment key={tax._id}>
              <Grid item xs={8} className={styles.textRight + " " + styles.fontPop}>
                {tax.taxname} ({tax.percentage}%)
              </Grid>
              <Grid item xs={4} className={styles.textRight + " " + styles.fontPop}>
                $ {currencyFormat(tax.amount)}
              </Grid>
            </React.Fragment>
          );
        })}
        <Grid item xs={8} className={styles.textRight + " " + styles.fontPop}>
          Shipping
        </Grid>
        <Grid item xs={4} className={styles.textRight + " " + styles.fontPop}>
          $ {currencyFormat(shipping)}
        </Grid>
        <Grid
          item
          xs={8}
          className={styles.textRight + " " + styles.fontPop}
          style={{ fontSize: "20px", color: "#FF6B6B" }}
        >
          Grand Total
        </Grid>
        <Grid
          item
          xs={4}
          className={styles.textRight + " " + styles.fontPop}
          style={{ fontSize: "20px", color: "#FF6B6B" }}
        >
          $ {currencyFormat(grandTotal)}
        </Grid>
      </Grid>
    </>
  );
};

export default CheckoutTable;
