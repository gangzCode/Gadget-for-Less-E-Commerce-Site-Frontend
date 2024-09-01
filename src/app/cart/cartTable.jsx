import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "../../styles/cart.module.css";
import sliderStyles from "../../styles/userSlider.module.css";
import React, { Fragment } from "react";
import NumberInput from "../../components/numberInput";
import Link from "next/link";

const CartTable = ({ columns, data, quantityInc, quantityDec, removeItem }) => {
  return (
    <TableContainer component={Paper} className={styles.removeShadow}>
      <Table>
        <TableHead>
          <TableRow>
            {columns?.map((col) => (
              <TableCell key={col.name} align="center" className={styles.tableHeader}>
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <Fragment key={row._id}>
              <TableRow>
                <TableCell className={styles.tableBody} align="center" width="14%">
                  <Link href={`/product/${encodeURIComponent(row.product._id)}`} passHref>
                    <Box
                      component="img"
                      src={row.product.image}
                      className={styles.tableImage + " " + sliderStyles.mousePointer}
                    />
                  </Link>
                </TableCell>
                <TableCell className={styles.tableBody} align="left" width="35%">
                  <div className={styles.tableCell}>
                    <Link href={`/product/${encodeURIComponent(row.product._id)}`} passHref>
                      <div className={sliderStyles.mousePointer}>{row.product.name}</div>
                    </Link>
                  </div>
                </TableCell>
                <TableCell className={styles.tableBody} align="center" width="21%">
                  <div className={styles.tableCell}>
                    {row.discountedPrice ? row.discountedPrice : row.price}
                  </div>
                </TableCell>
                <TableCell className={styles.tableBody} align="center" width="21%">
                  <div className={styles.tableCell}>
                    <NumberInput
                      value={row.quantity}
                      increment={() => quantityInc(row._id)}
                      decrement={() => quantityDec(row._id)}
                    />
                  </div>
                </TableCell>
                <TableCell className={styles.tableBody} align="center" width="21%">
                  <div className={styles.tableCell}>
                    {row.discountedPrice
                      ? row.discountedPrice * row.quantity
                      : row.price * row.quantity}
                  </div>
                </TableCell>
                <TableCell className={styles.tableBody} align="center" width="10%">
                  <div className={styles.tableCell}>
                    <div
                      className={styles.dropdnClose + " dropdn-close"}
                      onClick={() => removeItem(row._id)}
                    >
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className={styles.tableEmptyGap} />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
