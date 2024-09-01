import React, { useEffect, useState } from "react";
import styles from "../../styles/cart.module.css";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import {
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  findPostalCharges,
  findUserAddress,
  getPaymentLink,
  placeOrder,
} from "../../services/apiCalls";
import { useSnackbar } from "notistack";
import { useAuth0 } from "@auth0/auth0-react";
import countryList from "react-select-country-list";
import { useRouter } from "next/navigation";

const BillingForm = ({ cart, loading, orderPlaced }) => {
  const router = useRouter();

  const { handleSubmit, control, setValue, getValues } = useForm({ mode: "onBlur" });
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState([]);
  const [curAddress, setCurAddress] = useState({});
  const [calculating, setCalculating] = useState(false);
  const [shipping, setShipping] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data) => {
    await proceedToPay(data);
  };

  useEffect(() => {
    async function fetchData() {
      if (!isLoading && user) {
        findUserAddress(await getAccessTokenSilently(), user.email)
          .then((value) => {
            if (value && value.length > 0) {
              setData(value);
              let defaultAddress = "";
              if (value.length === 1) {
                defaultAddress = value[0]._id;
              } else {
                for (let el of value) {
                  if (el.isDefault) {
                    defaultAddress = el._id;
                    break;
                  }
                }
              }
              setValue("address", defaultAddress);
              setValue("delivery", "standard");
              fillForm(defaultAddress, value);
            } else {
              setData([]);
              enqueueSnackbar("Please save address to display.", { variant: "info" });
            }
          })
          .catch((reason) => {
            console.error(reason);
            enqueueSnackbar("Error occurred getting user data.", { variant: "error" });
          });
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     loading(true);
  //     setCalculating(true);
  //     let dataObj = { email: user.email, country: curAddress.country };
  //     findPostalCharges(dataObj)
  //       .then((value) => {
  //         setShipping(value);
  //         setCalculating(false);
  //         loading(false);
  //       })
  //       .catch((reason) => {
  //         setShipping(null);
  //         setCalculating(false);
  //         loading(false);
  //         enqueueSnackbar("Error occurred getting delivery charges.", { variant: "error" });
  //       });
  //   }
  //   fetchData();
  // }, [curAddress]);

  // useEffect(() => {
  //   let type = getValues()["delivery"];
  //   let bol = type === "premium" || type === "standard";
  //   deliveryType(bol);
  // }, [shipping]);

  const CssTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "1.5",
      color: "#212529",
      "& fieldset": {
        border: "1px solid #ced4da",
        transition: "all 0.3s",
        borderRadius: "30px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#86b7fe",
        outline: 0,
        boxShadow: "0 0 0 0.25rem rgba(13, 110, 253, 0.25)",
        transition: "all 0.3s",
      },
    },
  });

  const CssSelect = styled(Select)({
    borderRadius: "30px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "1.5",
    color: "#212529",
    "& .MuiSelect-outlined": {
      "&:focus": {
        borderRadius: "30px",
        borderColor: "#86b7fe",
        outline: 0,
        boxShadow: "0 0 0 0.25rem rgba(13, 110, 253, 0.25)",
        transition: "all 0.3s",
      },
    },
  });

  function fillForm(code, dataArray) {
    if (code && code.trim !== "") {
      let address;
      if (!dataArray) {
        dataArray = data;
      }
      for (let adr of dataArray) {
        if (adr._id === code) {
          address = adr;
          break;
        }
      }
      // if (address?.country === "GB") {
      //   setIsUK(true);
      //   setValue("delivery", "premium");
      // } else {
      //   setIsUK(false);
      //   setValue("delivery", "standard");
      // }
      setCurAddress(address);
    }
  }

  // function deliveryType(isNormal) {
  //   shippingDetails({ shipping: shipping, isNormal: isNormal });
  // }

  async function proceedToPay(data) {
    console.log(data);

    // loading(true);
    // data.email = user.email;
    // placeOrder(await getAccessTokenSilently(), data)
    //   .then((value) => {
    //     loading(false);
    //     if (!value.success) {
    //       enqueueSnackbar(value.message, { variant: "error" });
    //     } else {
    //       enqueueSnackbar("Order placed successfully.", { variant: "success" });
    //       orderPlaced();
    //     }
    //   })
    //   .catch((reason) => {
    //     loading(false);
    //     enqueueSnackbar("Error occurred when placing order.", { variant: "error" });
    //   });
    // getPaymentLink(await getAccessTokenSilently(), data)
    //   .then((value) => {
    //     loading(false);

    //     console.log(value.link);
    //     router.push(value.link);
    //   })
    //   .catch((reason) => {
    //     loading(false);
    //     enqueueSnackbar("Error occurred when loading payment.", { variant: "error" });
    //   });
    router.push(`/checkout/payment?address=${data.address}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} md={6} className={styles.formItem}>
          <InputLabel className={styles.inputLabel}>My Addresses</InputLabel>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <>
                <CssSelect
                  fullWidth
                  size="small"
                  variant="outlined"
                  onBlur={onBlur}
                  value={value}
                  inputProps={{ MenuProps: { disableScrollLock: true } }}
                  onChange={(e) => {
                    onChange(e);
                    fillForm(e.target.value);
                  }}
                  error={!!error}
                  type="text"
                >
                  {data.map((el) => (
                    <MenuItem key={el._id} value={el._id}>
                      {el.address +
                        ", " +
                        el.town +
                        ", " +
                        el.state +
                        ", " +
                        countryList().getLabel(el.country)}
                    </MenuItem>
                  ))}
                </CssSelect>
                <FormHelperText className={styles.helperText}>
                  {error ? error.message : null}
                </FormHelperText>
              </>
            )}
            rules={{ required: "Please select an address" }}
          />
        </Grid>
        <Grid item xs={12} md={6} className={styles.formItem}>
          <Link href="/account/address" passHref>
            <span className={"btn-style-black " + styles.cartBtn}>
              <div className="txt"> ADD ADDRESS </div>
            </span>
          </Link>
        </Grid>
        <Grid item xs={6} className={styles.formItem}>
          <InputLabel className={styles.inputLabel}>Full Name</InputLabel>
          <CssTextField
            fullWidth
            value={curAddress?.name}
            size="small"
            variant="outlined"
            type="text"
            disabled
          />
        </Grid>
        <Grid item xs={6} className={styles.formItem}>
          <InputLabel className={styles.inputLabel}>Phone Number</InputLabel>
          <CssTextField
            fullWidth
            value={curAddress?.number}
            size="small"
            variant="outlined"
            type="text"
            disabled
          />
        </Grid>
        <Grid item xs={6} className={styles.formItem}>
          <InputLabel className={styles.inputLabel}>Country</InputLabel>
          <CssTextField
            fullWidth
            value={curAddress?.country ? countryList().getLabel(curAddress?.country) : ""}
            size="small"
            variant="outlined"
            type="text"
            disabled
          />
        </Grid>
        <Grid item xs={6} className={styles.formItem}>
          <InputLabel className={styles.inputLabel}>State/Provence</InputLabel>
          <CssTextField
            fullWidth
            value={curAddress?.state}
            size="small"
            variant="outlined"
            type="text"
            disabled
          />
        </Grid>
        <Grid item xs={6} className={styles.formItem}>
          <InputLabel className={styles.inputLabel}>Town/City</InputLabel>
          <CssTextField
            fullWidth
            value={curAddress?.town}
            size="small"
            variant="outlined"
            type="text"
            disabled
          />
        </Grid>
        <Grid item xs={6} className={styles.formItem}>
          <InputLabel className={styles.inputLabel}>Postal Code</InputLabel>
          <CssTextField
            fullWidth
            value={curAddress?.postalCode}
            size="small"
            variant="outlined"
            type="text"
            disabled
          />
        </Grid>
        <Grid item xs={12} className={styles.formItem}>
          <InputLabel className={styles.inputLabel}>Address</InputLabel>
          <CssTextField
            fullWidth
            value={curAddress?.address}
            size="small"
            variant="outlined"
            multiline
            minRows={3}
            type="text"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6} className={styles.formItem}>
          <InputLabel className={styles.inputLabel}>E-mail</InputLabel>
          <CssTextField
            fullWidth
            value={user?.email}
            size="small"
            variant="outlined"
            type="text"
            disabled
          />
        </Grid>
        {cart && cart.length > 0 && (
          <>
            {/* <Grid item xs={12} className={styles.formItem}>
              <h5 className={styles.formSubtopic}>Delivery</h5>
              <div className={styles.formSubtopicTip}>Choose delivery option below</div>
              <Controller
                name="delivery"
                control={control}
                defaultValue=""
                render={
                  ({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                    <RadioGroup
                      onChange={(e) => {
                        onChange(e);
                        deliveryType(e.target.value === "standard");
                      }}
                      value={value}
                      onBlur={onBlur}
                    >
                      <FormControlLabel
                        value="standard"
                        control={<Radio style={{ color: "#f82e56" }} />}
                        label={
                          <>
                            <span className={styles.radioOne}>Standard Delivery</span>
                            <span className={styles.radioTwo}>
                              {calculating ? "calculating..." : "$" + shipping?.normalPrice} /
                              Delivery in 5 to 7 business Days
                            </span>
                          </>
                        }
                      />
                      <FormControlLabel
                        value="express"
                        control={<Radio style={{ color: "#f82e56" }} />}
                        label={
                          <>
                            <span className={styles.radioOne}>Express Delivery</span>
                            <span className={styles.radioTwo}>
                              {calculating ? "calculating..." : "$" + shipping?.expensivePrice} /
                              Delivery in 5 to 7 business Days
                            </span>
                          </>
                        }
                      />
                    </RadioGroup>
                  )
                  // isUK ? (
                  //   <RadioGroup
                  //     onChange={(e) => {
                  //       onChange(e);
                  //       deliveryType(e.target.value === "premium");
                  //     }}
                  //     value={value}
                  //     onBlur={onBlur}
                  //   >
                  //     <FormControlLabel
                  //       value="premium"
                  //       control={<Radio style={{ color: "#f82e56" }} />}
                  //       label={
                  //         <>
                  //           <span className={styles.radioOne}>Premium Delivery</span>
                  //           <span className={styles.radioTwo}>
                  //             {calculating ? "calculating..." : "$" + shipping?.normalPrice} /
                  //             Guarantee next day delivery
                  //           </span>
                  //         </>
                  //       }
                  //     />
                  //     <FormControlLabel
                  //       value="premiumPlus"
                  //       control={<Radio style={{ color: "#f82e56" }} />}
                  //       label={
                  //         <>
                  //           <span className={styles.radioOne}>Premium Plus Delivery</span>
                  //           <span className={styles.radioTwo}>
                  //             {calculating ? "calculating..." : "$" + shipping?.expensivePrice} /
                  //             Saturday delivery
                  //           </span>
                  //         </>
                  //       }
                  //     />
                  //   </RadioGroup>
                  // ) : (

                  // )
                }
                rules={{ required: "Delivery required" }}
              />
            </Grid> */}
            <Grid item xs={12}>
              <button type="submit" className={"btn-style-black " + styles.submitBtn}>
                <div className="txt"> Proceed To Pay</div>
              </button>
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
};

export default BillingForm;
