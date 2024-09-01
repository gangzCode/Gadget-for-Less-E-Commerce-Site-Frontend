import styles from "../styles/shopItem.module.css";
import { Grid, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import React, { useState } from "react";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import { addItemToCart, addItemToWishlist } from "@/services/apiCalls";
import { useSnackbar } from "notistack";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function ShopItem({
  productId,
  name,
  price,
  image,
  altImage,
  description,
  discountedPrice,
  onAddToCart,
  onAddToWishlist,
  variationCount,
  variationId,
}) {
  const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  const {
    isLoading,
    isAuthenticated,
    getAccessTokenSilently,
    loginWithRedirect,
    user,
    loginWithPopup,
  } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();

  function seeOptions(e) {
    e.stopPropagation();
    router.push(`/product/${productId}`);
  }

  async function addToCart(e) {
    e.stopPropagation();

    if (!isAuthenticated) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirect_url", `${pathname}?${searchParams.toString()}`);
      }
      loginWithRedirect();
      return;
    }
    let data = {
      username: user.email,
      product: productId,
      quantity: 1,
      variation: variationId,
    };
    addItemToCart(await getAccessTokenSilently(), data)
      .then((value) => {
        enqueueSnackbar("Item added to cart.", { variant: "success" });
        onAddToCart();
      })
      .catch((reason) => {
        console.log(reason);
        if (reason === 400) {
          enqueueSnackbar("Item already exists in cart.", { variant: "error" });
        } else {
          enqueueSnackbar("Add to cart failed.", { variant: "error" });
        }
      });
  }

  async function addToWishlist(e) {
    e.stopPropagation();
    if (!isAuthenticated) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirect_url", `${pathname}?${searchParams.toString()}`);
      }
      loginWithRedirect();
      return;
    }

    let data = {
      username: user.email,
      product: productId,
    };
    addItemToWishlist(await getAccessTokenSilently(), data)
      .then((value) => {
        enqueueSnackbar("Item added to wishlist.", { variant: "success" });
        onAddToWishlist();
      })
      .catch((reason) => {
        console.log(reason);
        if (reason === 400) {
          enqueueSnackbar("Item is already in wishlist.", { variant: "error" });
        } else {
          enqueueSnackbar("Add to wishlist failed.", { variant: "error" });
        }
      });
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <Grid container className={styles.imageContainer}>
          <Link href={`/product/${encodeURIComponent(productId)}`} passHref>
            <Grid
              item
              xs={12}
              className={styles.imageItem + " " + styles.showImg}
              component="img"
              src={altImage}
            />
            <Grid
              item
              xs={12}
              className={styles.imageItem + " " + styles.hideImg}
              component="img"
              src={image}
            />
          </Link>

          <Stack direction={"column"} spacing={1} justifyContent={"flex-end"} width={"100%"}>
            {variationCount === 1 && (
              <span className={"btn-style-black " + styles.cartBtn} onClick={addToCart}>
                <div className="txt">
                  <ShoppingCartIcon /> Add To Cart
                </div>
              </span>
            )}
            {variationCount > 1 && (
              <span className={"btn-style-black " + styles.cartBtn} onClick={seeOptions}>
                <div className="txt">
                  <ShoppingCartIcon /> See options
                </div>
              </span>
            )}
            <span className={"btn-style-black " + styles.cartBtn} onClick={addToWishlist}>
              <div className="txt">
                <FavoriteBorderOutlined /> Add To Wishlist
              </div>
            </span>
          </Stack>
        </Grid>
        <Link href={`/product/${encodeURIComponent(productId)}`} passHref>
          <Grid container bgcolor={"red"} className={styles.textContainer}>
            <Grid container>
              <Grid item xs={7} className={styles.textLeft}>
                {name}
              </Grid>
              <Grid item xs={5} className={styles.textRight}>
                {discountedPrice ? (
                  <>
                    <span>$ {discountedPrice || "00"}</span>
                    <s className={styles.discounted}> $ &nbsp;{price}</s>
                  </>
                ) : (
                  <span> $ {price || "00"}</span>
                )}
              </Grid>
              <Grid item xs={12} className={styles.textBottom}>
                {description}
              </Grid>
            </Grid>
          </Grid>
        </Link>
      </div>
    </>
  );
}
