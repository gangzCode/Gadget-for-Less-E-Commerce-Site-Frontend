"use client";

import Footer from "@/components/footer";
import Loading from "@/components/loading";
import Navbar from "@/components/navbar";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import TermsContent from "./termsContent";

const Page = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <TermsContent />
      <Footer />
    </>
  );
};

export default Page;
