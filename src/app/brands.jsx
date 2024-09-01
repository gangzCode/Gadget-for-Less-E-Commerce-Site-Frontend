import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import styles from "../styles/brands.module.css";

const Brands = () => {
  const allBrands = [
    {
      name: "Brand+1",
      color: "002BFF",
      bg: "FFD400",
    },
    {
      name: "Brand+2",
      color: "88DE21",
      bg: "7721DE",
    },
    {
      name: "Brand+3",
      color: "88DE21",
      bg: "7721DE",
    },
    {
      name: "Brand+4",
      color: "88DE21",
      bg: "7721DE",
    },
    {
      name: "Brand+5",
      color: "88DE21",
      bg: "7721DE",
    },
    {
      name: "Brand+6",
      color: "88DE21",
      bg: "7721DE",
    },
    {
      name: "Brand+7",
      color: "88DE21",
      bg: "7721DE",
    },
  ];

  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      textAlign={"center"}
      style={{ padding: "48px 0", background: "white" }}
    >
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"flex-start"}
        className={styles.titleContainer}
      >
        <div className={styles.title}>Brands</div>
      </Stack>

      <div className={styles.sliderMasterContainer}>
        <div className={styles.sliderContainer}>
          <Grid className={styles.leftContainer}> </Grid>
          <Grid className={styles.rightContainer}> </Grid>
          <Slider
            dots={false}
            infinite
            slidesToShow={8}
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 1800,
                settings: {
                  slidesToShow: 7,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1600,
                settings: {
                  slidesToShow: 6,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1400,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1000,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 576,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
            autoplay
            speed={2000}
            autoplaySpeed={2000}
            swipeToSlide={false}
            cssEase="linear"
            pauseOnHover={false}
            centerMode
          >
            {allBrands.map((brand, key) => (
              <div className={styles.logoWrapper} key={key}>
                <Image
                  src={`https://placehold.co/600x400/${brand.color}/${brand.bg}/png?text=${brand.name}`}
                  alt=""
                  objectFit="cover"
                  fill
                  className={styles.logo}
                  // width={140}
                  // height={100}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Stack>
  );
};

export default Brands;
