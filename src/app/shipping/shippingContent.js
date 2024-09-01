import { Stack, Typography } from "@mui/material";
import React from "react";
import styles from "@/styles/legal.module.css";

const ShippingContent = () => {
  return (
    <>
      <Stack
        className={styles.container}
        spacing={{ xs: 2, md: 4 }}
        alignItems={{ xs: "start", md: "center" }}
      >
        <Typography className={styles.pageTitle}>Shipping and Delivery Policy</Typography>
        <Typography className={styles.pageSubtitle}>Effective Date: [Aug 26, 2024]</Typography>

        <Stack spacing={5} sx={{ width: "100%" }}>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>1. Overview</Typography>
            <Typography className={styles.body}>
              At Gadget for Less, we strive to provide a seamless shopping experience, including
              prompt and efficient shipping and delivery of your orders. This policy outlines the
              shipping methods, delivery times, and conditions that apply to your purchases.
            </Typography>
          </Stack>

          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>2. Shipping Charges</Typography>
            <Typography className={styles.body}>
              <b>Orders Over $100</b>: We offer free standard shipping on all orders over $100
              within Canada and US
            </Typography>
            <Typography className={styles.body}>
              <b>Orders Under $100</b>: A flat-rate shipping fee of $9.99 applies to all orders
              under $100. We currently do not offer International shipping
            </Typography>
          </Stack>

          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>3. Shipping Methods</Typography>
            <Typography className={styles.body}>
              <b>Standard Shipping</b>: Typically delivers within 5-7 business days.
            </Typography>
            <Typography className={styles.body}>
              <b>Expedited Shipping</b>: Available for an additional fee, typically delivers within
              2-3 business days.
            </Typography>
            <Typography className={styles.body}>
              <b>Priority Shipping</b>: Available for an additional fee, typically delivers within
              1-2 business days.
            </Typography>
          </Stack>

          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>4. Processing Time</Typography>
            <Typography className={styles.body}>
              Orders are processed within 1-2 business days of receipt.
            </Typography>
            <Typography className={styles.body}>
              Orders placed after 3 PM (EST) or on weekends and holidays will be processed the next
              business day.
            </Typography>
          </Stack>

          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>5. Delivery Locations</Typography>
            <Typography className={styles.body}>
              We currently ship within CANADA and US only.
            </Typography>
            <Typography className={styles.body}>
              Unfortunately we do not offer International shipping at this time.
            </Typography>
          </Stack>

          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>6. Order Tracking</Typography>
            <Typography className={styles.body}>
              Once your order has shipped, you will receive an email with a tracking number. You can
              track your shipment through our website or the carrier’s website.
            </Typography>
          </Stack>

          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>7. Delivery Issues</Typography>
            <Typography className={styles.body}>
              <b>Missing Packages</b>: If your package is marked as delivered but you have not
              received it, please contact us within 7 days of the delivery date.
            </Typography>
            <Typography className={styles.body}>
              <b>Damaged Items</b>: If your order arrives damaged, please contact us immediately
              with photos of the damage to facilitate a replacement or refund.
            </Typography>
            <Typography className={styles.body}>
              <b>Incorrect Address</b>: Please ensure that your shipping address is correct. We are
              not responsible for delays or lost packages due to incorrect address information.
            </Typography>
          </Stack>

          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>8. Returns and Exchanges</Typography>
            <Typography className={styles.body}>
              For information on returns and exchanges, please refer to our Return Policy.
            </Typography>
          </Stack>

          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>9. Contact Us</Typography>
            <Typography className={styles.body}>
              If you have any questions or need assistance regarding shipping and delivery, please
              contact our customer service team:
            </Typography>
            <Typography className={styles.body}>
              <ul>
                <li>
                  <b>Email</b>: [orders@gadgoetforless.com]
                </li>
                <li>
                  <b>Phone</b>: [416-291-9800]
                </li>
              </ul>
            </Typography>
          </Stack>

          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>10. Policy Updates</Typography>
            <Typography className={styles.body}>
              We may update this policy from time to time. Any changes will be posted on our website
              and will be effective immediately upon posting.
            </Typography>
            <Typography className={styles.body}>
              Thank you for choosing Gadget for Less. We appreciate your business!
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ShippingContent;
