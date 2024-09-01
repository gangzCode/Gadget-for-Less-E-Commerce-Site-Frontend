import { useAuth0 } from "@auth0/auth0-react";
import { Backdrop, CircularProgress, Grid } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./payment.css";
import styles from "@/styles/payment.module.css";
import arrivalStyles from "../../../styles/arrivals.module.css";
import { chargeUser, getCart } from "@/services/apiCalls";
import { useSnackbar } from "notistack";

const Payment = () => {
  const { isLoading, user, getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  // const delivery = searchParams.get("delivery");

  useEffect(() => {
    async function checkCart() {
      getCart(await getAccessTokenSilently(), user.email).then((value) => {
        console.log(value);
        if (value && value.length === 0) {
          enqueueSnackbar("Payment cannot be accessed", { variant: "error" });
          router.push("/checkout");
        }
      });
    }

    checkCart();
  }, []);

  // useEffect(() => {
  //   if (address == null || delivery == null) {
  //     router.push("/checkout");
  //   }

  //   function redirectHandler(event) {
  //     // if (event.origin !== "http://example.org:8080") return;
  //     console.log(event);
  //   }

  //   window.addEventListener("message", redirectHandler, false);
  //   return () => {
  //     window.removeEventListener("message", redirectHandler, false);
  //   };
  // }, []);

  const Clover = window.Clover;

  const clover = new Clover("31312c18cf2329306148f936b5c040a2");
  const elements = clover.elements();

  // const form = document.getElementById("payment-form");
  async function cloverTokenHandler(token) {
    setLoading(true);
    chargeUser(await getAccessTokenSilently(), {
      username: user.email,
      // delivery,
      address,
      cToken: token,
    })
      .then((value) => {
        console.log(value);
        enqueueSnackbar("Payment successfull.", { variant: "success" });
        router.push(`/checkout/final?order=${value.order}&success=${true}`);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Error occurred during payment", { variant: "error" });
        router.push(`/checkout/final?success=${false}`);
        setLoading(false);
      });
  }

  const onSubmit = async (event) => {
    clover.createToken().then(function (result) {
      if (result.errors) {
        console.log(result.errors);
        Object.keys(result.errors).forEach(function (key) {
          // displayError.textContent = value;
          console.log(key);
        });
      } else {
        cloverTokenHandler(result.token);
        console.log(result.token);
      }
    });
  };

  const elementStyles = {
    body: {
      fontFamily: "Roboto, Open Sans, sans-serif",
      fontSize: "16px",
    },
    input: {
      fontSize: "20px",
    },
    iframe: {
      height: "50px",
    },
  };
  const cardNumber = elements.create("CARD_NUMBER", elementStyles);
  const cardDate = elements.create("CARD_DATE", elementStyles);
  const cardCvv = elements.create("CARD_CVV", elementStyles);
  const cardPostalCode = elements.create("CARD_POSTAL_CODE", elementStyles);
  useEffect(() => {
    cardNumber.mount("#card-number");
    cardDate.mount("#card-date");
    cardCvv.mount("#card-cvv");
    cardPostalCode.mount("#card-postal-code");
  }, []);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || isLoading}
      >
        <CircularProgress style={{ color: "#FF6B6B" }} />
      </Backdrop>
      <Grid container className={styles.container}>
        <Grid item xs={12} md={6} className={styles.header}>
          <div className={arrivalStyles.title}>Payment</div>
          {/* <div className={arrivalStyles.subtitle}>Free Shipping for standard order over $100</div> */}
        </Grid>
        <Grid
          item
          container
          justifyContent={"center"}
          alignItems={"center"}
          direction={"column"}
          // sx={{
          //   pt: { xs: "10em", md: "15em" },
          //   pb: { xs: "2em", md: "5em" },
          // }}
        >
          <Grid
            item
            sx={{
              width: { xs: "100%", md: "600px" },
            }}
          >
            <div className={styles.paymentContainer}>
              <form action={(e) => onSubmit(e)} method="post" id="payment-form">
                <div className={[styles.formRow, styles.topRow]}>
                  <div id="card-number" className={[styles.field]}></div>
                  <div className={styles.inputErrors} id="card-number-errors" role="alert"></div>
                </div>

                <div className={styles.bottomRow}>
                  <div className={[styles.formRow]}>
                    <div id="card-date" className={[styles.field]}></div>
                    <div className={styles.inputErrors} id="card-date-errors" role="alert"></div>
                  </div>

                  <div className={[styles.formRow]}>
                    <div id="card-cvv" className={[styles.field]}></div>
                    <div className={styles.inputErrors} id="card-cvv-errors" role="alert"></div>
                  </div>

                  <div className={[styles.formRow]}>
                    <div id="card-postal-code" className={[styles.field]}></div>
                    <div
                      className={styles.inputErrors}
                      id="card-postal-code-errors"
                      role="alert"
                    ></div>
                  </div>
                </div>

                <div id="card-response" role="alert"></div>

                <button className={styles.button}>
                  <span className={"btn-style-black " + styles.cartBtn}>
                    <div className="txt"> PAY </div>
                  </span>
                </button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
  // return (
  // <Grid
  //   container
  //   justifyContent={"center"}
  //   alignItems={"center"}
  //   sx={{
  //     pt: "15em",
  //     pb: "5em",
  //   }}
  // >
  //   <Grid
  //     item
  //     sx={{
  //       width: "600px",
  //       height: "525px",
  //     }}
  //   >
  //     <iframe
  //       src={`http://localhost:4000/api/v1/order/getPaymentPage?username=${user.email}&address=${address}&delivery=${delivery}`}
  //       style={{
  //         width: "100%",
  //         height: "100%",
  //         border: "1px solid #444",
  //         borderRadius: "25px",
  //       }}
  //       title="Embedded Page"
  //     ></iframe>
  //   </Grid>
  // </Grid>;
  // );
};

export default Payment;
