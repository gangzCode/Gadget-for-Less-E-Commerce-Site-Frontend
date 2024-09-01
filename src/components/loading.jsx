import { Box, Grid, Stack } from "@mui/material";
import styles from "../styles/parallax.module.css";

const Loading = () => {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      style={{ height: "100vh", width: "100vw" }}
    >
      <Box component="img" src="/images/logo-loading.png" className={styles.glow} />
    </Stack>
  );
};
export default Loading;
