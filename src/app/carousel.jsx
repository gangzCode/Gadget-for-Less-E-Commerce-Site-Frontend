import Carousel from "react-material-ui-carousel";
import styles from "../styles/carousel.module.css";
import Link from "next/link";

const CarouselComp = () => {
  const items = [
    {
      name: "Computers",
      description: "Latest machines in the shop!",
      btnText: "Shop now",
      src: "/images/carousel-1.jpg",
      // href: "/product?page=1&cat=668e723aec67be540592142c&catType=C",
      href: "/product",
      textColor: styles.textWhite,
    },
    {
      name: "Headphones",
      description: "Ultra clarity audio equipment",
      btnText: "Shop now",
      src: "/images/carousel-2.jpg",
      // href: "/product?page=1&cat=668e7474ec67be5405921648&catType=I",
      href: "/product",
      textColor: styles.textWhite,
    },
  ];

  return (
    <Carousel
      className={styles.carousel}
      indicators={false}
      navButtonsAlwaysVisible={true}
      stopAutoPlayOnHover={true}
      duration={500}
      interval={5000}
      fullHeightHover={false}
      navButtonsProps={{
        style: {
          margin: "50px 10px 0 10px",
          position: "relative",
          backgroundColor: "transparent",
          opacity: "0.4",
          border: "3px solid white",
          top: "calc(50% - 20px) !important",
          color: "white",
          fontSize: "30px",
          transition: "200ms",
          cursor: "pointer",
        },
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

function Item(props) {
  return (
    <div className={styles.card} style={{ backgroundImage: "url(" + props.item.src + ")" }}>
      <div className={`${styles.cardText} ${props.item.textColor}`}>
        <p className={styles.cardTip}>{props.item.name}</p>
        <p className={styles.cardHeader}>{props.item.description}</p>
        <Link href={props.item.href}>
          <span className={"btn-style-black " + styles.cardBtn}>
            <div className="txt">{props.item.btnText}</div>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default CarouselComp;
