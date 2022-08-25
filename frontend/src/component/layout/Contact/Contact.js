import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="anishsingh.199804@gmail.com">
        <Button>Contact: anishsingh.199804@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
