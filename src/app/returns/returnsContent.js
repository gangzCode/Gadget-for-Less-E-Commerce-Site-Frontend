import { Stack, Typography } from "@mui/material";
import React from "react";
import styles from "@/styles/legal.module.css";

const ReturnsContent = () => {
  return (
    <>
      <Stack
        className={styles.container}
        spacing={{ xs: 2, md: 4 }}
        alignItems={{ xs: "start", md: "center" }}
      >
        <Typography className={styles.pageTitle}>Returns & Exchanges</Typography>
        <Typography className={styles.pageSubtitle}>Effective Date: [Aug 26, 2024]</Typography>
        <Typography className={styles.body}>
          At Gadget for Less, we strive to ensure you are satisfied with your purchase. If you need
          to return or exchange an item, please review our policy below to understand the terms and
          process.
        </Typography>
        <Stack spacing={5} sx={{ width: "100%" }}>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>
              1. Eligibility for Returns and Exchanges
            </Typography>
            <Typography className={styles.body}>
              <b>Timeframe</b>: Returns and exchanges must be requested within [10] days of receipt
              of the product.
            </Typography>
            <Typography className={styles.body}>
              <b>Condition</b>: Items must be returned in their original condition, including
              packaging, tags, and any accessories. Products that are damaged, used, or missing
              parts will not be eligible for a refund or exchange.
            </Typography>
            <Typography className={styles.body}>
              <b>Proof of Purchase</b>: A valid receipt or order confirmation is required for all
              returns and exchanges.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>
              2. How to Initiate a Return or Exchange
            </Typography>
            <Typography className={styles.body}>
              <b>Contact Us</b>: To start a return or exchange, please contact our customer service
              team at orders@gadgetforless.ca or 416-291-9800. Provide your order number and details
              about the item you wish to return or exchange.
            </Typography>
            <Typography className={styles.body}>
              <b>Return Authorization</b>: Our customer service team will provide you with a Return
              Merchandise Authorization (RMA) number and instructions for returning the product.
              Please include this RMA number with your return.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>3. Shipping and Handling</Typography>
            <Typography className={styles.body}>
              <b>Return Shipping</b>: Customers are responsible for the cost of return shipping,
              unless the return is due to an error on our part or a defective product. We recommend
              using a trackable shipping service to ensure that your return is received.
            </Typography>
            <Typography className={styles.body}>
              <b>Original Shipping Fees</b>: Original shipping fees are non-refundable unless the
              return is due to an error on our part or a defective product.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>4. Refunds</Typography>
            <Typography className={styles.body}>
              <b>Processing Time</b>: Once we receive and inspect the returned item, we will process
              your refund. Refunds will be issued to the original payment method within [10] days.
            </Typography>
            <Typography className={styles.body}>
              <b>Partial Refunds</b>: If only part of your order is returned, we will issue a refund
              for the returned items only. Shipping fees are non-refundable unless the return is due
              to an error on our part or a defective product.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>5. Exchanges</Typography>
            <Typography className={styles.body}>
              <b>Exchange Process</b>: If you wish to exchange an item for a different product,
              please follow the return process and place a new order for the desired item. Once we
              receive your returned item, we will process the refund, and you will receive your new
              order as soon as possible.
            </Typography>
            <Typography className={styles.body}>
              <b>Availability</b>: Exchanges are subject to the availability of the requested
              product. If the item you wish to exchange for is out of stock, we will issue a refund
              for the returned item.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>6. Defective or Damaged Items</Typography>
            <Typography className={styles.body}>
              <b>Defective Items</b>: If you receive a defective or damaged item, please contact us
              immediately at [orders@gadgetforless.ca] or [416-291-9800.]. Provide details and, if
              possible, photographic evidence of the defect or damage. We will arrange for a
              replacement or refund at no additional cost.
            </Typography>
            <Typography className={styles.body}>
              <b>Error on Our Part</b>: If the return is due to an error on our part (e.g.,
              incorrect item sent), we will cover the return shipping costs and issue a full refund
              or send the correct item.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>7. Non-Returnable Items</Typography>
            <Typography className={styles.body}>
              The following items are non-returnable and non-refundable:
            </Typography>
            <Typography className={styles.body}>
              <ul className={styles.list}>
                <li>Gift cards</li>
                <li>
                  Items marked as &quot;Final Sale&quot; or &quot;Non-Returnable&quot; at the time
                  of purchase
                </li>
              </ul>
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>8. Contact Information</Typography>
            <Typography className={styles.body}>
              For any questions or concerns about our Return and Exchange Policy, please contact us:
            </Typography>
            <Typography className={styles.body}>
              <ul>
                <li>Gadget for Less</li>
                <li>orders@gadgetforless.ca</li>
              </ul>
            </Typography>
            <Typography className={styles.body}>
              Thank you for shopping with Gadget for Less!
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ReturnsContent;
