import styles from "../styles/userSlider.module.css";
import { Backdrop, Box, CircularProgress, Drawer, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DeleteOutline, ShoppingCartOutlined } from "@mui/icons-material";
import { deleteFromCart, updateCartApi } from "../services/apiCalls";
import { useAuth0 } from "@auth0/auth0-react";
import { useSnackbar } from "notistack";
import Link from "next/link";
import NumberInput from "@/components/numberInput";

export default function CartSlider({
  openCart,
  handleClose,
  cartArray,
  onItemDelete,
  onUpdateCart,
}) {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    setCartData(cartArray);
    let tot = 0;
    cartArray.forEach((value) => {
      if (value.discountedPrice) {
        tot += value.discountedPrice * value.quantity;
      } else {
        tot += value.price * value.quantity;
      }
    });
    setTotal(tot);
  }, [cartArray]);

  async function deleteItem(cartId) {
    setLoading(true);
    if (isAuthenticated) {
      deleteFromCart(await getAccessTokenSilently(), user.email, cartId)
        .then((value) => {
          onItemDelete();
          setLoading(false);
        })
        .catch((err) => {
          enqueueSnackbar("Error occurred when deleting item.", { variant: "error" });
          setLoading(false);
        });
    }
  }

  const quantityInc = (itemId) => {
    let updated = [];
    for (let item of cartArray) {
      if (item._id === itemId) {
        if (item.quantity < item.stockSize) {
          item.quantity++;
        } else {
          return;
        }
      }
      updated.push(item);
    }
    updateCart(updated);
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
    updateCart(updated);
  };

  async function updateCart(updated) {
    if (isAuthenticated) {
      // setShowConfirm(false);
      // setLoading(true);
      updateCartApi(await getAccessTokenSilently(), updated)
        .then((value) => {
          // enqueueSnackbar("Cart updated.", { variant: "success" });
          // setLoading(false);
          // setForceDataLoad(!forceDataLoad);
          onUpdateCart();
        })
        .catch((reason) => {
          // enqueueSnackbar("Error occurred when deleting item.", { variant: "error" });
          // setLoading(false);
        });
    }
  }

  return (
    <>
      <Drawer
        anchor={"right"}
        open={openCart}
        onClose={handleClose}
        // onBackdropClick={handleClose}
        transitionDuration={500}
      >
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress style={{ color: "#FF6B6B" }} />
        </Backdrop>
        <div className={styles.closeContainer} onClick={handleClose}>
          <div className={"dropdn-close " + styles.closeIcon}>
            <div></div>
            <div></div>
          </div>
        </div>

        <Grid container className={styles.sideCartContainer} display="relative">
          <Grid item xs={12} className={styles.cartItemCont}>
            {cartData.map((el) => (
              <Grid key={el._id} container className={styles.cartItem}>
                <Grid item xs={4} paddingRight="30px">
                  <Link href={`/product/${encodeURIComponent(el.product._id)}`} passHref>
                    <Box
                      component="img"
                      src={el.product.image}
                      className={styles.cartImage + " " + styles.mousePointer}
                    />
                  </Link>
                </Grid>
                <Grid item xs={7} textAlign="left" position="relative">
                  <Link href={`/product/${encodeURIComponent(el.product._id)}`} passHref>
                    <div className={styles.cartItemName + " " + styles.mousePointer}>
                      {el.product.name}
                    </div>
                  </Link>
                  <Box>
                    <div className={styles.cartItemBox}>{el.variationDetails.name}</div>
                  </Box>
                  <div className={styles.cartItemQty}>
                    <NumberInput
                      value={el.quantity}
                      increment={() => quantityInc(el._id)}
                      decrement={() => quantityDec(el._id)}
                    />
                  </div>
                  {el.discountedPrice ? (
                    <div className={styles.cartItemAmount}>
                      {el.quantity > 1 && (
                        <div className={styles.cartItemAmountSingle}>
                          (${el.discountedPrice} x {el.quantity})
                        </div>
                      )}
                      ${el.discountedPrice * el.quantity}
                    </div>
                  ) : (
                    <div className={styles.cartItemAmount}>
                      {el.quantity > 1 && (
                        <div className={styles.cartItemAmountSingle}>
                          (${el.price} x {el.quantity})
                        </div>
                      )}
                      ${el.price * el.quantity}
                    </div>
                  )}
                </Grid>
                <Grid item xs={1}>
                  <DeleteOutline className={styles.cartIcon} onClick={() => deleteItem(el._id)} />
                </Grid>
              </Grid>
            ))}
            {
              (!cartData || cartData.length === 0) && (
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{ minHeight: "100%" }}
                >
                  <Grid item xs={12}>
                    <ShoppingCartOutlined />
                    <h3 style={{ marginTop: "10px" }}>CART IS EMPTY</h3>
                  </Grid>
                </Grid>
              )
              /*<Box component="img" src={el.product.image} className={styles.cartImage}/>*/
            }
          </Grid>
          {cartData && cartData.length > 0 && (
            <Grid container className={styles.bottomCont}>
              <Grid item xs={12} className={styles.shippingTip}>
                <b>FREE SHIPPING!</b> for orders over <b>$100!</b>
              </Grid>
              <Grid item xs={6} className={styles.subTot}>
                SUBTOTAL
              </Grid>
              <Grid item xs={6} className={styles.subAmount}>
                ${total}
              </Grid>
              <Grid item xs={12}>
                <Link href={"/cart"} passHref>
                  <span className={"btn-style-black " + styles.checkoutBtn}>
                    <div className="txt">
                      {" "}
                      <ShoppingCartOutlined /> Go to Cart{" "}
                    </div>
                  </span>
                </Link>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Drawer>
    </>
  );
}
