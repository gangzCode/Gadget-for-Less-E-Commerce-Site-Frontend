import { Box, Grid } from "@mui/material";
import styles from "../styles/account.module.css";
import {
  AccountCircleOutlined,
  Inventory2Outlined,
  Logout,
  LogoutOutlined,
  MapOutlined,
  MarkEmailUnread,
} from "@mui/icons-material";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const Profile = ({ current }) => {
  const { user, logout } = useAuth0();

  const [src, setSrc] = useState(user?.picture ? user.picture : "/images/tempItems/user-img.jpg");

  return (
    <>
      <Grid
        container
        borderBottom={"1px solid #e3e3e3"}
        paddingBottom={"30px"}
        marginBottom={"30px"}
      >
        <Grid item xs={4}>
          <Box
            component="img"
            src={src}
            onError={() => setSrc("/images/tempItems/user-img.jpg")}
            className={styles.profileImage}
          />
        </Grid>
        <Grid container item xs={8}>
          <div className={styles.name}>{user?.name}</div>
          <div className={styles.email}>
            <MarkEmailUnread />
            {user?.email}
          </div>
          <div>
            <span
              className={"btn-style-black " + styles.logOut}
              onClick={() =>
                logout({ returnTo: typeof window !== "undefined" ? window.location.origin : "" })
              }
            >
              <div className="txt">
                <LogoutOutlined />
                <Box>Sign Out</Box>
              </div>
            </span>
          </div>
        </Grid>
      </Grid>
      <Link href={"/account"} scroll={false} passHref>
        <div
          className={styles.profileItem + " " + (current === "acc" ? styles.profileItemActive : "")}
        >
          <AccountCircleOutlined /> Account Overview
        </div>
      </Link>
      <Link href={"/account/address"} scroll={false} passHref>
        <div
          className={styles.profileItem + " " + (current === "add" ? styles.profileItemActive : "")}
        >
          <MapOutlined /> Address book
        </div>
      </Link>
      <Link href={"/account/orders"} scroll={false} passHref>
        <div
          className={
            styles.profileItem + " " + (current === "order" ? styles.profileItemActive : "")
          }
        >
          <Inventory2Outlined /> My Orders
        </div>
      </Link>
    </>
  );
};
export default Profile;
