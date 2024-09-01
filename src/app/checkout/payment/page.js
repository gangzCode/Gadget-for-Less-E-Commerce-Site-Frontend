"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "@/components/loading";
import { useState } from "react";
import BreadCrumb from "../../../components/breadCrumb";
import Payment from "./payment";

const CheckoutIndex = () => {
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
  const crumbs = [
    { name: "Home", link: "/" },
    { name: "Checkout", link: "/checkout" },
    { name: "Payment", link: "/checkout/payment" },
  ];
  return (
    <>
      <Navbar onRemove={onRemoveItem} refreshCart={notifierCart} />
      <BreadCrumb breadCrumbs={crumbs} />
      <Payment />
      <Footer />
    </>
  );
};
export default CheckoutIndex;
