import styles from "../styles/userSlider.module.css";
import wishlistStyles from "../styles/wishlist.module.css";
import { Backdrop, Box, CircularProgress, Drawer, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DeleteOutline, FavoriteBorderOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { clearWishlistApi, deleteFromCart, deleteFromWishlist } from "../services/apiCalls";
import { useAuth0 } from "@auth0/auth0-react";
import { useSnackbar } from "notistack";
import Link from "next/link";

export default function WishlistSlider({ openWishlist, handleClose, wishlistArray, onItemDelete }) {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    setWishlistData(wishlistArray);
    let tot = 0;
    wishlistArray.forEach((value) => {
      if (value.discountedPrice) {
        tot += value.discountedPrice * value.quantity;
      } else {
        tot += value.price * value.quantity;
      }
    });
    setTotal(tot);
  }, [wishlistArray]);

  async function deleteItem(wishlistId) {
    setLoading(true);
    if (isAuthenticated) {
      deleteFromWishlist(await getAccessTokenSilently(), user.email, wishlistId)
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

  async function clearWishlist() {
    setLoading(true);
    if (isAuthenticated) {
      clearWishlistApi(await getAccessTokenSilently(), user.email)
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

  return (
    <>
      <Drawer
        anchor={"right"}
        open={openWishlist}
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
          <Grid item xs={12} className={wishlistStyles.cartItemCont}>
            {wishlistData.map((el) => (
              <Grid key={el._id} container className={styles.cartItem}>
                <Grid item xs={4} paddingRight="30px">
                  <Link href={`/product/${encodeURIComponent(el.product?._id)}`} passHref>
                    <Box
                      component="img"
                      src={el.product?.image}
                      className={styles.cartImage + " " + styles.mousePointer}
                    />
                  </Link>
                </Grid>
                <Grid
                  item
                  container
                  xs={7}
                  textAlign="left"
                  position="relative"
                  alignItems={"center"}
                  // justifyContent={"center"}
                >
                  <Link href={`/product/${encodeURIComponent(el.product?._id)}`} passHref>
                    <div className={wishlistStyles.cartItemName + " " + styles.mousePointer}>
                      {el.product?.name}
                    </div>
                  </Link>

                  {/* {el.variations && el.variations[0].discountedPrice ? (
                    <div className={styles.cartItemAmount}>${el.variations[0].discountedPrice}</div>
                  ) : (
                    <div className={styles.cartItemAmount}>${el.variations[0].price}</div>
                  )} */}
                </Grid>
                <Grid item container xs={1} alignItems={"center"}>
                  <DeleteOutline
                    className={wishlistStyles.cartIcon}
                    onClick={() => deleteItem(el._id)}
                  />
                </Grid>
              </Grid>
            ))}
            {
              (!wishlistData || wishlistData.length === 0) && (
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{ minHeight: "100%" }}
                >
                  <Grid item xs={12}>
                    <FavoriteBorderOutlined />
                    <h3 style={{ marginTop: "10px" }}>WISHLIST IS EMPTY</h3>
                  </Grid>
                </Grid>
              )
              /*<Box component="img" src={el.product.image} className={styles.cartImage}/>*/
            }
          </Grid>
          {wishlistData && wishlistData.length > 0 && (
            <Grid container className={wishlistStyles.bottomCont}>
              <Grid item xs={12}>
                <span
                  className={"btn-style-black " + wishlistStyles.checkoutBtn}
                  onClick={clearWishlist}
                >
                  <div className="txt">
                    <DeleteOutline /> Clear Wishlist
                  </div>
                </span>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Drawer>
    </>
  );
}
