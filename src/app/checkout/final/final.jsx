import { useAuth0 } from "@auth0/auth0-react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import styles from "@/styles/final.module.css";
import { CancelOutlined, CheckCircleOutline } from "@mui/icons-material";

const Final = () => {
  const { user } = useAuth0();

  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const success = searchParams.get("success");
  console.log(typeof success);

  // useEffect(() => {

  // },[])

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        pt: { xs: "10em", md: "15em" },
        pb: { xs: "2em", md: "5em" },
      }}
    >
      <Grid
        item
        sx={{
          width: { xs: "100%", md: "600px" },
          paddingY: "25px",
          paddingX: { xs: "1em", md: "3em" },
        }}
        // className={styles.container}
      >
        <Stack direction={"column"} gap={4} alignItems={"center"}>
          {success === "true" ? (
            <>
              <CheckCircleOutline className={styles.successImage} />
              <Typography className={styles.title}>Order placed successfully!</Typography>
              <Typography className={styles.subtitle}>
                Check your email {user.email} for invoice
              </Typography>
            </>
          ) : (
            <>
              <CancelOutlined className={styles.failImage} />
              <Typography className={styles.title}>Could not place order!</Typography>
              <Typography className={styles.subtitle}>
                Please contact store for further assistance
              </Typography>
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Final;
