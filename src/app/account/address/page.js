"use client";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import Address from "./address";
import BreadCrumb from "../../../components/breadCrumb";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../../components/loading";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const AddressIndex = () => {
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
    { name: "Address", link: "/account/address" },
  ];

  return (
    <>
      <Navbar />
      <BreadCrumb breadCrumbs={crumbs} />
      <Address />
      <Footer />
    </>
  );
};

const AddressIndexWrapper = () => (
  <Suspense fallback={<Loading />}>
    <AddressIndex />
  </Suspense>
);

export default AddressIndexWrapper;
