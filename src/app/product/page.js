"use client";

import Navbar from "../../components/navbar";
import Product from "./product";
import BestSellers from "../../components/bestSeller";
import Parallax from "../../components/parallax";
import Footer from "../../components/footer";
import BreadCrumb from "../../components/breadCrumb";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/loading";
import { useState } from "react";

const ProductsIndex = () => {
  const { isLoading } = useAuth0();
  const [notifier, setNotifier] = useState(false);
  const [wishlistNotifier, setWishlistNotifier] = useState(false);
  function onAddToCart() {
    setNotifier(!notifier);
  }

  function onAddToWishlist() {
    setWishlistNotifier(!wishlistNotifier);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar refreshCart={notifier} refreshWishlist={wishlistNotifier} />
      <BreadCrumb />
      <Product onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist} />
      <BestSellers onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist}/>
      <Parallax />
      <Footer />
    </>
  );
};
export default ProductsIndex;
