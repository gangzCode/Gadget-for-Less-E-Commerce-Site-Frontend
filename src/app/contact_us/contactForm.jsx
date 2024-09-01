import arrivalStyles from "../../styles/arrivals.module.css";
import styles from "../../styles/account.module.css";
import React, { useState } from "react";
import { Backdrop, CircularProgress, Grid, InputLabel, TextField } from "@mui/material";
import styled from "@emotion/styled";
import formStyl from "../../styles/cart.module.css";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { sendContactUs } from "../../services/apiCalls";

const ContactForm = () => {
  //const {isLoading, isAuthenticated, loginWithRedirect} = useAuth0();
  const { handleSubmit, control, reset } = useForm({ mode: "onBlur" });
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data) => {
    setLoading(true);
    sendContactUs(data)
      .then((value) => {
        enqueueSnackbar("Message sent successfully.", { variant: "success" });
        setLoading(false);
        reset();
      })
      .catch((reason) => {
        enqueueSnackbar("Error occurred when sending.", { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <div
      // style={{ padding: "50px 6rem 50px 6rem", fontSize: "25px" }}
      className={styles.infoContainer}
    >
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress style={{ color: "#FF6B6B" }} />
      </Backdrop>
      <div className={arrivalStyles.title}>CONTACT US</div>
      <Grid container>
        <Grid item xs={12} md={8}>
          <h2 style={{ fontSize: "18px", marginTop: "15px" }} className={styles.heading}>
            Email &ensp;: <a href="mailto: orders@gadgetforless.ca">orders@gadgetforless.ca</a>
            <br />
            <br />
            Phone : <a href="tel:+14162919800">+1-416-291-9800</a>
          </h2>
          <h3 style={{ fontSize: "16px", marginTop: "15px" }} className={styles.headingTip}>
            Call us <b>Monday-Saturday</b> between <b>9.30 am to 5.30pm (EST)</b>, and <b>Sunday</b>{" "}
            between <b>10am to 2pm (EST)</b> and we would be happy to answer your questions or email
            us with any questions and we will get back to you as soon as possible.
            <br />
            <br />
            You can also contact us using the form below.
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container columnSpacing={3}>
              <Grid item xs={12} md={6} className={formStyl.formItem}>
                <InputLabel className={formStyl.inputLabel}>
                  Name<span className={formStyl.mandatory}>*</span>
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
                      type="text"
                    />
                  )}
                  rules={{ required: "Name required" }}
                />
              </Grid>
              <Grid item xs={12} md={6} className={formStyl.formItem}>
                <InputLabel className={formStyl.inputLabel}>
                  Email<span className={formStyl.mandatory}>*</span>
                </InputLabel>
                <Controller
                  name="email"
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
                      type="email"
                    />
                  )}
                  rules={{
                    required: "Email required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Enter a valid email address.",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} className={formStyl.formItem}>
                <InputLabel className={formStyl.inputLabel}>
                  Phone Number<span className={formStyl.mandatory}>*</span>
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
                      placeholder="+1234567890 or 1234567890"
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="tel"
                    />
                  )}
                  rules={{
                    required: "Phone number required",
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: "Please enter a valid number",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} className={formStyl.formItem}>
                <InputLabel className={formStyl.inputLabel}>
                  Message<span className={formStyl.mandatory}>*</span>
                </InputLabel>
                <Controller
                  name="message"
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
                      multiline
                      minRows={5}
                      type="text"
                    />
                  )}
                  rules={{ required: "Message required" }}
                />
              </Grid>
              <Grid item xs={12}>
                <button type="submit" className={"btn-style-black " + formStyl.submitBtn}>
                  <div className="txt"> SUBMIT </div>
                </button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
export default ContactForm;
