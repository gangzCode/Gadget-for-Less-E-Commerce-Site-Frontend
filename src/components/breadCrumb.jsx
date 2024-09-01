import { Box } from "@mui/material";
import commonStyles from "../styles/commonStyles.module.css";
import { ChevronRight } from "@mui/icons-material";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { getCrumbs, getProductCrumbs } from "@/services/apiCalls";
import { useSearchParams } from "next/navigation";

const BreadCrumb = ({ product = null, breadCrumbs = null }) => {
  const [crumbs, setCrumbs] = useState([]);

  const searchParams = useSearchParams();

  const cat = searchParams.get("cat");
  const catType = searchParams.get("catType");

  useEffect(() => {
    if (product && breadCrumbs === null) {
      getProductCrumbs(product).then((value) => {
        setCrumbs(generateLinks(value));
        console.log(value);
      });
    } else if (product === null && breadCrumbs === null) {
      getCrumbs(catType, cat).then((value) => {
        setCrumbs(generateLinks(value));
      });
    } else {
      setCrumbs(breadCrumbs);
    }
  }, [product, cat, catType, breadCrumbs]);

  const generateLinks = (rawCrumbs) => {
    const startingCrumbs = [{ name: "Home", link: "/" }];

    if (rawCrumbs.cat) {
      startingCrumbs.push({
        name: rawCrumbs.cat.name,
        link: `/product?page=1&cat=${rawCrumbs.cat.id}&catType=C`,
      });
    }
    if (rawCrumbs.subcat) {
      startingCrumbs.push({
        name: rawCrumbs.subcat.name,
        link: `/product?page=1&cat=${rawCrumbs.subcat.id}&catType=S`,
      });
    }
    if (rawCrumbs.incat) {
      startingCrumbs.push({
        name: rawCrumbs.incat.name,
        link: `/product?page=1&cat=${rawCrumbs.incat.id}&catType=I`,
      });
    }
    if (rawCrumbs.product) {
      startingCrumbs.push({
        name: rawCrumbs.product.name,
        link: `/product/${rawCrumbs.product.id}`,
      });
    }

    return startingCrumbs;
  };

  return (
    <>
      <Box component="img" src="/images/breadcrumbs.jpg" className={commonStyles.breadCrumbImage} />
      <div className={commonStyles.breadCrumbContainer}>
        {crumbs.map((el, i) => (
          <Fragment key={el.name}>
            {crumbs.length > i + 1 && (
              <>
                <Link href={el.link} passHref>
                  <div className={commonStyles.breadCrumbText}>{el.name}</div>
                </Link>
                <ChevronRight className={commonStyles.breadCrumbIcon} />
              </>
            )}
            {crumbs.length <= i + 1 && (
              <>
                <div className={commonStyles.breadCrumbTextLast}>{el.name}</div>
              </>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
};
export default BreadCrumb;
