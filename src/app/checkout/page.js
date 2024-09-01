"use client";
import Checkout from "./checkout";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import BreadCrumb from "../../components/breadCrumb";
import BestSellers from "../../components/bestSeller";
import Parallax from "../../components/parallax";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/loading";
import { useState } from "react";

const CheckoutIndex = () => {
  const { isLoading } = useAuth0();
  const [notifier, setNotifier] = useState(false);
  const [notifierCart, setNotifierCart] = useState(false);
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

  function onRemoveItem() {
    setNotifier(!notifier);
  }

  function onOrderPlaced() {
    setNotifierCart(!notifierCart);
    setNotifier(!notifier);
  }
  const crumbs = [
    { name: "Home", link: "/" },
    { name: "Checkout", link: "/checkout" },
  ];
  return (
    <>
      <Navbar onRemove={onRemoveItem} refreshCart={notifierCart} refreshWishlist={wishlistNotifier}/>
      <BreadCrumb breadCrumbs={crumbs} />
      <Checkout refreshCart={notifier} orderPlaced={onOrderPlaced} />
      <BestSellers onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist}/>
      <Parallax />
      <Footer />
    </>
  );
};
export default CheckoutIndex;
