import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import styles from "../../styles/cart.module.css";
import arrivalStyles from "../../styles/arrivals.module.css";
import footerStyles from "../../styles/footer.module.css";
import React, { useEffect, useState } from "react";
import CartTable from "./cartTable";
import {
  clearCartApi,
  deleteFromCart,
  getActiveTaxes,
  getCart,
  updateCartApi,
} from "../../services/apiCalls";
import { useAuth0 } from "@auth0/auth0-react";
import { useSnackbar } from "notistack";
import Link from "next/link";
import MobileCartTable from "./mobileCartTable";

const Cart = ({ refreshCart, onRemove }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [cartArray, setCartArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forceDataLoad, setForceDataLoad] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCouponWindow, setShowCouponWindow] = useState(false);
  const [couponType, setCouponType] = useState("");

  const [rawTotal, setRawTotal] = useState(0);
  const [discounts, setDiscounts] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [taxes, setTaxes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await loadCartValue();
    }
    fetchData();
  }, [refreshCart, forceDataLoad]);

  async function loadCartValue() {
    if (isAuthenticated) {
      setLoading(true);
      getCart(await getAccessTokenSilently(), user.email)
        .then((value) => {
          setCartArray(value);
          // console.log(value);
          let tempRawTot = 0;
          let tempTotDiscount = 0;
          value?.forEach((item) => {
            tempRawTot += item.price * item.quantity;
            if (item.discountedPrice) {
              tempTotDiscount += (item.price - item.discountedPrice) * item.quantity;
            }
          });
          console.log(value);

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

              const shippingAmount = value && value.length > 0 ? (subtotal > 100 ? 0 : 10) : 0;
              setShipping(shippingAmount);
              setTaxes(tempTaxes);
              setLoading(false);
            })
            .catch((reason) => {
              enqueueSnackbar("Error occurred getting cart.", { variant: "error" });
              setLoading(false);
            });
        })
        .catch((reason) => {
          enqueueSnackbar("Error occurred getting cart.", { variant: "error" });
          setLoading(false);
        });
    }
  }

  async function clearCart() {
    if (isAuthenticated) {
      setShowConfirm(false);
      setLoading(true);
      clearCartApi(await getAccessTokenSilently(), user.email)
        .then((value) => {
          enqueueSnackbar("Cart cleared.", { variant: "success" });
          setLoading(false);
          setForceDataLoad(!forceDataLoad);
          onRemove();
        })
        .catch((reason) => {
          enqueueSnackbar("Error occurred clearing cart.", { variant: "error" });
          setLoading(false);
        });
    }
  }

  async function removeItem(cartId) {
    if (isAuthenticated) {
      setShowConfirm(false);
      setLoading(true);
      deleteFromCart(await getAccessTokenSilently(), user.email, cartId)
        .then((value) => {
          setLoading(false);
          setForceDataLoad(!forceDataLoad);
          onRemove();
        })
        .catch((reason) => {
          enqueueSnackbar("Error occurred when deleting item.", { variant: "error" });
          setLoading(false);
        });
    }
  }

  async function updateCart() {
    if (isAuthenticated) {
      setShowConfirm(false);
      setLoading(true);
      updateCartApi(await getAccessTokenSilently(), cartArray)
        .then((value) => {
          enqueueSnackbar("Cart updated.", { variant: "success" });
          setLoading(false);
          setForceDataLoad(!forceDataLoad);
          onRemove();
        })
        .catch((reason) => {
          enqueueSnackbar("Error occurred when deleting item.", { variant: "error" });
          setLoading(false);
        });
    }
  }

  const columns = [
    { name: "Product Image" },
    { name: "Product Name" },
    { name: "Unit Price" },
    { name: "Qty" },
    { name: "Subtotal" },
    { name: "Remove" },
  ];

  const quantityInc = (itemId) => {
    let updated = [];
    for (let item of cartArray) {
      if (item._id === itemId && item.quantity < item.stockSize) {
        item.quantity++;
      }
      updated.push(item);
    }
    setCartArray(updated);
  };
  const quantityDec = (itemId) => {
    let updated = [];
    for (let item of cartArray) {
      if (item._id === itemId) {
        if (item.quantity === 1) {
          return;
        }
        item.quantity--;
      }
      updated.push(item);
    }
    setCartArray(updated);
  };

  // function addCoupon() {
  //   setCouponType("coupon");
  //   setShowCouponWindow(true);
  // }

  // function addGiftCard() {
  //   setCouponType("gift card");
  //   setShowCouponWindow(true);
  // }

  const getGrandTotal = () => {
    const subtotal = rawTotal - discounts;

    const total = taxes.reduce((total, currentTax) => {
      return total + currentTax.amount;
    }, subtotal);
    return total + shipping;
  };

  function currencyFormat(num) {
    return num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress style={{ color: "#FF6B6B" }} />
      </Backdrop>
      <div className={styles.container}>
        <div className={arrivalStyles.title}>SHOPPING BAG</div>
        <Grid container gap={2} marginTop={{ xs: "10px", md: "30px" }}>
          {cartArray && cartArray.length > 0 ? (
            <>
              <Grid item xs={12} md={8.5} display={{ xs: "none", md: "block" }}>
                <CartTable
                  columns={columns}
                  data={cartArray}
                  quantityInc={quantityInc}
                  quantityDec={quantityDec}
                  removeItem={removeItem}
                />
                <Link href={"/"} passHref>
                  <span className={"btn-style-black " + styles.controlBtn}>
                    <div className="txt"> CONTINUE SHOPPING </div>
                  </span>
                </Link>
                <span
                  className={"btn-style-black " + styles.controlBtn}
                  onClick={() => setShowConfirm(true)}
                >
                  <div className="txt"> CLEAR SHOPPING CART </div>
                </span>
                <span className={"btn-style-black " + styles.controlBtn}>
                  <div className="txt" onClick={updateCart}>
                    {" "}
                    UPDATE CART
                  </div>
                </span>
              </Grid>
              <Grid item container xs={12} md={8.5} display={{ xs: "block", md: "none" }}>
                <MobileCartTable
                  columns={columns}
                  data={cartArray}
                  quantityInc={quantityInc}
                  quantityDec={quantityDec}
                  removeItem={removeItem}
                />
                <Link href={"/"} passHref>
                  <span className={"btn-style-black " + styles.controlBtn}>
                    <div className="txt"> CONTINUE SHOPPING </div>
                  </span>
                </Link>
                <span
                  className={"btn-style-black " + styles.controlBtn}
                  onClick={() => setShowConfirm(true)}
                >
                  <div className="txt"> CLEAR SHOPPING CART </div>
                </span>
                <span className={"btn-style-black " + styles.controlBtn}>
                  <div className="txt" onClick={updateCart}>
                    {" "}
                    UPDATE CART
                  </div>
                </span>
              </Grid>
            </>
          ) : (
            <Grid item xs={12} md={8.5}>
              <Grid
                item
                xs={12}
                marginY={"20px"}
                textAlign={"center"}
                className={styles.summaryTotal}
              >
                CART IS EMPTY
              </Grid>
              <Link href={"/"} passHref>
                <span className={"btn-style-black " + styles.controlBtn}>
                  <div className="txt"> CONTINUE SHOPPING </div>
                </span>
              </Link>
            </Grid>
          )}
          {cartArray && cartArray.length > 0 && (
            <Grid item xs={12} md={3}>
              <div className={styles.summaryContainer}>
                <h2 className={styles.summaryHeading}>ORDER SUMMARY</h2>
                <Grid container color={"#4a4a4a"}>
                  <Grid item xs={4} marginBottom={"8px"}>
                    Sub Total
                  </Grid>
                  <Grid item xs={8} textAlign={"right"}>
                    $ {rawTotal}
                  </Grid>
                  <Grid item xs={4} marginBottom={"8px"}>
                    Discount
                  </Grid>
                  <Grid item xs={8} textAlign={"right"}>
                    $ {discounts}
                  </Grid>
                  {cartArray && cartArray.length > 0 && (
                    <>
                      <Grid item xs={4} marginBottom={"8px"}>
                        Shipping
                      </Grid>
                      <Grid item xs={8} textAlign={"right"}>
                        $ {shipping}
                      </Grid>
                    </>
                  )}
                  {taxes.map((tax) => {
                    return (
                      <React.Fragment key={tax._id}>
                        <Grid item xs={6} marginBottom={"8px"}>
                          {tax.taxname} ({tax.percentage}%)
                        </Grid>
                        <Grid item xs={6} textAlign={"right"}>
                          $ {currencyFormat(tax.amount)}
                        </Grid>
                      </React.Fragment>
                    );
                  })}
                  <Grid item xs={4} marginBottom={"8px"} className={styles.summaryTotal}>
                    Total
                  </Grid>
                  <Grid item xs={8} textAlign={"right"} className={styles.summaryTotal}>
                    $ {currencyFormat(getGrandTotal())}
                  </Grid>
                </Grid>
                {/* <div className={styles.summaryBtnCont}>
                <Button
                  variant={"contained"}
                  size={"small"}
                  className={styles.summaryBtn}
                  onClick={addCoupon}
                >
                  Add Coupon
                </Button>
                <Button
                  variant={"contained"}
                  size={"small"}
                  className={styles.summaryBtn}
                  onClick={addGiftCard}
                  style={{ float: "right" }}
                >
                  Add Gift Card
                </Button>
              </div> */}
                <div className={styles.summaryCheckout}>
                  {/* **Coupon code discounts are applicable for non-sale products only */}
                  <Link href={"/checkout"} passHref>
                    <span className={"btn-style-black " + styles.checkout}>
                      <div className="txt"> Checkout </div>
                    </span>
                  </Link>
                </div>
                <div className={styles.summaryText}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </div>
                <div className={styles.summaryText}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </div>
                {/* <div className={styles.summaryText}>
                *Free international shipping on orders over $ 200
              </div> */}
                <div className={styles.summaryText}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit quos impedit quae
                  quia, tempore facilis exercitationem ratione non nobis assumenda dolore quidem
                  molestiae soluta
                </div>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
      <Dialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to clear everything on cart?"}
        </DialogTitle>
        <DialogActions>
          <Button variant="outlined" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={clearCart}>
            Clear
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showCouponWindow} onClose={() => setShowCouponWindow(false)}>
        <DialogTitle
          className={styles.summaryTotal}
          style={{ fontSize: "22px", padding: "20px 50px" }}
        >
          Enter your {couponType} number.
        </DialogTitle>
        <DialogContent>
          <input className={styles.inputStyles} type="text" />
        </DialogContent>
        <DialogActions style={{ padding: "0 20px 20px 20px" }}>
          <span className={"btn-style-black"} onClick={() => setShowCouponWindow(false)}>
            <div className="txt"> CANCEL </div>
          </span>
          <span className={"btn-style-black"} onClick={() => setShowCouponWindow(false)}>
            <div className="txt"> SUBMIT </div>
          </span>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart;
