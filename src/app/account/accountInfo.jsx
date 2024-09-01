import arrivalStyles from "../../styles/arrivals.module.css";
import styles from "../../styles/account.module.css";
import {
  Backdrop,
  CircularProgress,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Profile from "../../components/profile";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "@emotion/styled";
import formStyl from "../../styles/cart.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserDataByEmail, saveUserDetails } from "@/services/apiCalls";
import { useSnackbar } from "notistack";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const AccountInfo = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, setValue } = useForm({ mode: "onBlur" });

  useEffect(() => {
    async function fetchData() {
      if (!isLoading && user) {
        setLoading(true);
        getUserDataByEmail(await getAccessTokenSilently(), user?.email)
          .then((value) => {
            console.error(value);
            if (value) {
              setValue("name", value.name);
              setValue("birthDate", value.birthDate);
              setValue("gender", value.gender);
              setValue("phone", value.phone);
            } else {
              enqueueSnackbar("Please save additional data to display.", { variant: "info" });
              setValue("name", user?.name);
            }
            setLoading(false);
          })
          .catch((reason) => {
            enqueueSnackbar("Error occurred getting user data.", { variant: "error" });
            setLoading(false);
          });
      }
    }
    fetchData();
  }, [user]);

  const onSubmit = async (data) => {
    console.log(data);
    if (!isLoading && user) {
      data.email = user?.email;
      setLoading(true);
      saveUserDetails(await getAccessTokenSilently(), data)
        .then((value) => {
          console.error(value);
          enqueueSnackbar("Data saved successfully.", { variant: "success" });
          setLoading(false);
        })
        .catch((reason) => {
          console.log(reason);
          enqueueSnackbar("Error occurred saving user data.", { variant: "error" });
          setLoading(false);
        });
    }
  };

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

  // const StyledDateField = styled

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

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress style={{ color: "#FF6B6B" }} />
      </Backdrop>
      <div
        // style={{ padding: "50px 6rem 50px 6rem", fontSize: "25px" }}
        className={styles.infoContainer}
      >
        <div className={arrivalStyles.title}>MY ACCOUNT</div>
        <Grid container className={styles.container} gap={6}>
          <Grid item xs={12} lg={4}>
            <Profile current={"acc"} />
          </Grid>

          <Grid item xs={12} lg={7}>
            <h2 className={styles.heading}>Account overview</h2>
            <h5 className={styles.headingTip}>
              Feel free to edit any of your details so your account is totally up to date.
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container columnSpacing={3}>
                <Grid item xs={12} md={6} className={formStyl.formItem}>
                  <InputLabel className={formStyl.inputLabel}>
                    Your Name <span className={formStyl.mandatory}>*</span>
                  </InputLabel>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                      <CssTextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        type="tel"
                      />
                    )}
                    rules={{ required: "Name is required" }}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={formStyl.formItem}>
                  <InputLabel className={formStyl.inputLabel}>E-mail Address</InputLabel>
                  <CssTextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={user?.email}
                    disabled={true}
                    type="email"
                  />
                </Grid>
                <Grid item xs={12} md={4} className={formStyl.formItem}>
                  <InputLabel className={formStyl.inputLabel}>
                    Date of birth <span className={formStyl.mandatory}>*</span>
                  </InputLabel>
                  <Controller
                    name="birthDate"
                    control={control}
                    defaultValue=""
                    fullWidth
                    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
                      return (
                        <>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              maxDate={new Date()}
                              value={new Date(value)}
                              onChange={onChange}
                              slotProps={{ textField: { size: "small", fullWidth: true } }}
                              slots={{
                                textField: CssTextField,
                              }}
                            />
                          </LocalizationProvider>
                          <FormHelperText className={formStyl.helperText}>
                            {error ? error.message : null}
                          </FormHelperText>
                        </>
                      );
                    }}
                    rules={{ required: { value: true, message: "Birthdate required" } }}
                  />
                </Grid>
                <Grid item xs={12} md={4} className={formStyl.formItem}>
                  <InputLabel className={formStyl.inputLabel}>
                    Gender <span className={formStyl.mandatory}>*</span>
                  </InputLabel>
                  <Controller
                    name="gender"
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
                          onChange={onChange}
                          error={!!error}
                          type="text"
                        >
                          <MenuItem value="M">Male</MenuItem>
                          <MenuItem value="F">Female</MenuItem>
                          <MenuItem value="O">Other</MenuItem>
                        </CssSelect>
                        <FormHelperText className={formStyl.helperText}>
                          {error ? error.message : null}
                        </FormHelperText>
                      </>
                    )}
                    rules={{ required: { value: true, message: "Gender required" } }}
                  />
                </Grid>
                <Grid item xs={12} md={4} className={formStyl.formItem}>
                  <InputLabel className={formStyl.inputLabel}>
                    Phone Number <span className={formStyl.mandatory}>*</span>
                  </InputLabel>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                      <CssTextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        type="tel"
                      />
                    )}
                    rules={{ required: "Phone number required" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <button type="submit" className={"btn-style-black " + formStyl.submitBtn}>
                    <div className="txt"> Save Changes </div>
                  </button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AccountInfo;
