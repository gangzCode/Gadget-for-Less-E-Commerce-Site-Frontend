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

const Product = ({ onAddToCart, onAddToWishlist }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const cat = searchParams.get("cat");
  const catType = searchParams.get("catType");
  const sort = searchParams.get("sort");
  const types = searchParams.get("types");
  const [pageNum, setPageNum] = useState(1);
  const [sorting, setSorting] = useState("latest");
  const [filter, setFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [catName, setCatName] = useState("");
  const [filterGroups, setFilterGroups] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, control, reset, setValue } = useForm({ mode: "onBlur" });
  if (page && parseInt(page) != pageNum) {
    setPageNum(parseInt(page));
  }
  if (sort && sort !== sorting) {
    setSorting(sort);
  }
  if (types && types !== filter) {
    setFilter(types);
    let tempTypes;
    try {
      tempTypes = JSON.parse(types);
      if (tempTypes.length === 0) {
        reset();
      }
    } catch (e) {
      reset();
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = [];
      setLoading(true);
      if (cat && cat.trim() !== "") {
        let obj = {
          page: pageNum,
          category: cat,
          catType: catType,
          sort: sorting,
          filters: filter,
        };
        getAllItemsFilteredWithPagination(obj)
          .then((value) => {
            value.products.forEach((product) => {
              data.push(product);
            });
            console.log(value);
            setPageCount(value.pageNum);
            setCatName(value.catName);
            setItems(data);
            setLoading(false);
          })
          .catch((reason) => {
            enqueueSnackbar("Error occurred getting items.", { variant: "error" });
            setLoading(false);
          });
      } else {
        let obj = { page: pageNum, sort: sorting, filters: filter };
        getAllItemsWithPagination(obj)
          .then((value) => {
            value.products.forEach((product) => {
              data.push(product);
            });
            console.log(value.products);
            setPageCount(value.pageNum);
            setItems(data);
            setLoading(false);
          })
          .catch((reason) => {
            enqueueSnackbar("Error occurred getting items.", { variant: "error" });
            setLoading(false);
          });
      }
    }
    fetchData();
  }, [pageNum, cat, catType, sort, types]);

  useEffect(() => {
    async function fetchData() {
      getAllFilterGroups()
        .then((value) => {
          setFilterGroups(value);
          try {
            let tempTypes = JSON.parse(types);
            if (tempTypes.length !== 0) {
              for (let type of tempTypes) {
                for (let group of value) {
                  let tempArr = group.filters.map((el) => el._id);
                  if (tempArr.includes(type)) {
                    setValue(group.name, type);
                  }
                }
              }
            }
          } catch (ignore) {}
        })
        .catch((reason) => {
          enqueueSnackbar("Error occurred getting filters.", { variant: "error" });
        });
    }
    fetchData();
  }, []);

  const applyFilter = (data) => {
    let values = [];
    for (let key of Object.keys(data)) {
      if (data[key]) {
        values.push(data[key]);
      }
    }
    const strValues = JSON.stringify(values);
    setFilter(strValues);
    // Router.push({
    //   pathname: "/product",
    //   query: { cat: cat, catType: catType, page: pageNum, sort: sorting, types: strValues },
    // });
    router.push(
      `/product?cat=${cat}&catType=${catType}&page=${pageNum}&sort=${sorting}&types=${strValues}`
    );
  };

  const handleChange = (event, value) => {
    setPageNum(value);
    // Router.push({
    //   pathname: "/product",
    //   query: { cat: cat, catType: catType, page: value, sort: sorting, types: filter },
    // });
    router.push(
      `/product?cat=${cat}&catType=${catType}&page=${value}&sort=${sorting}&types=${filter}`
    );
  };

  const filterClick = () => {
    setShowFilter(!showFilter);
  };

  const changeSort = (e) => {
    setSorting(e.target.value);
    // Router.push({
    //   pathname: "/product",
    //   query: { cat: cat, catType: catType, page: pageNum, sort: e.target.value, types: filter },
    // });
    router.push(
      `/product?cat=${cat}&catType=${catType}&page=${pageNum}&sort=${e.target.value}&types=${filter}`
    );
  };

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress style={{ color: "#FF6B6B" }} />
      </Backdrop>
      <Grid container className={styles.container}>
        <Grid item xs={12} md={6} className={styles.header}>
          <div className={arrivalStyles.title}>{catName ? catName : "All products"}</div>
          {/* <div className={arrivalStyles.subtitle}>Free Shipping for standard order over $100</div> */}
        </Grid>
        <Grid item xs={12} md={6} className={styles.headerBtns}>
          <Button
            variant="contained"
            startIcon={<Tune />}
            className={styles.filterBtn}
            onClick={filterClick}
          >
            Filter
          </Button>
          <FormControl>
            <InputLabel id="demo-simple-select-label" className={styles.selectBtnLabel}>
              Sort
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="outlined"
              className={styles.selectBtn}
              value={sorting}
              onChange={changeSort}
            >
              <MenuItem className={styles.menuText} value={Constants.SORTING.FEATURED}>
                Featured
              </MenuItem>
              <hr className={styles.menuHr} />
              <MenuItem className={styles.menuText} value={Constants.SORTING.BEST}>
                Best selling
              </MenuItem>
              <hr className={styles.menuHr} />
              <MenuItem className={styles.menuText} value={Constants.SORTING.LATEST}>
                Latest
              </MenuItem>
              <hr className={styles.menuHr} />
              <MenuItem className={styles.menuText} value={Constants.SORTING.LOW}>
                Price Low to High
              </MenuItem>
              <hr className={styles.menuHr} />
              <MenuItem className={styles.menuText} value={Constants.SORTING.HIGH}>
                Price High to Low
              </MenuItem>
              <hr className={styles.menuHr} />
              <MenuItem className={styles.menuText} value={Constants.SORTING.AtoZ}>
                Alphabetically, A-Z
              </MenuItem>
              <hr className={styles.menuHr} />
              <MenuItem className={styles.menuText} value={Constants.SORTING.ZtoA}>
                Alphabetically, Z-A
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Collapse in={showFilter} timeout="auto">
            <form onSubmit={handleSubmit(applyFilter)}>
              <Grid
                container
                rowGap={{ xs: 3, md: 4 }}
                columnGap={3}
                className={styles.hiddenContainer}
              >
                {filterGroups.map((el) => (
                  <Grid key={el._id} item xs={12} md={5.8}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        className={styles.filterSelectLabel}
                      >
                        {el.name}
                      </InputLabel>
                      <Controller
                        name={el.name}
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value, onBlur } }) => (
                          <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            variant="outlined"
                            onChange={onChange}
                            value={value}
                            onBlur={onBlur}
                            className={styles.filterSelect}
                          >
                            {el.filters.map((item) => (
                              <MenuItem key={item._id} value={item._id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                ))}
                <Grid container item xs={12} md={4} rowGap={1}>
                  <Grid item xs={12} md={4}>
                    <button type="submit" className={"btn-style-black " + styles.filterSubmitBtn}>
                      <div className="txt"> Filter </div>
                    </button>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <button
                      type="button"
                      className={"btn-style-black " + styles.filterSubmitBtn}
                      onClick={() => applyFilter({})}
                    >
                      <div className="txt"> Clear </div>
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Collapse>
        </Grid>
        <Grid
          container
          item
          xs={12}
          // columnGap={1}
          rowGap={3}
          justifyContent={{ xs: "center", md: "unset" }}
        >
          {items.map((el) => (
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

export default Product;
