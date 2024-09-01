import {
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { addItemToCart, addItemToWishlist, getProduct } from "../../../services/apiCalls";
import styles from "../../../styles/product.module.css";

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import arrivalStyles from "../../../styles/arrivals.module.css";
import NumberInput from "../../../components/numberInput";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSnackbar } from "notistack";
import { useAuth0 } from "@auth0/auth0-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styled from "@emotion/styled";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const ProductDetails = ({ productId, onAddToCart, onAddToWishlist, setIncat }) => {
  const [product, setProduct] = useState([]);
  const [variation, setVariation] = useState({});
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [qty, setQty] = useState(1);
  const [remaining, setRemaining] = useState(-1);
  const [price, setPrice] = useState();
  const [discountedPrice, setDiscountedPrice] = useState();
  const [inStock, setInStock] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, loginWithPopup, user } =
    useAuth0();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // const [curSize, setCurSize] = useState();

  const images = [
    {
      thumbnail: product.image,
      original: product.image,
      src: product.image,
      imageFit: "cover",
    },
    {
      thumbnail: product.imageAlt,
      original: product.imageAlt,
      src: product.imageAlt,
      imageFit: "cover",
    },
  ];
  product?.otherImages?.forEach(function (img) {
    images.push({
      thumbnail: img,
      original: img,
      src: img,
      imageFit: "cover",
    });
  });

  useEffect(() => {
    setLoading(true);
    getProduct(productId)
      .then((value) => {
        console.log(value.richDescription);
        setProduct(value);
        setIncat(value.innerSubCategory);
        setVariation(value.variations[0]);
        setPrice(value.variations[0].price);
        setDiscountedPrice(value.variations[0].discountedPrice);
        setRemaining(value.variations[0].quantity);
        setLoading(false);
      })
      .catch((reason) => {
        enqueueSnackbar("Error occurred getting product", { variant: "error" });
        setLoading(false);
      });
  }, [productId, enqueueSnackbar, setIncat]);

  const qtyInc = () => {
    if (remaining - qty >= 1) {
      let val = qty;
      val++;
      setQty(val);
    }
  };
  const qtyDec = () => {
    if (qty > 1) {
      let val = qty;
      val--;
      setQty(val);
    }
  };

  async function addToCart() {
    if (!isAuthenticated) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirect_url", `${pathname}?${searchParams.toString()}`);
      }
      loginWithRedirect();
      return;
    }
    if (remaining < 1 || !inStock) {
      enqueueSnackbar("This selection is out of stock.", {
        variant: "warning",
      });
    } else {
      setLoading(true);
      let data = {
        username: user.email,
        product: productId,
        quantity: qty,
        variation: variation._id,
      };
      addItemToCart(await getAccessTokenSilently(), data)
        .then((value) => {
          enqueueSnackbar("Item added to cart.", { variant: "success" });
          onAddToCart();
          setLoading(false);
        })
        .catch((reason) => {
          console.log(reason);
          if (reason === 400) {
            enqueueSnackbar("Item already exists in cart.", { variant: "error" });
          } else {
            enqueueSnackbar("Add to cart failed.", { variant: "error" });
          }
          setLoading(false);
        });
    }
  }

  async function addToWishList() {
    if (!isAuthenticated) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirect_url", `${pathname}?${searchParams.toString()}`);
      }
      loginWithRedirect();
      return;
    }
    setLoading(true);
    let data = {
      username: user.email,
      product: productId,
    };
    addItemToWishlist(await getAccessTokenSilently(), data)
      .then((value) => {
        enqueueSnackbar("Item added to wishlist.", { variant: "success" });
        setLoading(false);
        onAddToWishlist();
      })
      .catch((reason) => {
        console.log(reason);
        enqueueSnackbar("Add to wishlist failed.", { variant: "error" });
        setLoading(false);
      });
  }

  const CssSelect = styled(Select)({
    borderRadius: "30px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "1.5",
    color: "#212529",
    "& .MuiSelect-outlined": {
      "&:focus": {
        borderRadius: "30px",
        borderColor: "#86b7fe",
        outline: 0,
        boxShadow: "0 0 0 0.25rem rgba(13, 110, 253, 0.25)",
        transition: "all 0.3s",
      },
    },
  });

  return (
    <Grid container className={styles.detailsContainer} gap={8}>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress style={{ color: "#FF6B6B" }} />
      </Backdrop>

      <Grid item xs={12} md={5} display={{ xs: "none", md: "block" }}>
        <Lightbox
          open
          styles={{
            root: {
              "--yarl__color_backdrop": "#fff",
              "--yarl__thumbnails_thumbnail_background": "#fff",
              "--yarl__thumbnails_thumbnail_active_border_color": "#FF6B6B",
              "--yarl__thumbnails_thumbnail_border_color": "#FF6B6B",
            },
          }}
          slides={images}
          plugins={[Inline, Thumbnails]}
          carousel={{
            padding: 0,
            spacing: 0,
            imageFit: "cover",
          }}
          inline={{
            style: {
              aspectRatio: "1 / 1",
              margin: "0",
            },
          }}
          thumbnails={{
            position: "start",
            width: 60,
            height: 60,
            imageFit: "cover",
            border: 2,
            borderStyle: "",
          }}
        />
      </Grid>
      <Grid item xs={12} md={5} display={{ xs: "block", md: "none" }}>
        <Lightbox
          open
          styles={{
            root: {
              "--yarl__color_backdrop": "#fff",
              "--yarl__thumbnails_thumbnail_background": "#fff",
              "--yarl__thumbnails_thumbnail_active_border_color": "#FF6B6B",
              "--yarl__thumbnails_thumbnail_border_color": "#FF6B6B",
            },
          }}
          slides={images}
          plugins={[Inline, Thumbnails]}
          carousel={{
            padding: 0,
            spacing: 0,
            imageFit: "cover",
          }}
          inline={{
            style: {
              aspectRatio: "1 / 1.5",
              margin: "0",
            },
          }}
          thumbnails={{
            position: "bottom",
            width: 60,
            height: 60,
            imageFit: "cover",
            border: 2,
            borderStyle: "",
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <div className={arrivalStyles.title}>{product.name}</div>
        <div className={styles.detailPrice}>
          {discountedPrice ? (
            <>
              <s className={styles.discounted}> &nbsp;${price}&nbsp;</s>
              <span> $ {discountedPrice}</span>
            </>
          ) : (
            <span>$ {price}</span>
          )}
          <span className={styles.inStock}>
            {inStock ? (
              <Chip label="In Stock" color="success" />
            ) : (
              <Chip label="Out of Stock" color="error" />
            )}
          </span>
        </div>

        {product.variations && product.variations.length > 1 && (
          <div className={styles.subMenu}>
            Option: {variation.name ? variation.name : "Select an option"}
          </div>
        )}

        {product.variations && product.variations.length > 1 && (
          <FormControl sx={{ width: { xs: "100%", md: "400px" }, marginY: 2 }}>
            <CssSelect
              labelId="options"
              id="options"
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              value={variation}
              onChange={(e) => {
                const value = e.target.value;
                setVariation(value);
                setPrice(value.price);
                setDiscountedPrice(value.discountedPrice ? value.discountedPrice : null);
                setRemaining(value.quantity);
              }}
            >
              {/* <MenuItem value={{}} disabled>
                Select an option
              </MenuItem> */}
              {product &&
                product.variations &&
                product.variations.map((variation) => {
                  return (
                    <MenuItem
                      value={variation}
                      disabled={variation.quantity < 1}
                      key={variation.sku}
                    >
                      {variation.name}
                    </MenuItem>
                  );
                })}
            </CssSelect>
          </FormControl>
        )}

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 4 }}
          alignItems={"center"}
          sx={{ marginY: { xs: 2, md: 4 } }}
        >
          <NumberInput
            className={styles.quantity}
            value={qty}
            decrement={qtyDec}
            increment={qtyInc}
          />
          {/* <Button variant="contained" onClick={addToCart}>
            <ShoppingCartIcon /> Add To Cart{" "}
          </Button> */}
          <div className={styles.btnContainer}>
            <span className={"btn-style-black " + styles.cartBtn} onClick={addToCart}>
              <div className="txt">Add To Cart</div>
            </span>
          </div>
          <div className={styles.btnContainer}>
            <span className={"btn-style-black " + styles.cartBtn} onClick={addToWishList}>
              <div className="txt">Add To Wishlist</div>
            </span>
          </div>
        </Stack>
        <div className={arrivalStyles.title}>Description</div>
        <div className={styles.richText + " " + (showMore ? styles.height1 : styles.height2)}>
          {product.richDescription}
        </div>
        <div
          className={styles.subTopic + " " + styles.showMore}
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          {showMore ? "SHOW MORE" : "SHOW LESS"}
        </div>
        <div className={arrivalStyles.title}>Specifications</div>
        <TableContainer>
          <Table>
            <TableBody>
              {product.specifications &&
                product.specifications.map((spec) => (
                  <TableRow key={spec._id}>
                    <TableCell variant="head" sx={{ fontWeight: 600 }}>
                      {spec.name}
                    </TableCell>
                    <TableCell>{spec.value}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
