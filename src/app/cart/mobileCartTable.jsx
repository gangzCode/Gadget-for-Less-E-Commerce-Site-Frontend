import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import styles from "@/styles/cartMobile.module.css";
import sliderStyles from "../../styles/userSlider.module.css";
import Link from "next/link";
import NumberInput from "@/components/numberInput";

const MobileCartTable = ({ data, quantityInc, quantityDec, removeItem }) => {
  return (
    <Grid container className={styles.container}>
      {data.map((row) => (
        <Grid container item xs={12} gap={0.5} className={styles.cartItem} key={row._id}>
          <Grid item xs={3}>
            <Link href={`/product/${encodeURIComponent(row.product._id)}`} passHref>
              <Box
                component="img"
                src={row.product.image}
                className={styles.tableImage + " " + sliderStyles.mousePointer}
              />
            </Link>
          </Grid>
          <Grid item xs>
            <Stack direction={"column"} justifyContent={"space-between"} height={"100%"}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack direction={"column"}>
                  <Link href={`/product/${encodeURIComponent(row.product._id)}`} passHref>
                    <div className={sliderStyles.mousePointer}>{row.product.name}</div>
                  </Link>
                  <div className={styles.variationText}>{row.variationDetails.name}</div>
                </Stack>
                <div
                  className={styles.dropdnClose + " dropdn-close"}
                  onClick={() => removeItem(row._id)}
                >
                  <div></div>
                  <div></div>
                </div>
              </Stack>
              <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                <div className={styles.priceText}>
                  $ {row.discountedPrice ? row.discountedPrice : row.price}
                </div>

                <div>
                  <NumberInput
                    value={row.quantity}
                    increment={() => quantityInc(row._id)}
                    decrement={() => quantityDec(row._id)}
                  />
                </div>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default MobileCartTable;
