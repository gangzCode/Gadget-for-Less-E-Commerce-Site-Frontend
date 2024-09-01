import Link from "next/link";
import styles from "../styles/parallax.module.css";
import { useEffect, useRef, useState } from "react";

const Parallax = () => {
  const [parallaxTop, setParallaxTop] = useState(0);
  const handleScroll = () => {
    const offsetTop = parallaxRef.current?.offsetTop;
    if (offsetTop) {
      setParallaxTop((window.pageYOffset - offsetTop) * 0.3);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  const parallaxRef = useRef();

  return (
    <div ref={parallaxRef} className={styles.parallax_section}>
      <div
        className={styles.parallax_image}
        style={{
          backgroundImage: "url(/images/parallax.jpg)",
          top: parallaxTop + "px",
        }}
      />
      <div className={styles.parallax_cover_image_text}>
        <h4>Best Products</h4>
        <h2>
          <span>GADGET</span> FOR LESS{" "}
        </h2>
        <Link href={"/product"}>
          <span className="btn-style-one">
            <div className="txt">Shop Now</div>
          </span>
        </Link>
      </div>
    </div>
  );
};
export default Parallax;
