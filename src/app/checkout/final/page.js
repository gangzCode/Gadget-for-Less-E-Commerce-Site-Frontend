"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "@/components/loading";
import { useState } from "react";
import Final from "./final";

const FinalizationIndex = () => {
  const { isLoading } = useAuth0();
  const [notifier, setNotifier] = useState(false);
  const [notifierCart, setNotifierCart] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  function onRemoveItem() {
    setNotifier(!notifier);
  }

  // function onOrderPlaced() {
  //   setNotifierCart(!notifierCart);
  //   setNotifier(!notifier);
  // }
  // const crumbs = [
  //   { name: "Home", link: "/" },
  //   { name: "Checkout", link: "/checkout" },
  // ];
  return (
    <>
      <Navbar onRemove={onRemoveItem} refreshCart={notifierCart} />
      {/* <BreadCrumb breadCrumbs={crumbs} />
      <Checkout refreshCart={notifier} orderPlaced={onOrderPlaced} /> */}
      {/* <BestSellers />
      <Parallax /> */}
      <Final />
      <Footer />
    </>
  );
};
export default FinalizationIndex;
