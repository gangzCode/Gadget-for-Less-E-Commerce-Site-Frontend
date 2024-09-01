import arrivalStyles from "../../../styles/arrivals.module.css";
import {
  Backdrop,
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Profile from "../../../components/profile";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import styles from "../../../styles/account.module.css";
import billStyles from "../../../styles/cart.module.css";
import tableStyles from "../../../styles/cart.module.css";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import formStyl from "../../../styles/cart.module.css";
import { Controller, useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { useSnackbar } from "notistack";
import { useAuth0 } from "@auth0/auth0-react";
import {
  deleteAddress,
  deleteAddressApi,
  findUserAddress,
  getUserDataByEmail,
  saveUserAddress,
  saveUserDetails,
} from "../../../services/apiCalls";
import countryList from "react-select-country-list";

const Address = () => {
  const columns = [
    { name: "Full name" },
    { name: "Address" },
    { name: "State" },
    { name: "Country" },
    { name: "Phone Number" },
    { name: "" },
  ];

  const toggleModal = () => {
    setEditId(null);
    reset();
    setOpen(!open);
  };
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [forceDataLoad, setForceDataLoad] = useState(false);
  const { handleSubmit, control, setValue, reset } = useForm({ mode: "onBlur" });
  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    async function fetchData() {
      if (!isLoading && user) {
        setLoading(true);
        findUserAddress(await getAccessTokenSilently(), user.email)
          .then((value) => {
            if (value && value.length > 0) {
              setData(value);
            } else {
              setData([]);
              enqueueSnackbar("Please save address to display.", { variant: "info" });
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
  }, [user, forceDataLoad]);

  const onSubmit = async (data) => {
    if (!isLoading && user) {
      setOpen(false);
      data.email = user.email;
      if (editId && editId.trim !== "") {
        data._id = editId;
      }
      setLoading(true);
      saveUserAddress(await getAccessTokenSilently(), data)
        .then((value) => {
          enqueueSnackbar("Data saved successfully.", { variant: "success" });
          setLoading(false);
          setForceDataLoad(!forceDataLoad);
        })
        .catch((reason) => {
          enqueueSnackbar("Error occurred saving address.", { variant: "error" });
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90vw", md: "45vw" },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  function fillForm(data) {
    setEditId(data._id);
    setValue("name", data.name);
    setValue("address", data.address);
    setValue("country", data.country);
    setValue("state", data.state);
    setValue("postalCode", data.postalCode);
    setValue("town", data.town);
    setValue("number", data.number);
    setValue("isDefault", data.isDefault);
    setOpen(true);
  }

  async function deleteAddress(data) {
    if (!isLoading && user) {
      setLoading(true);
      deleteAddressApi(await getAccessTokenSilently(), data._id)
        .then((value) => {
          enqueueSnackbar("Address removed successfully.", { variant: "success" });
          setLoading(false);
          setForceDataLoad(!forceDataLoad);
        })
        .catch((reason) => {
          enqueueSnackbar("Error occurred when removing address.", { variant: "error" });
          setLoading(false);
        });
    }
  }

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
            <Profile current={"add"} />
          </Grid>

          <Grid item xs={12} lg={7}>
            <h2 className={styles.heading}>Address Book</h2>
            <TableContainer component={Paper} className={tableStyles.removeShadow}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((col) => (
                      <TableCell key={col.name} align="center" className={tableStyles.tableHeader}>
                        {col.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <Fragment key={row._id}>
                      <TableRow>
                        <TableCell className={tableStyles.tableBody} align="center" width="25%">
                          <div className={tableStyles.tableCell}>
                            {row.isDefault && (
                              <>
                                <Chip
                                  style={{ marginRight: "10px" }}
                                  label="DEFAULT"
                                  color="success"
                                  size={"small"}
                                />
                                <br />
                              </>
                            )}
                            {row.name}
                          </div>
                        </TableCell>
                        <TableCell className={tableStyles.tableBody} align="center" width="30%">
                          <div className={tableStyles.tableCell}>{row.address}</div>
                        </TableCell>
                        <TableCell className={tableStyles.tableBody} align="center" width="20%">
                          <div className={tableStyles.tableCell}>{row.state}</div>
                        </TableCell>
                        <TableCell className={tableStyles.tableBody} align="center" width="20%">
                          <div className={tableStyles.tableCell}>
                            {countryList().getLabel(row.country)}
                          </div>
                        </TableCell>
                        <TableCell className={tableStyles.tableBody} align="center" width="20%">
                          <div className={tableStyles.tableCell}>{row.number}</div>
                        </TableCell>
                        <TableCell className={tableStyles.tableBody} align="center" width="5%">
                          <div className={tableStyles.tableCell}>
                            <EditOutlined
                              className={styles.addrEditIcon}
                              onClick={() => fillForm(row)}
                            />
                          </div>
                        </TableCell>
                        <TableCell className={tableStyles.tableBody} align="center" width="5%">
                          <div className={tableStyles.tableCell}>
                            <DeleteOutline
                              className={styles.addrEditIcon}
                              onClick={() => deleteAddress(row)}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow className={tableStyles.tableEmptyGap} />
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <button
              type="submit"
              className={"btn-style-black " + styles.addNewAddress}
              onClick={toggleModal}
            >
              <div className="txt"> Add New Address</div>
            </button>
          </Grid>
        </Grid>
      </div>

      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.closeModal} onClick={toggleModal}>
            <div className={"dropdn-close"}>
              <div />
              <div />
            </div>
          </div>
          <h2 className={styles.heading}>Add Address</h2>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container columnSpacing={3}>
              <Grid item xs={12} md={6} className={formStyl.formItem}>
                <InputLabel className={formStyl.inputLabel}>
                  Full Name<span className={formStyl.mandatory}>*</span>
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
                  Phone Number<span className={formStyl.mandatory}>*</span>
                </InputLabel>
                <Controller
                  name="number"
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
              <Grid item xs={6} className={formStyl.formItem}>
                <InputLabel className={formStyl.inputLabel}>
                  Country<span className={formStyl.mandatory}>*</span>
                </InputLabel>
                <Controller
                  name="country"
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
                        {options.map((el) => (
                          <MenuItem key={el.value} value={el.value}>
                            {el.label}
                          </MenuItem>
                        ))}
                      </CssSelect>
                      <FormHelperText className={billStyles.helperText}>
                        {error ? error.message : null}
                      </FormHelperText>
                    </>
                  )}
                  rules={{ required: "Country required" }}
                />
              </Grid>
              <Grid item xs={6} className={formStyl.formItem}>
                <InputLabel className={formStyl.inputLabel}>
                  State/Province<span className={formStyl.mandatory}>*</span>
                </InputLabel>
                <Controller
                  name="state"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                    <>
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
                    </>
                  )}
                  rules={{ required: "State required" }}
                />
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={12} className={formStyl.formItem}>
                  <InputLabel className={formStyl.inputLabel}>
                    Town/City<span className={formStyl.mandatory}>*</span>
                  </InputLabel>
                  <Controller
                    name="town"
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
                    rules={{ required: "Town required" }}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={12} className={formStyl.formItem}>
                  <InputLabel className={formStyl.inputLabel}>
                    Postal code<span className={formStyl.mandatory}>*</span>
                  </InputLabel>
                  <Controller
                    name="postalCode"
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
                    rules={{ required: "Postal code required" }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} className={formStyl.formItem}>
                <InputLabel className={formStyl.inputLabel}>
                  Address<span className={formStyl.mandatory}>*</span>
                </InputLabel>
                <Controller
                  name="address"
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
                      minRows={3}
                      type="text"
                    />
                  )}
                  rules={{ required: "Address required" }}
                />
              </Grid>
              <Grid item xs={12} marginLeft={"2px"}>
                <Controller
                  name="isDefault"
                  control={control}
                  defaultValue={false}
                  render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                    <FormControlLabel
                      value="standard"
                      label={<span className={formStyl.checkboxLabel}>Set as default</span>}
                      control={
                        <Checkbox
                          style={{ color: "#f82e56" }}
                          checked={value}
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <button type="submit" className={"btn-style-black " + formStyl.submitBtn}>
                  <div className="txt"> Save Changes</div>
                </button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Address;
