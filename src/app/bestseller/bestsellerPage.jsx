import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
} from "@mui/material";
import styles from "../../styles/product.module.css";
import { useEffect, useState } from "react";
import ShopItem from "../../components/shopItem";
import arrivalStyles from "../../styles/arrivals.module.css";

import { useSnackbar } from "notistack";
import { getBestSellers } from "@/services/apiCalls";

const BestSellerPage = ({ onAddToCart, onAddToWishlist }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);

    const data = [];
    getBestSellers(12)
      .then((value) => {
        value.forEach((obj) => {
          data.push(obj);
        });
        setProducts(data);
        setLoading(false);
      })
      .catch((reason) => {
        enqueueSnackbar("Error occurred getting best sellers", { variant: "error" });
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress style={{ color: "#FF6B6B" }} />
      </Backdrop>
      <Grid container className={styles.container}>
        <Grid item xs={12} md={6} className={styles.header}>
          <div className={arrivalStyles.title}>Best Sellers</div>
          {/* <div className={arrivalStyles.subtitle}>Free Shipping for standard order over $100</div> */}
        </Grid>
        <Grid
          container
          item
          xs={12}
          // columnGap={1.2}
          rowGap={3}
          justifyContent={{ xs: "center", md: "unset" }}
        >
          {products.map((el) => (
            <Grid item xs={11} md={3} key={el._id} className={styles.itemCard}>
              <ShopItem
                productId={el["_id"]}
                name={el.name}
                price={el.variations[0].price}
                variationCount={el.variations.length}
                variationId={el.variations[0]._id}
                discountedPrice={el.variations[0].discountedPrice}
                description={el.description}
                image={el.image}
                altImage={el.imageAlt}
                favorite={false}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default BestSellerPage;
