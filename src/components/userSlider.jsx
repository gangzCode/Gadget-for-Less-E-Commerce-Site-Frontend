import styles from '../styles/userSlider.module.css'
import {Drawer, Grid} from "@mui/material";
import React, {useState} from "react";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";

export default function UserSlider(
    {
        openSlider,
        loggedInSlider,
        handleClose
    }) {

    const [login, setLogin] = useState(true);

    return (
        <>
            <Drawer
                anchor={'right'}
                open={openSlider}
                onClose={handleClose}
                onBackdropClick={handleClose}
                transitionDuration={500}
            >
                <div className={styles.closeContainer} onClick={handleClose}>
                    <div className={"dropdn-close " + styles.closeIcon}>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <Grid container className={styles.sideUserContainer}>

                    { !loggedInSlider &&
                        <>
                            <Grid item xs={12}>
                                <div className={styles.buttonBox}>
                                    <div className={styles.btn + ' ' + (login ? styles.leftBtn : styles.rightBtn)}/>
                                    <button className={styles.toggleBtn} onClick={() => setLogin(true)}>Log In</button>
                                    <button className={styles.toggleBtn} onClick={() => setLogin(false)}>Register
                                    </button>
                                </div>
                            </Grid>

                            <Grid item xs={12} overflow="hidden">
                                <Grid container
                                      className={styles.swipeContainer + ' ' + (login ? styles.leftCont : styles.rightCont)}>
                                    <Grid item xs={6}>
                                        <Login/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Register/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    }

                    { loggedInSlider &&
                        <>
                            <Grid item xs={12}>
                                <div className={styles.topic}>User Profile</div>
                                <Profile />
                            </Grid>
                        </>
                    }
                </Grid>
            </Drawer>
        </>
    );
}
