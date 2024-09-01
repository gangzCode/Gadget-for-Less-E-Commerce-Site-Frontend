"use client";
import AccountInfo from "./accountInfo";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import BreadCrumb from "../../components/breadCrumb";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { Suspense } from "react";

const AccountIndex = () => {
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
  ];

  return (
    <>
      <Navbar />
      <BreadCrumb breadCrumbs={crumbs} />
      <AccountInfo />
      <Footer />
    </>
  );
};

const AccountIndexWrapper = () => (
  <Suspense fallback={<Loading />}>
    <AccountIndex />
  </Suspense>
);

export default AccountIndexWrapper;
