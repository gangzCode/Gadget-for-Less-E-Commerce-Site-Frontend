import styles from "../styles/navbar.module.css";
import {
  AppBar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import {
  CategoryOutlined,
  FavoriteBorderOutlined,
  KeyboardArrowDownRounded,
  Menu,
  PersonOutlineOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import CartSlider from "./cartSlider";
import UserSlider from "./userSlider";
import styled from "@emotion/styled";
import { useAuth0 } from "@auth0/auth0-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import {
  getBestSellers,
  getCart,
  getCategoriesForNav,
  getWishlist,
  quickSearch,
} from "../services/apiCalls";
import { useSnackbar } from "notistack";
import SearchIcon from "@mui/icons-material/Search";
import ShopItem from "./shopItem";
import Image from "next/image";
import Dropdown from "react-multilevel-dropdown";
import ChevronRight from "@mui/icons-material/ChevronRight";
import WishlistSlider from "./wishlist";
import CategoriesSlider from "./categoriesSlider";
import Navmenu from "./navmenu";

const Navbar = ({ refreshCart, refreshWishlist, onRemove }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { enqueueSnackbar } = useSnackbar();

  const [isBanner, setIsBanner] = useState(true);
  const [isBackToTop, setIsBackToTop] = useState(true);

  const [categoryDrawer, setCategoryDrawer] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);

  const [navmenu, setNavmenu] = useState(false);

  const [userObj, setUserObj] = useState(false);
  const [cart, setCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const [cartArray, setCartArray] = useState([]);
  const [wishlistArray, setWishlistArray] = useState([]);

  const [showNav, setShowNav] = useState(false);
  const [searchItems, setSearchItems] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    isLoading,
    isAuthenticated,
    getAccessTokenSilently,
    loginWithRedirect,
    user,
    loginWithPopup,
  } = useAuth0();

  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  useEffect(() => {
    setCart(false);
    setUserObj(false);
    setWishlist(false);
  }, [router]);

  useEffect(() => {
    async function fetchData() {
      getCategoriesForNav()
        .then((value) => {
          setCategoryArray(value);
        })
        .catch((reason) => {
          enqueueSnackbar("Error occurred getting categories.", { variant: "error" });
        });
      getBestSellers(6)
        .then((value) => {
          let data = [];
          value.forEach((obj) => {
            data.push(obj);
          });
          let tempSize = data.length;
          if (tempSize < 6) {
            for (let i = 0; i < 6 - tempSize; i++) {
              data[data.length++] = {};
            }
          }
          setBestSellers(data);
          setSearchItems(data);
        })
        .catch((reason) => {
          enqueueSnackbar("Error occurred getting best sellers", { variant: "error" });
        });
      loadWishlist();
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      await loadCartValue();
    }

    fetchData();
  }, [refreshCart]);

  useEffect(() => {
    console.log("Refreshing wishlist");
    async function fetchData() {
      await loadWishlist();
    }
    fetchData();
  }, [refreshWishlist]);

  async function loadCartValue() {
    if (isAuthenticated) {
      getCart(await getAccessTokenSilently(), user.email)
        .then((value) => {
          setCartArray(value);
        })
        .catch((reason) => {
          enqueueSnackbar("Error occurred getting cart.", { variant: "error" });
        });
      if (onRemove) {
        onRemove();
      }
    }
  }

  async function loadWishlist() {
    if (isAuthenticated) {
      getWishlist(await getAccessTokenSilently(), user.email)
        .then((value) => {
          setWishlistArray(value);
        })
        .catch((reason) => {
          enqueueSnackbar("Error occurred getting wishlist.", { variant: "error" });
        });
    }
  }

  const listenToScroll = () => {
    let heightToHideFrom = 10;
    let heightToShowFrom = 900;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      isBanner && // to limit setting state only the first time
        setIsBanner(false);
    } else {
      setIsBanner(true);
    }

    if (winScroll > heightToShowFrom) {
      setIsBackToTop(false);
    } else {
      setIsBackToTop(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleUserDrawer = (open) => (event) => {
    if (isLoading) {
      return;
    }
    if (open && !isAuthenticated) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirect_url", `${pathname}?${searchParams.toString()}`);
      }
      loginWithRedirect();
    } else {
      setUserObj(open);
    }
  };

  const toggleCartDrawer = (open) => (event) => {
    if (isLoading) {
      return;
    }
    if (open && !isAuthenticated) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirect_url", `${pathname}?${searchParams.toString()}`);
      }
      loginWithRedirect();
    } else {
      setCart(open);
    }
  };

  const toggleWishlistDrawer = (open) => (event) => {
    if (isLoading) {
      return;
    }

    if (open && !isAuthenticated) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirect_url", `${pathname}?${searchParams.toString()}`);
      }
      loginWithRedirect();
    } else {
      setWishlist(open);
    }
  };

  const toggleCategoriesDrawer = (open) => (event) => {
    if (isLoading) {
      return;
    }
    setCategoryDrawer(open);
  };

  const toggleNavmenuDrawer = (open) => (event) => {
    if (isLoading) {
      return;
    }
    setNavmenu(open);
  };

  function navigateToProducts(cat, catType) {
    router.push(`/product?page=1&cat=${cat}&catType=${catType}`);
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: "0",
      top: "2px",
      backgroundColor: "black",
    },
  }));

  const StyledMobileBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: "0",
      top: "2px",
      fontSize: "0.7em",
      width: "10px",
      backgroundColor: "black",
    },
  }));

  function onSearchKey(event) {
    setSearchTerm(event.target.value);
    retrieveSearch(event.target.value);
  }

  async function retrieveSearch(data) {
    if (data && data.trim() !== "") {
      setLoadingSearch(true);
      quickSearch(data)
        .then((value) => {
          let tempSize = value.length;
          if (tempSize < 6) {
            for (let i = 0; i < 6 - tempSize; i++) {
              value[value.length++] = {};
            }
          }
          setSearchItems(value);
          setLoadingSearch(false);
        })
        .catch((err) => {
          setLoadingSearch(false);
          if (err.name !== "AbortError") {
            enqueueSnackbar("Error when performing search.", { variant: "error" });
          }
        });
    } else {
      setSearchItems(bestSellers);
    }
  }

  const CssTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: "400",
      width: "100%",
      background: "none",
      border: "none",
      borderBottom: "3px solid #fff",
      outline: "none",
      color: "#fff",
      fontSize: "25px",
      letterSpacing: "2px",
      borderRadius: "0",
      "& .MuiOutlinedInput-input": {
        padding: "5px 2px 5px 2px",
      },
      "& fieldset": {
        border: "none",
        width: "100%",
      },
      "&.Mui-focused fieldset": {
        borderColor: "none",
        padding: "0",
        outline: 0,
        boxShadow: "none",
        transition: "all 0.3s",
        width: "100%",
      },
    },
  });

  return (
    <>
      <Grid container className={styles.navContainer}>
        {/* Nav Banner */}
        <Grid
          container
          className={styles.banner + " " + (!isBanner ? styles.bannerHide : "")}
          alignContent={"center"}
          display={{ xs: "none", xl: "flex" }}
        >
          <Grid item xs className={styles.bannerName} display={{ xs: "none", md: "flex" }}>
            Gadget For Less
          </Grid>
          <Box className={styles.bannerMiddle}>
            Shipping free for orders over <span>$100</span>! <Link href={"/product"}>Shop Now</Link>
          </Box>
          <Grid
            container
            item
            xs={3}
            className={styles.bannerRightContainer}
            display={{ xs: "none", md: "flex" }}
          >
            <Grid item xs={6} className={styles.bannerRight}>
              <CallIcon />
              <a href="tel:+14162919800">+1-416-291-9800</a>
            </Grid>
            <Grid item xs={6} className={styles.bannerRight}>
              <EmailIcon />
              <a href="mailto: orders@gadgetforless.ca">orders@gadgetforless.ca</a>
            </Grid>
          </Grid>
        </Grid>

        {/* Nav Wrapper */}
        <AppBar position="static" style={{ zIndex: 100 }}>
          {/* Upper Navbar */}
          <Toolbar className={styles.sample} sx={{ justifyContent: "space-between" }}>
            <Link href={"/"} passHref>
              <Box
                sx={{
                  width: { xs: "80px", sm: "160px", md: "200px" },
                  padding: " 0",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                component="img"
                src="/images/logo-loading.png"
              />
            </Link>

            <Stack className={styles.headerSearch} direction={"row"} justifyContent={"center"}>
              <InputBase
                sx={{ m: "0px 8px", width: "100%" }}
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                inputProps={{
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      console.log(e.key);
                      setShowNav(true);
                      retrieveSearch(searchTerm);
                    }
                  },
                }}
                className={styles.searchInput}
              />
              <IconButton
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={() => {
                  setShowNav(true);
                  retrieveSearch(searchTerm);
                }}
                className={styles.searchButton}
              >
                <SearchIcon />
              </IconButton>
            </Stack>
            <Stack
              justifyContent={"flex-end"}
              direction={"row"}
              className={styles.menuIcons}
              spacing={2}
              display={{ xs: "none", sm: "flex" }}
            >
              <Box direction={"row"} justifyContent={"center"} alignItems={"center"}>
                <StyledBadge
                  badgeContent={wishlistArray.length}
                  color="primary"
                  className={styles.cartIcon}
                  onClick={toggleWishlistDrawer(true)}
                >
                  <FavoriteBorderOutlined />
                </StyledBadge>
              </Box>
              <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
                <StyledBadge
                  badgeContent={cartArray.length}
                  color="primary"
                  className={styles.cartIcon}
                  onClick={toggleCartDrawer(true)}
                >
                  <ShoppingCartOutlined />
                </StyledBadge>
              </Stack>
              <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
                <PersonOutlineOutlined
                  className={styles.cartIcon}
                  onClick={toggleUserDrawer(true)}
                />
              </Stack>
            </Stack>
          </Toolbar>
          {/* Lower Navbar */}
          <Toolbar
            className={styles.secondToolBar}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Box display={{ xs: "none", md: "block" }}>
              <Dropdown
                title={
                  <Typography className={styles.catMenuButtonText}>
                    <CategoryOutlined sx={{ marginRight: 1 }} />
                    Categories
                  </Typography>
                }
                position="right"
                buttonVariant=""
                buttonClassName={styles.catMenuWrapper}
                menuClassName={styles.catMenu}
                openOnHover
              >
                {categoryArray.map((category) => (
                  <Dropdown.Item key={category._id} className={styles.catMenuItem}>
                    <Stack
                      direction={"row !important"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      sx={{ width: "100%" }}
                      onClick={() => navigateToProducts(category._id, "C")}
                    >
                      <Typography className={styles.catMenuItemText}>{category.name}</Typography>
                      {category.subCategory.length > 0 && <ChevronRight />}
                    </Stack>
                    {category.subCategory.length > 0 && (
                      <Dropdown.Submenu position="right" className={styles.catSubMenu}>
                        {category.subCategory.map((subcat) => (
                          <Dropdown.Item key={subcat._id} className={styles.catMenuItem}>
                            <Stack
                              direction={"row !important"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              sx={{ width: "100%" }}
                              onClick={() => navigateToProducts(subcat._id, "S")}
                            >
                              <Typography className={styles.catMenuItemText}>
                                {subcat.name}
                              </Typography>
                              {subcat.innerCategories.length > 0 && <ChevronRight />}
                            </Stack>
                            {subcat.innerCategories.length > 0 && (
                              <Dropdown.Submenu position="right" className={styles.catSubMenu}>
                                {subcat.innerCategories.map((incat) => (
                                  <Dropdown.Item key={incat._id}>
                                    <Typography
                                      className={styles.catMenuItemText}
                                      onClick={() => navigateToProducts(incat._id, "I")}
                                    >
                                      {incat.name}
                                    </Typography>
                                  </Dropdown.Item>
                                ))}
                              </Dropdown.Submenu>
                            )}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Submenu>
                    )}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </Box>
            <Stack
              display={{ xs: "block", md: "none" }}
              className={styles.catMenuWrapper}
              onClick={toggleCategoriesDrawer(true)}
            >
              <Typography className={styles.catMenuButtonText}>
                <CategoryOutlined sx={{ marginRight: 1 }} />
                Categories
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              className={styles.navigationMenuWrapper}
              justifyContent={"center"}
              alignItems={"center"}
              display={{ xs: "none", md: "flex" }}
            >
              <Typography variant="h6" component="div" className={styles.menuItem}>
                <Link href={"/"}>HOME</Link>
              </Typography>
              <Typography variant="h6" component="div" className={styles.menuItem}>
                <Link href={"/sales?page=1"}>SALE</Link>
              </Typography>
              <Typography variant="h6" component="div" className={styles.menuItem}>
                <Link href={"/bestseller"}>BEST SELLERS</Link>
              </Typography>
              <Typography variant="h6" component="div" className={styles.menuItem}>
                HELP
              </Typography>
              <Typography variant="h6" component="div" className={styles.menuItem}>
                <Link href={"/contact_us"} passHref>
                  CONTACT US
                </Link>
              </Typography>
            </Stack>
            <Stack display={{ xs: "flex", md: "none" }}>
              <IconButton aria-label="navmenu" onClick={toggleNavmenuDrawer(true)}>
                <Menu />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
      </Grid>

      <Grid container className={styles.mobileNavContainer} display={{ xs: "flex", sm: "none" }}>
        <Stack
          justifyContent={"space-around"}
          direction={"row"}
          className={styles.menuIconsMobile}
          spacing={2}
        >
          <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
            <StyledMobileBadge
              badgeContent={wishlistArray.length}
              color="primary"
              className={styles.cartIcon}
              onClick={toggleWishlistDrawer(true)}
            >
              <FavoriteBorderOutlined />
            </StyledMobileBadge>
          </Stack>
          <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
            <StyledMobileBadge
              badgeContent={cartArray.length}
              color="primary"
              className={styles.cartIcon}
              onClick={toggleCartDrawer(true)}
            >
              <ShoppingCartOutlined />
            </StyledMobileBadge>
          </Stack>
          <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
            <PersonOutlineOutlined className={styles.cartIcon} onClick={toggleUserDrawer(true)} />
          </Stack>
        </Stack>
      </Grid>

      <div
        className={styles.backToTop + " " + (isBackToTop ? styles.hide : styles.show)}
        onClick={scrollToTop}
      >
        <KeyboardArrowDownRounded className={styles.upIcon} />
      </div>
      <Navmenu openNavmenu={navmenu} handleClose={toggleNavmenuDrawer(false)} />
      <CategoriesSlider
        openCategories={categoryDrawer}
        categories={categoryArray}
        handleClose={toggleCategoriesDrawer(false)}
      />
      <WishlistSlider
        openWishlist={wishlist}
        wishlistArray={wishlistArray}
        handleClose={toggleWishlistDrawer(false)}
        onItemDelete={loadWishlist}
      />
      <CartSlider
        openCart={cart}
        cartArray={cartArray}
        handleClose={toggleCartDrawer(false)}
        onItemDelete={loadCartValue}
        onUpdateCart={loadCartValue}
      />
      <UserSlider
        openSlider={userObj}
        loggedInSlider={isAuthenticated}
        handleClose={toggleUserDrawer(false)}
      />

      <Dialog
        open={showNav}
        fullWidth={true}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: { xs: "100vw", md: "85vw" }, // Set your width here
              overflow: "hidden",
              margin: { xs: "12px", md: "32px" },
            },
          },
        }}
        slotProps={{ backdrop: { style: { backgroundColor: "rgba(0,0,0,0.95)" } } }}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
          },
        }}
        onClose={() => {
          if (!loadingSearch) {
            setShowNav(false);
          }
        }}
      >
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <CssTextField
                fullWidth
                placeholder="Products, Colors, FAQ etc..."
                name="xx"
                value={searchTerm}
                onChange={onSearchKey}
                autoFocus
              />
            </Grid>
          </Grid>
          <Box className={styles.itemsBox} width={"100%"}>
            <Grid
              container
              alignContent={"center"}
              justifyContent={"center"}
              className={styles.searchProgress}
              style={loadingSearch ? { visibility: "visible" } : { visibility: "hidden" }}
            >
              <Grid item xs={12} style={{ marginTop: "-7%" }}>
                <CircularProgress size={60} />
              </Grid>
            </Grid>
            <h3 className={styles.searchTitle}>Products</h3>
            <Grid container columnSpacing={1} width={"100%"}>
              {searchItems.map(
                (el, index) =>
                  !!el._id && (
                    <Grid key={el._id} item xs={12} md={2}>
                      <div style={{ height: "40vh" }}>
                        <ShopItem
                          productId={el["_id"]}
                          name={el.name}
                          price={el.variations[0].price}
                          variationCount={el.variations.length}
                          variationId={el.variations[0]._id}
                          discountedPrice={el.variations[0].discountedPrice}
                          description={el.description}
                          image={el.image}
                          altImage={el.imageAlt}
                          favorite={false}
                          onAddToCart={loadCartValue}
                          onAddToWishlist={loadWishlist}
                        />
                      </div>
                    </Grid>
                  )
                // : (
                //   <Grid key={index} item xs={2}>
                //     <div style={{ height: "40vh" }} />
                //   </Grid>
                // )
              )}
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
