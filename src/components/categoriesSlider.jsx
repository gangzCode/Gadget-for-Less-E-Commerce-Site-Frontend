import { ExpandLess, ExpandMore } from "@mui/icons-material";
import styles from "../styles/userSlider.module.css";
import catMobStyles from "../styles/categoriesMobile.module.css";
import wishlistStyles from "../styles/wishlist.module.css";
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
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoriesSlider({ openCategories, handleClose, categories }) {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    console.log(categories);
    setData(categories);

    const categoryLabels = categories.map((cat) => {
      return {
        _id: cat._id,
        name: cat.name,
      };
    });
  }, [categories]);

  function navigateToProducts(cat, catType) {
    router.push(`/product?page=1&cat=${cat}&catType=${catType}`);
    handleClose();
  }

  return (
    <>
      <Drawer
        anchor={"right"}
        open={openCategories}
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

        <Grid container className={catMobStyles.sideCartContainer} display="relative">
          <Grid item xs={12} className={catMobStyles.cartItemCont}>
            <List>
              {data.map((currentCat) => (
                <Fragment key={currentCat._id}>
                  <ListItem
                    sx={{ pl: 0 }}
                    secondaryAction={
                      <IconButton
                        onClick={() => {
                          setData((data) => {
                            return data.map((catData) =>
                              catData._id === currentCat._id
                                ? { ...catData, isOpen: !catData.isOpen || false }
                                : catData
                            );
                          });
                        }}
                      >
                        {currentCat.subCategory.length > 0 &&
                          (currentCat.isOpen ? <ExpandLess /> : <ExpandMore />)}
                      </IconButton>
                    }
                  >
                    <ListItemButton onClick={() => navigateToProducts(currentCat._id, "C")}>
                      {currentCat.name}
                    </ListItemButton>
                  </ListItem>
                  <Divider component="li" />

                  <Collapse in={currentCat.isOpen} timeout={"auto"}>
                    <List disablePadding>
                      {currentCat.subCategory.map((currentSubcat) => (
                        <Fragment key={currentSubcat._id}>
                          <ListItem
                            sx={{ pl: 2 }}
                            secondaryAction={
                              <IconButton
                                onClick={() => {
                                  setData((data) => {
                                    return data.map((catData) =>
                                      catData._id === currentCat._id
                                        ? {
                                            ...catData,
                                            subCategory: catData.subCategory.map((subcatData) =>
                                              currentSubcat._id === subcatData._id
                                                ? {
                                                    ...subcatData,
                                                    isOpen: !subcatData.isOpen || false,
                                                  }
                                                : subcatData
                                            ),
                                          }
                                        : catData
                                    );
                                  });
                                }}
                              >
                                {currentSubcat.innerCategories.length > 0 &&
                                  (currentSubcat.isOpen ? <ExpandLess /> : <ExpandMore />)}
                              </IconButton>
                            }
                          >
                            <ListItemButton
                              onClick={() => navigateToProducts(currentSubcat._id, "S")}
                            >
                              {currentSubcat.name}
                            </ListItemButton>
                          </ListItem>
                          <Divider component="li" variant="inset" sx={{ ml: 2 }} />

                          <Collapse in={currentSubcat.isOpen} timeout={"auto"}>
                            <List>
                              {currentSubcat.innerCategories.map((currentIncat) => (
                                <Fragment key={currentIncat._id}>
                                  <ListItem sx={{ pl: 4 }}>
                                    <ListItemButton
                                      onClick={() => navigateToProducts(currentIncat._id, "I")}
                                    >
                                      {currentIncat.name}
                                    </ListItemButton>
                                  </ListItem>
                                  <Divider component="li" variant="inset" sx={{ ml: 4 }} />
                                </Fragment>
                              ))}
                            </List>
                          </Collapse>
                        </Fragment>
                      ))}
                    </List>
                  </Collapse>
                </Fragment>
              ))}
            </List>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}
