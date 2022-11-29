import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:rahuljha4171@outlook.com">
        <Button>Contact: rahuljha4171@outlook.com</Button>
      </a>
    </div>
  );
};

export default Contact;
