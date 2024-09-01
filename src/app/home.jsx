import styles from "../styles/home.module.css";
import { Box, Grid } from "@mui/material";
import { getCardFilters } from "../services/apiCalls";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import Router from "next/router";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const [filterGroups, setFilterGroups] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  

  useEffect(() => {
    async function fetchData() {
      getCardFilters()
        .then((value) => {
          value.forEach((el, index) => {
            // el.image = imgList[index];
          });
          console.log(value);

          setFilterGroups(value);
        })
        .catch((reason) => {
          enqueueSnackbar("Error occurred getting filters.", { variant: "error" });
        });
    }
    fetchData();
  }, []);

  function navigateToFilter(filterId) {
    const strValues = JSON.stringify([filterId]);
    // Router.push({
    //   pathname: "/product",
    //   query: { types: strValues },
    // });
    router.push(`/product?page=1&types=${strValues}`);
  }

  return (
    <>
      <Grid container columnSpacing={0} rowSpacing={2} justifyContent={"center"}>
        {filterGroups.map((el) => (
          <Grid item key={el._id}>
            <div className={styles.cardQuadCard}>
              <Box className={styles.cardQuadCardImage} component="img" src={el.image || "https://placehold.co/1080x1920?text=Filter+1"} />
              <div className={styles.cardQuadCardText}>
                <h6 className={styles.cardQuadCardTextAlt}>{el.tagLine}</h6>
                <div className={styles.cardQuadCardTextMainContainer}>
                  <p className={styles.cardQuadCardTextMain}>{el.name}</p>
                </div>
                <span className="btn-style-one" onClick={() => navigateToFilter(el._id)}>
                  <div className="txt">Shop Now</div>
                </span>
              </div>
            </div>
          </Grid>
        ))}
        {/* <Grid item xs={3}>
                    <div className={styles.cardQuadCard}>
                        <Box className={styles.cardQuadCardImage}
                             component="img"
                             src="/images/cardQuad/promotion-image1.jpg"
                        />
                        <div className={styles.cardQuadCardText}>
                            <h6 className={styles.cardQuadCardTextAlt}>READY FOR THE SEASON</h6>
                            <div className={styles.cardQuadCardTextMainContainer}>
                            <p className={styles.cardQuadCardTextMain}>AUTUMN ESSENTIALS</p>
                            </div>
                            <Link href={'/product'}>
                                <span className="btn-style-one">
                                    <div className="txt">Shop Now</div>
                                </span>
                            </Link>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={styles.cardQuadCard}>
                        <Box className={styles.cardQuadCardImage}
                             component="img"
                             src="/images/cardQuad/promotion-image2.jpg"
                        />
                        <div className={styles.cardQuadCardText}>
                            <h6 className={styles.cardQuadCardTextAlt}>MUST-HAVES</h6>
                            <div className={styles.cardQuadCardTextMainContainer}>
                            <p className={styles.cardQuadCardTextMain}>LOUNGE WEAR</p>
                            </div>
                            <Link href={'/product'}>
                                <span className="btn-style-one">
                                    <div className="txt">Shop Now</div>
                                </span>
                            </Link>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={styles.cardQuadCard}>
                        <Box className={styles.cardQuadCardImage}
                             component="img"
                             src="/images/cardQuad/promotion-image3.jpg"
                        />
                        <div className={styles.cardQuadCardText}>
                            <h6 className={styles.cardQuadCardTextAlt}>GET VIP ACCESS</h6>
                            <div className={styles.cardQuadCardTextMainContainer}>
                            <p className={styles.cardQuadCardTextMain}>BLACK WEEK</p>
                            </div>
                            <Link href={'/product'}>
                                <span className="btn-style-one cardQuadCardBtn">
                                    <div className="txt">Shop Now</div>
                                </span>
                            </Link>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={styles.cardQuadCard}>
                        <Box className={styles.cardQuadCardImage}
                             component="img"
                             src="/images/cardQuad/promotion-image4.jpg"
                        />
                        <div className={styles.cardQuadCardText}>
                            <h6 className={styles.cardQuadCardTextAlt}>We’re in love with</h6>
                            <div className={styles.cardQuadCardTextMainContainer}>
                                <p className={styles.cardQuadCardTextMain}>NEWS</p>
                            </div>
                            <Link href={'/product'}>
                                <span className="btn-style-one">
                                    <div className="txt">Shop Now</div>
                                </span>
                            </Link>
                        </div>
                    </div>
                </Grid>*/}
      </Grid>
    </>
  );
};

export default Home;
