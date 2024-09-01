import styles from "../../styles/cart.module.css";
import arrivalStyles from "../../styles/arrivals.module.css";
import BillingForm from "./billingForm";
import { Backdrop, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CheckoutTable from "./checkoutTable";
import { getActiveTaxes, getCart } from "../../services/apiCalls";
import { useAuth0 } from "@auth0/auth0-react";
import { useSnackbar } from "notistack";

const Checkout = ({ refreshCart, orderPlaced }) => {
  function createData(id, name, image, fat, carbs, protein) {
    return { id, name, image, fat, carbs, protein };
  }

  const [data, setData] = useState([
    createData(0, "Frozen yoghurt", "images/tempItems/cartImage.jpg", 6.0, 24, 4.0),
    createData(1, "Floral Print Top", "images/tempItems/cartImage.jpg", "$170.00", 2, "$85.00"),
    createData(2, "Eclair", "images/tempItems/cartImage.jpg", 16.0, 24, 6.0),
    createData(3, "Cupcake", "images/tempItems/cartImage.jpg", 3.7, 67, 4.3),
    createData(4, "Gingerbread", "images/tempItems/cartImage.jpg", 16.0, 49, 3.9),
  ]);

  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [cartArray, setCartArray] = useState([]);
  const [rawTotal, setRawTotal] = useState(0);
  const [discounts, setDiscounts] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [taxes, setTaxes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await loadCartValue();
    }
    fetchData();
  }, [refreshCart]);

  async function loadCartValue() {
    if (isAuthenticated) {
      setLoading(true);
      getCart(await getAccessTokenSilently(), user.email)
        .then((value) => {
          setCartArray(value);
          let tempRawTot = 0;
          let tempTotDiscount = 0;
          value?.forEach((item) => {
            tempRawTot += item.price * item.quantity;
            if (item.discountedPrice) {
              tempTotDiscount += (item.price - item.discountedPrice) * item.quantity;
            }
          });

          setRawTotal(tempRawTot);
          setDiscounts(tempTotDiscount);
          getActiveTaxes()
            .then((taxes) => {
              // console.log(taxes);
              const subtotal = tempRawTot - tempTotDiscount;
              let tempTaxes = taxes.map((tax) => {
                return {
                  ...tax,
                  amount: (subtotal / 100) * tax.percentage,
                };
              });
              console.log(tempTaxes);

              setShipping(subtotal > 100 ? 0 : 10);

              setTaxes(tempTaxes);
              setLoading(false);
            })
            .catch((reason) => {
              enqueueSnackbar("Error occurred getting taxes.", { variant: "error" });
              setLoading(false);
            });

          // setLoading(false);
        })
        .catch((reason) => {
          console.log(reason);

          enqueueSnackbar("Error occurred getting products.", { variant: "error" });
          setLoading(false);
        });
    }
  }

  const getGrandTotal = () => {
    const subtotal = rawTotal - discounts;

    const total = taxes.reduce((total, currentTax) => {
      return total + currentTax.amount;
    }, subtotal);
    return total + shipping;
  };

  // function shippingDetails(data) {
  //   if (data.isNormal) {
  //     setShipping(data.shipping?.normalPrice);
  //   } else {
  //     setShipping(data.shipping?.expensivePrice);
  //   }
  // }

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress style={{ color: "#FF6B6B" }} />
      </Backdrop>
      <div className={styles.container}>
        <div className={arrivalStyles.title}>CHECKOUT</div>
        <Grid container columnGap={5}>
          <Grid item xs={12} md={5}>
            <div className={styles.subTopic}>Billing Details</div>
            <BillingForm
              cart={cartArray}
              // shippingDetails={shippingDetails}
              loading={(e) => setLoading(e)}
              orderPlaced={orderPlaced}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={styles.subTopic}>Your Order</div>
            {cartArray && cartArray.length > 0 ? (
              <CheckoutTable
                data={cartArray}
                rawTotal={rawTotal}
                discounts={discounts}
                shipping={shipping}
                taxes={taxes}
                loading={(e) => setLoading(e)}
                grandTotal={getGrandTotal()}
              />
            ) : (
              <div className={styles.subTopic} style={{ textAlign: "center" }}>
                CART IS EMPTY
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Checkout;
