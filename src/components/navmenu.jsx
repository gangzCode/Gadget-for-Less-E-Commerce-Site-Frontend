import { ExpandLess, ExpandMore } from "@mui/icons-material";
import styles from "../styles/userSlider.module.css";
import navmenuStyles from "../styles/navmenu.module.css";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navmenu({ openNavmenu, handleClose }) {
  // const [collapseOpen, setCollapseOpen] = useState(false);
  // const [data, setData] = useState([]);

  // const router = useRouter();

  return (
    <>
      <Drawer
        anchor={"right"}
        open={openNavmenu}
        onClose={handleClose}
        // onBackdropClick={handleClose}
        transitionDuration={500}
      >
        <div className={styles.closeContainer} onClick={handleClose}>
          <div className={"dropdn-close " + styles.closeIcon}>
            <div></div>
            <div></div>
          </div>
        </div>

        <Grid container className={navmenuStyles.sideCartContainer} display="relative">
          <Grid item xs={12} className={navmenuStyles.cartItemCont}>
            <Stack
              direction={"column"}
              className={navmenuStyles.navigationMenuWrapper}
              justifyContent={"space-between"}
              alignItems={"center"}

              // display={{ xs: "none", md: "flex" }}
            >
              <Typography
                variant="h6"
                component="div"
                className={navmenuStyles.menuItem}
                onClick={handleClose}
              >
                <Link href={"/"}>HOME</Link>
              </Typography>
              <Typography
                variant="h6"
                component="div"
                className={navmenuStyles.menuItem}
                onClick={handleClose}
              >
                <Link href={"/sales?page=1"}>SALE</Link>
              </Typography>
              <Typography
                variant="h6"
                component="div"
                className={navmenuStyles.menuItem}
                onClick={handleClose}
              >
                <Link href={"/bestseller"}>BEST SELLERS</Link>
              </Typography>
              <Typography
                variant="h6"
                component="div"
                className={navmenuStyles.menuItem}
                onClick={handleClose}
              >
                HELP
              </Typography>
              <Typography
                variant="h6"
                component="div"
                className={navmenuStyles.menuItem}
                onClick={handleClose}
              >
                <Link href={"/contact_us"} passHref>
                  CONTACT US
                </Link>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}
