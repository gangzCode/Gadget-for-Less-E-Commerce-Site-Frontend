"use client";

import { useRouter } from "next/navigation";
import BestSellers from "../../../components/bestSeller";
import Parallax from "../../../components/parallax";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import ProductDetails from "./productDetails";
import BreadCrumb from "../../../components/breadCrumb";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../../components/loading";
import { useState } from "react";
import { useParams } from "next/navigation";
import RelatedProducts from "./relatedProducts";

const ProductIndex = () => {
  const { isLoading } = useAuth0();
  const router = useRouter();
  const { productId } = useParams();
  const [notifier, setNotifier] = useState(false);
  const [wishlistNotifier, setWishlistNotifier] = useState(false);
  const [incatId, setIncatId] = useState("");

  if (isLoading) {
    return <Loading />;
  }

  function onAddToCart() {
    setNotifier(!notifier);
  }

  function onAddToWishlist() {
    setWishlistNotifier(!wishlistNotifier);
  }

  return (
    <>
      <Navbar refreshCart={notifier} refreshWishlist={wishlistNotifier} />
      <BreadCrumb product={productId} />
      <ProductDetails
        productId={productId}
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
        setIncat={(incat) => setIncatId(incat)}
      />
      {/* {incatId !== "" && <RelatedProducts incat={incatId} />} */}
      <RelatedProducts incat={incatId} />
      <BestSellers onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist} />
      <Parallax />
      <Footer />
    </>
  );
};
export default ProductIndex;
