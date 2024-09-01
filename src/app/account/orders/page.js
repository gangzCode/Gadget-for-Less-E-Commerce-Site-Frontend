"use client";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import Orders from "./orders";
import BreadCrumb from "../../../components/breadCrumb";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../../components/loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";

const OrdersIndex = () => {
  const { isLoading, isAuthenticated, loginWithRedirect, loginWithPopup } = useAuth0();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirect_url", `${pathname}?${searchParams.toString()}`);
      }
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  if (isLoading || !isAuthenticated) {
    return <Loading />;
  }
  const crumbs = [
    { name: "Home", link: "/" },
    { name: "Account", link: "/account" },
    { name: "Orders", link: "/account/orders" },
  ];
  return (
    <>
      <Navbar />
      <BreadCrumb breadCrumbs={crumbs} />
      <Orders />
      <Footer />
    </>
  );
};

const OrdersIndexWrapper = () => (
  <Suspense fallback={<Loading />}>
    <OrdersIndex />
  </Suspense>
);

export default OrdersIndexWrapper;
