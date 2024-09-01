import styles from "../styles/categories.module.css";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllFilterGroups, getAllSubCategories } from "../services/apiCalls";
import { useSnackbar } from "notistack";
import Router from "next/router";
import { useRouter } from "next/navigation";
// import { Carousel } from "@trendyol-js/react-carousel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Categories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchData() {
      getAllSubCategories()
        .then((value) => {
          console.log(value.length);
          if (value.length > 0) {
            const duplicateTimes = Math.floor(12 / value.length);
            // const duplicateTimes = 12;
            let duplicateArray = [...value];

            for (let i = 0; i < duplicateTimes; i++) {
              // const element = array[i];
              duplicateArray = [...duplicateArray, ...value];
            }
            setCategories(duplicateArray);
          } else {
            enqueueSnackbar("Error occurred getting categories.", { variant: "error" });
          }
        })
        .catch((reason) => {
          enqueueSnackbar("Error occurred getting categories.", { variant: "error" });
        });
    }
    fetchData();
  }, []);

  function navigateToProducts(category) {
    // Router.push({
    //   pathname: "/product",
    //   query: { page: 1, cat: category, catType: "S" },
    // });
    router.push(`/product?page=1&cat=${category}&catType=S`);
  }

  return (
    <>
      <Stack
        container
        direction={{ xs: "column", md: "row" }}
        className={styles.banner}
        spacing={{ xs: 4, md: 0 }}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        {/* <Stack direction={"column"} alignItems={"center"}>
          <Grid item xs={3}>
            <Box className={styles.svg} component="img" src="/images/svg/box.svg" />
          </Grid>
          <Stack item xs={9} alignItems={"center"}>
            <div className={styles.title}>Free UK Delivery</div>
            <div className={styles.subTitle}>On Orders Over $50</div>
          </Stack>
        </Stack> */}
        <Stack direction={"column"} alignItems={"center"}>
          <Grid item xs={3}>
            <Box className={styles.svg} component="img" src="/images/svg/support.svg" />
          </Grid>
          <Stack item xs={9} alignItems={"center"}>
            <div className={styles.title}>Live Customer Support</div>
            <div className={styles.subTitle}>Friendly Customer Care</div>
          </Stack>
        </Stack>
        <Stack direction={"column"} alignItems={"center"}>
          <Grid item xs={3}>
            <Box className={styles.svg} component="img" src="/images/svg/return.svg" />
          </Grid>
          <Stack item xs={9} alignItems={"center"}>
            <div className={styles.title}>Free Paperless Returns</div>
            <div className={styles.subTitle}>Simple, Swift, Secure</div>
          </Stack>
        </Stack>
        <Stack direction={"column"} alignItems={"center"}>
          <Grid item xs={3}>
            <Box className={styles.svg} component="img" src="/images/svg/lock.svg" />
          </Grid>
          <Stack item xs={9} alignItems={"center"}>
            <div className={styles.title}>100% Payment Secure</div>
            <div className={styles.subTitle}>Safe & Secure Checkout</div>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"flex-start"}
        textAlign={"center"}
        sx={{ padding: { xs: "24px 0", md: "48px 0" }, background: "white" }}
      >
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          className={styles.catSectionTitleContainer}
        >
          <div className={styles.catSectionTitle}>Top categories</div>
        </Stack>
        {categories && categories.length > 0 && (
          <div className={styles.sliderMasterContainer}>
            <div className={styles.sliderContainer}>
              <Grid className={styles.leftContainer}> </Grid>
              <Grid className={styles.rightContainer}> </Grid>
              <Slider
                dots={false}
                infinite
                slidesToShow={9}
                slidesToScroll={1}
                responsive={[
                  {
                    breakpoint: 1400,
                    settings: {
                      slidesToShow: 8,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 1200,
                    settings: {
                      slidesToShow: 7,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 1000,
                    settings: {
                      slidesToShow: 6,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 5,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 576,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 1,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                ]}
                autoplay
                speed={1200}
                autoplaySpeed={0}
                cssEase="ease"
                pauseOnHover
              >
                {categories.map((el) => (
                  <div key={el._id}>
                    <Stack
                      justifyContent={"center"}
                      alignItems={"center"}
                      sx={{ width: "max(120px, 10vw)", height: "max(120px, 10vw)" }}
                      className={styles.subCatCard}
                      onClick={() => navigateToProducts(el._id)}
                    >
                      <Image
                        src={el.image || "https://placehold.co/300.png"}
                        className={styles.subCatImage}
                        alt=""
                        fill
                      />
                      <Stack
                        justifyContent={"center"}
                        alignItems={"center"}
                        className={styles.subCatTextBg}
                      >
                        <Typography variant="h6" component="div" className={styles.subCatText}>
                          <a>{el.name}</a>
                        </Typography>
                      </Stack>
                    </Stack>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          // <div className={styles.sliderMasterContainer}>
          //   <div className={styles.sliderContainer}>
          //     <Grid className={styles.leftContainer}> </Grid>
          //     <Grid className={styles.rightContainer}> </Grid>
          //     <Carousel
          //       className={styles.slider}
          //       show={8.9}
          //       slide={3}
          //       responsive={true}
          //       dynamic
          //       leftArrow={<ChevronLeftIcon className={styles.sliderBtnLeft}></ChevronLeftIcon>}
          //       rightArrow={<ChevronRightIcon className={styles.sliderBtnRight}></ChevronRightIcon>}
          //     >
          //       {categories.map((el) => (
          //         <Stack
          //           key={el._id}
          //           justifyContent={"center"}
          //           alignItems={"center"}
          //           className={styles.subCatCard}
          //           onClick={() => navigateToProducts(el._id)}
          //         >
          //           <Image
          //             src={"https://placehold.co/300.png"}
          //             className={styles.subCatImage}
          //             alt=""
          //             fill
          //           />
          //           <Stack
          //             justifyContent={"center"}
          //             alignItems={"center"}
          //             className={styles.subCatTextBg}
          //           >
          //             <Typography variant="h6" component="div" className={styles.subCatText}>
          //               <a>{el.name}</a>
          //             </Typography>
          //           </Stack>
          //         </Stack>
          //       ))}
          //     </Carousel>

          //   </div>
          // </div>
        )}
      </Stack>
    </>
  );
};
export default Categories;
