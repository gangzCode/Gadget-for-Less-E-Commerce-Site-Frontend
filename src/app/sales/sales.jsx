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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ShopItem from "../../components/shopItem";
import arrivalStyles from "../../styles/arrivals.module.css";
import { Tune } from "@mui/icons-material";
import {
  getAllFilterGroups,
  getAllItemsFilteredWithPagination,
  getAllItemsWithPagination,
  getSales,
} from "../../services/apiCalls";
import { useSnackbar } from "notistack";
import Constants from "../../services/constants";
import { Controller, useForm } from "react-hook-form";

const prev = () => {
  return <p className={styles.customPageBtn}>PREV</p>;
};
const next = () => {
  return <p className={styles.customPageBtn}>NEXT</p>;
};

const Sales = ({ onAddToCart, onAddToWishlist }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const [products, setProducts] = useState([]);
  // const cat = searchParams.get("cat");
  // const catType = searchParams.get("catType");
  // const sort = searchParams.get("sort");
  // const types = searchParams.get("types");
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  if (page && parseInt(page) != pageNum) {
    setPageNum(parseInt(page));
  }

  useEffect(() => {
    setLoading(true);

    const data = [];
    getSales(pageNum, 12)
      .then((value) => {
        value.products.forEach((obj) => {
          data.push(obj);
        });
        setPageCount(value.pagination.totalPages);
        setProducts(data);
        setLoading(false);
      })
      .catch((reason) => {
        console.log(reason);
        enqueueSnackbar("Error occurred getting sale items", { variant: "error" });
        setLoading(false);
      });
  }, []);

  const handleChange = (event, value) => {
    setPageNum(value);
    router.push(`/sales?page=${value}`);
  };

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress style={{ color: "#FF6B6B" }} />
      </Backdrop>
      <Grid container className={styles.container}>
        <Grid item xs={12} md={6} className={styles.header}>
          <div className={arrivalStyles.title}>Sales</div>
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
        <Grid container justifyContent="center" item xs={12} className={styles.paginationContainer}>
          <Pagination
            count={pageCount}
            variant="outlined"
            onChange={handleChange}
            page={pageNum}
            renderItem={(item) => (
              <PaginationItem
                key={item.page}
                components={{ previous: prev, next: next }}
                className={styles.paginationItem}
                selected={true}
                component={Box}
                href={`/product${item.page === 1 ? "" : `?page=${item.page}`}`}
                {...item}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Sales;
