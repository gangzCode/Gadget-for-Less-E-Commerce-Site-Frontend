import { Stack, Typography } from "@mui/material";
import React from "react";
import styles from "@/styles/legal.module.css";

const TermsContent = () => {
  return (
    <>
      <Stack
        className={styles.container}
        spacing={{ xs: 2, md: 4 }}
        alignItems={{ xs: "start", md: "center" }}
      >
        <Typography className={styles.pageTitle}>Terms & Conditions</Typography>
        <Typography className={styles.pageSubtitle}>Effective Date: [Aug 26, 2024]</Typography>
        <Typography className={styles.body}>
          Welcome to Gadget for Less! By accessing or using our website, products, or services, you
          agree to be bound by the following Terms and Conditions. Please read them carefully.
        </Typography>
        <Stack spacing={5} sx={{ width: "100%" }}>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>1. Acceptance of Terms</Typography>
            <Typography className={styles.body}>
              By using Gadget for Less, you agree to comply with and be legally bound by these Terms
              and Conditions. If you do not agree with these terms, please do not use our website or
              services.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>2. Changes to Terms</Typography>
            <Typography className={styles.body}>
              Gadget for Less reserves the right to update or modify these Terms and Conditions at
              any time. Changes will be effective immediately upon posting on our website. It is
              your responsibility to review these Terms regularly. Your continued use of the website
              or services constitutes acceptance of any changes.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>3. Products and Services</Typography>
            <Typography className={styles.body}>
              We provide a variety of gadgets and related services. All products and services
              offered are subject to availability and may be modified or discontinued at our
              discretion.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>4. Orders and Payments</Typography>
            <Typography className={styles.body}>
              <b>Order Processing</b>: All orders are subject to acceptance and availability. Gadget
              for Less reserves the right to refuse or cancel any order.
            </Typography>
            <Typography className={styles.body}>
              <b>Payment Terms</b>: Payment for products and services must be made in full at the
              time of purchase. We accept various payment methods as indicated on our website.
            </Typography>
            <Typography className={styles.body}>
              <b>Pricing</b>: Prices are subject to change without notice. The price charged will be
              the price at the time of purchase.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>5. Shipping and Delivery</Typography>
            <Typography className={styles.body}>
              <b>Shipping</b>: We will make reasonable efforts to ship your order promptly. Delivery
              times are estimates and may vary.
            </Typography>
            <Typography className={styles.body}>
              <b>Risk of Loss</b>: Risk of loss or damage to the products passes to you upon
              delivery.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>6. Returns and Refunds</Typography>
            <Typography className={styles.body}>
              <b>Returns</b>: Returns must be requested within (10) days of receipt of the product.
              Items must be returned in their original condition and packaging.
            </Typography>
            <Typography className={styles.body}>
              <b>Refunds</b>: Refunds will be issued to the original payment method. Shipping costs
              are non-refundable unless the return is due to an error on our part.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>7. Warranty and Disclaimers</Typography>
            <Typography className={styles.body}>
              <b>Warranty</b>: We provide a [30]-day warranty on all products unless otherwise
              specified. This warranty covers defects in materials and workmanship but does not
              cover damage due to misuse or unauthorized modifications.
            </Typography>
            <Typography className={styles.body}>
              <b>Disclaimers</b>: Gadget for Less makes no warranties, express or implied, regarding
              the accuracy, reliability, or availability of our products or services.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>8. Limitation of Liability</Typography>
            <Typography className={styles.body}>
              To the fullest extent permitted by law, Gadget for Less is not liable for any
              indirect, incidental, consequential, or punitive damages arising from your use of our
              products or services. Our total liability is limited to the amount you paid for the
              product or service.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>9. User Conduct</Typography>
            <Typography className={styles.body}>
              You agree to use our website and services for lawful purposes only. You may not:
            </Typography>
            <Typography className={styles.body}>
              <ul className={styles.list}>
                <li>Engage in any activity that interferes with or disrupts our services.</li>
                <li>Use our website for fraudulent or illegal purposes.</li>
                <li>Attempt to gain unauthorized access to our systems or networks.</li>
              </ul>
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>10. Privacy</Typography>
            <Typography className={styles.body}>
              Your use of our website and services is also governed by our Privacy Policy, which can
              be found at [Privacy Policy]. By using our services, you consent to the collection and
              use of your personal information as described in our Privacy Policy.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>11. Intellectual Property</Typography>
            <Typography className={styles.body}>
              All content on our website, including text, graphics, logos, and software, is the
              property of Gadget for Less or its licensors and is protected by intellectual property
              laws. You may not reproduce, distribute, or create derivative works from any content
              without our express written permission.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>12. Governing Law</Typography>
            <Typography className={styles.body}>
              These Terms and Conditions are governed by and construed in accordance with the laws
              of [Ontario, Canada]. Any disputes arising from these terms or your use of our
              services will be resolved in the courts located in [Ontario, Canada].
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>13. Contact Information</Typography>
            <Typography className={styles.body}>
              If you have any questions or concerns about these Terms and Conditions, please contact
              us at:
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

export default TermsContent;
