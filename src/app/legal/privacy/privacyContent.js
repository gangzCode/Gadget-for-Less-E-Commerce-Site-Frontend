import { Stack, Typography } from "@mui/material";
import React from "react";
import styles from "@/styles/legal.module.css";

const PrivacyContent = () => {
  return (
    <>
      <Stack
        className={styles.container}
        spacing={{ xs: 2, md: 4 }}
        alignItems={{ xs: "start", md: "center" }}
      >
        <Typography className={styles.pageTitle}>Privacy Statement</Typography>
        <Typography className={styles.pageSubtitle}>Last updated: [July 12, 2024]</Typography>
        <Typography className={styles.body}>
          At Gadget for less, we are committed to protecting the privacy of your personal
          information. This Privacy Statement describes how we collect, use, disclose, and safeguard
          your information when you use our website, products, and services.
        </Typography>
        <Stack spacing={5} sx={{ width: "100%" }}>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>Information We Collect:</Typography>
            <Typography className={styles.body}>
              We may collect personal information that you provide directly to us, such as your
              name, email address, phone number, and other contact details. We may also collect
              information about your use of our website and services, including IP addresses,
              browser information, and other device details.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>
              1. Personal Information You Choose to Provide:
            </Typography>
            <Typography className={styles.body}>
              <b>a. Registration Information.</b> You will provide us information about yourself,
              your company or institution, and your practices when you register for certain
              services, or register for email newsletters and alerts.
            </Typography>
            <Typography className={styles.body}>
              <b>b. Credit Card Information.</b> If you choose to purchase products or services from
              us, you may need to give personal information and authorization to obtain information
              from various credit services. For example, you may need to provide the following
              information: Name, Mailing address, Email address, Credit card number, Home and
              business phone number
            </Typography>
            <Typography className={styles.body}>
              <b>c. EmaiI.</b> If you choose to correspond with us through email, we may retain the
              content of your email messages together with your email address and our responses. We
              provide the same protections for these electronic communications that we employ in the
              maintenance of information received by mail and telephone.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>2. Web Site Use Information:</Typography>
            <Typography className={styles.body}>
              Similar to other commercial Web sites, our Web site utilizes a standard technology
              called &quot;cookies&quot; (see explanation below, &quot;What Are Cookies?&quot;) and
              Web server logs to collect information about how our Web site is used. Information
              gathered through cookies and Web server logs may include the date and time of visits,
              the pages viewed, time spent at our Website, and the Web sites visited just before and
              just after our Website.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>What Are Cookies:</Typography>
            <Typography className={styles.body}>
              A cookie is a very small text document, which often includes an anonymous unique
              identifier. When you visit a Web site, that site&apos;s computer asks your computer
              for permission to store this file in a part of your hard drive specifically designated
              for cookies. Each Web site can send its own cookie to your browser if your
              browser&apos;s preferences allow it, but (to protect your privacy) your browser only
              permits a Web site to access the cookies it has already sent to you, not the cookies
              sent to you by other sites.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>
              3. How Do We Use the Information That You Provide to Us:
            </Typography>
            <Typography className={styles.body}>
              Generally speaking, we use personal information for purposes of operating our business
              activities, providing customer service and making available other products and
              services to our customers and prospective customers. Occasionally, we may also use the
              information we collect to notify you about important changes to our Website, new
              services and special offers we think you will find valuable. You may notify us at any
              time if you do not wish to receive these offers by emailing us from the &quot;Contact
              Us&quot; area of the web site.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>Information Sharing:</Typography>
            <Typography className={styles.body}>
              We do not sell, trade, or otherwise transfer your personal information to outside
              parties without your consent, except as described in this Privacy Statement. We may
              share your information with trusted third parties who assist us in operating our
              website, conducting our business, or servicing you, as long as those parties agree to
              keep your information confidential. What about Legally Compelled Disclosure of
              Information? We may disclose information when legally compelled to do so, in other
              words, when we, in good faith, believe that the law requires it or for the protection
              of our legal rights.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>4. Security:</Typography>
            <Typography className={styles.body}>
              We implement a variety of security measures to maintain the safety of your personal
              information. However, no method of transmission over the internet or electronic
              storage is completely secure. Therefore, while we strive to use commercially
              acceptable means to protect your personal information, we cannot guarantee its
              absolute security. Email is not recognized as a secure medium of communication. For
              this reason, we request that you do not send private information to us by email. Some
              of the information you may enter on our Web site may be transmitted securely via
              Secure Sockets Layer SSL, 128 bit encryption services, which are enabled by VeriSign,
              Inc. Pages utilizing this technology will have URLs that start with HTTPS instead of
              HTTP. Please contact us from the &quot;Contact Us&quot; area of the web site should
              you have any questions in this regard.
            </Typography>
            <Typography className={styles.body}>
              We are not responsible for the practices employed by Web sites linked to or from our
              Web site nor the information or content contained therein. Often links to other Web
              sites are provided solely as pointers to information on topics that may be useful to
              the users of our Web site. Please remember that when you use a link to go from our Web
              site to another Web site, our Privacy Policy is no longer in effect. Your browsing and
              interaction on any other Website, including Web sites which have a link on our
              Website, is subject to that Website&apos;s own rules and policies. Please read over
              those rules and policies before proceeding
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>5. Your Choices:</Typography>
            <Typography className={styles.body}>
              You have the right to access, correct, or delete your personal information. You may
              also choose to opt-out of certain communications. If you have any questions or
              requests regarding your personal information, please contact us using the information
              provided at the end of this Privacy Statement.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>
              6. Changes to This Privacy Statement:
            </Typography>
            <Typography className={styles.body}>
              We may update this Privacy Statement from time to time. When we do, we will revise the
              &quot;Last Updated&quot; date at the top of this statement. We encourage you to review
              this Privacy Statement periodically to stay informed about how we are protecting your
              information.
            </Typography>
          </Stack>
          <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 3 }}>
            <Typography className={styles.subtitle}>7. Contact Us:</Typography>
            <Typography className={styles.body}>
              you have any questions or concerns about this Privacy Statement or our data practices,
              please contact us at: orders@gadgetforless.ca
            </Typography>

            <Typography className={styles.body}>
              <b>Thank you for trusting Gadget For Less with your information</b>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default PrivacyContent;
