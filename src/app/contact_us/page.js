"use client";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import BreadCrumb from "../../components/breadCrumb";
import ContactForm from "./contactForm";
import { Suspense } from "react";
import Loading from "@/components/loading";

const ContactIndex = () => {
  const crumbs = [
    { name: "Home", link: "/" },
    { name: "Contact us", link: "/contact_us" },
  ];

  return (
    <>
      <Navbar />
      <BreadCrumb breadCrumbs={crumbs} />
      <ContactForm />
      <Footer />
    </>
  );
};

const AccountIndexWrapper = () => (
  <Suspense>
    <ContactIndex />
  </Suspense>
);
export default AccountIndexWrapper;
