import {Controller, useForm} from "react-hook-form";
import styles from "../styles/userSlider.module.css";
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import React from "react";
import styled from "@emotion/styled";

const Login = () => {

    const {handleSubmit, control} = useForm({mode: "onBlur"});

    const loginForm = data => {
        console.log(data);
    };

    const CssTextField = styled(TextField)({
        '& .MuiOutlinedInput-root': {
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
            padding: '4px',
            '& input': {
                color: "black",
                fontWeight: "700"
            },
            '& fieldset': {
                border: '1px solid #ced4da',
                transition: 'all 0.3s',
                borderRadius: '30px',
                color: "#000",
            },
            '&.Mui-focused fieldset': {
                borderColor: '#86b7fe',
                outline: 0,
                boxShadow: '0 0 0 0.25rem rgba(13, 110, 253, 0.25)',
                transition: 'all 0.3s',
            },
        },
    });

  return (
      <form onSubmit={handleSubmit(loginForm)}>
          <Controller
              name="username"
              control={control}
              render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                  <CssTextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      className={styles.inputField}
                      placeholder="User Id"
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="text"
                  />
              )}
              rules={{required: 'Username required'}}
          />
          <Controller
              name="password"
              control={control}
              render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                  <CssTextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      className={styles.inputField}
                      placeholder="Enter Password"
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="password"
                  />
              )}
              rules={{required: 'Password required'}}
          />
          <Controller
              name="creatAcc"
              control={control}
              defaultValue={false}
              render={({field: {onChange, value, onBlur}}) => (
                  <FormControlLabel className={styles.labelCont} value="standard"
                                    label={<span className={styles.checkboxLabel}>Remember Password</span>}
                                    control={<Checkbox style={{color: '#f82e56'}}
                                                       value={value} onChange={onChange}
                                                       onBlur={onBlur}/>}/>
              )}
          />
          <button type="submit" className={"btn-style-black " + styles.loginBtn}>
              <div className="txt"> Log In </div>
          </button>
      </form>
  );
}

export default Login;
