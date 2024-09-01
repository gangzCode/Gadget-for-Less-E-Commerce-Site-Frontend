"use client";

import Home from "./home";
import Navbar from "../components/navbar";
import CarouselComp from "./carousel";
import Categories from "./categories";
import dynamic from "next/dynamic";
import BestSellers from "../components/bestSeller";
import Parallax from "../components/parallax";
import Footer from "../components/footer";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@mui/material";
import Loading from "../components/loading";
import Brands from "./brands";
import { useEffect, useState } from "react";

const Arrivals = dynamic(
  () => {
    return import("./arrivals");
  },
  { ssr: false }
);

const HomeIndex = () => {
  const { isLoading, getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  // console.log( getAccessTokenSilently());

  const [firstLoading, setFirstLoading] = useState(false);
  const [notifier, setNotifier] = useState(false);
  const [wishlistNotifier, setWishlistNotifier] = useState(false);

  function onAddToCart() {
    setNotifier(!notifier);
  }

  function onAddToWishlist() {
    console.log("Wishlist updating", wishlistNotifier);
    setWishlistNotifier((prev) => !prev);
  }

 /*  useEffect(() => {
    const getToken = async () => {
      console.log(await getAccessTokenSilently());
    };

    if (isAuthenticated) getToken();

    if (!isLoading && !firstLoading) setFirstLoading(true);
  }, [isLoading, firstLoading, isAuthenticated, getAccessTokenSilently]); */

  if (isLoading && !firstLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar refreshCart={notifier} refreshWishlist={wishlistNotifier} />
      <CarouselComp />
      <Categories />
      <Home />
      <Arrivals onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist} />
      <BestSellers onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist} />
      <Parallax />
      <Brands />
      <Footer />
    </>
  );
};
export default HomeIndex;
