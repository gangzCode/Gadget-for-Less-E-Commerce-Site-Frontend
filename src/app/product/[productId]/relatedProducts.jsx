import styles from "@/styles/arrivals.module.css";
import { Grid } from "@mui/material";
import { Carousel } from "@trendyol-js/react-carousel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShopItem from "@/components/shopItem";
import { useEffect, useState } from "react";
import { getNewArrivals, getRelatedProducts } from "@/services/apiCalls";
import { useSnackbar } from "notistack";

const RelatedProducts = ({ incat, onAddToCart, onAddToWishlist }) => {
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const [showItems, setShowItems] = useState(getShowItems());
  const [slideItems, setSlideItems] = useState(getSlideItems());

  // Function to determine the number of items to show based on screen width
  function getShowItems() {
    const width = window.innerWidth;
    if (width >= 1400) return 6.8; // For exlarge screens
    if (width >= 1200) return 6; // For large screens
    if (width >= 992) return 6; // For medium screens
    if (width >= 768) return 6; // For small screens
    if (width >= 576) return 4; // For exsmall screens
    return 1;
  }

  function getSlideItems() {
    const width = window.innerWidth;
    if (width >= 1400) return 6.8; // For exlarge screens
    if (width >= 1200) return 6; // For large screens
    if (width >= 992) return 6; // For medium screens
    if (width >= 768) return 6; // For small screens
    if (width >= 576) return 4; // For exsmall screens
    return 1;
  }

  useEffect(() => {
    const handleResize = () => {
      setShowItems(getShowItems());
      setSlideItems(getSlideItems());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const data = [];
    if (incat === "") return;
    getRelatedProducts(incat, 10)
      .then((value) => {
        console.log(value);
        // setProducts(value);
        if (value.length > 0) {
          const duplicateTimes = Math.floor(8 / value.length);
          let duplicateArray = [...value];

          for (let i = 0; i < duplicateTimes; i++) {
            // const element = array[i];
            duplicateArray = [...duplicateArray, ...value];
          }
          setProducts(duplicateArray);
        } else {
          enqueueSnackbar("Error occurred getting related products", { variant: "error" });
        }
        // setLoading(false);
      })

      .catch((reason) => {
        enqueueSnackbar("Error occurred getting related products", { variant: "error" });
        // setLoading(false);
      });
  }, [incat, enqueueSnackbar]);

  return (
    <>
      {products && products.length > 0 && (
        <>
          <Grid container className={styles.container}>
            <Grid item xs={12}>
              <div className={styles.title}>Related Products</div>
              {/* <div className={styles.subtitle}>Shop the season must-haves!</div> */}
            </Grid>
          </Grid>
          {products && products.length > 0 && (
            <div className={styles.sliderMasterContainer}>
              <div className={styles.sliderContainer}>
                <Grid className={styles.leftContainer}> </Grid>
                <Grid className={styles.rightContainer}> </Grid>
                <Carousel
                  className={styles.slider}
                  show={showItems}
                  slide={1}
                  responsive={true}
                  leftArrow={
                    <ChevronLeftIcon className={styles.sliderBtnLeft}>LEFT</ChevronLeftIcon>
                  }
                  rightArrow={
                    <ChevronRightIcon className={styles.sliderBtnRight}>RIGHT</ChevronRightIcon>
                  }
                >
                  {products.map((el) => (
                    <div key={el["_id"]} className={styles.tempCard}>
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
                        onAddToWishlist={() => onAddToWishlist()}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RelatedProducts;
