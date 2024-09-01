"use client";
import Cart from "./cart";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import BreadCrumb from "../../components/breadCrumb";
import BestSellers from "../../components/bestSeller";
import Parallax from "../../components/parallax";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/loading";
import { useState } from "react";

const CartIndex = () => {
  const { isLoading } = useAuth0();
  const [notifier, setNotifier] = useState(false);
  const [cartNotifier, setCartNotifier] = useState(false);
  const [wishlistNotifier, setWishlistNotifier] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  function onRemoveCart() {
    setNotifier(!notifier);
  }
  function onRemoveNav() {
    setCartNotifier(!cartNotifier);
  }

  function onAddToCart() {
    setNotifier(!notifier);
  }

  function onAddToWishlist() {
    setWishlistNotifier(!wishlistNotifier);
  }

  const crumbs = [
    { name: "Home", link: "/" },
    { name: "Cart", link: "/cart" },
  ];
  return (
    <>
      <Navbar refreshCart={notifier} onRemove={onRemoveNav} refreshWishlist={wishlistNotifier}/>
      <BreadCrumb breadCrumbs={crumbs} />
      <Cart refreshCart={cartNotifier} onRemove={onRemoveCart} />
      <BestSellers onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist} />
      <Parallax />
      <Footer />
    </>
  );
};
export default CartIndex;
