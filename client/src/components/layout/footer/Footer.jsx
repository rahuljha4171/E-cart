import React from "react";
import appStore from "../../../images/Appstore.png";
import playStore from "../../../images/playstore.png";
import "./footer.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import logo from "../../../images/logoDark.png";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download Our App</h4>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="playstore" />
      </div>
      <div className="middleFooter">
        <Link to="/">
          <img src={logo} alt="E-Cart" />
        </Link>
        <p>World class Service</p>

        <p>Copyright 2022 &copy; Rahul Jha</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Me:</h4>

        <a
          href="https://www.instagram.com/dead.programmer/?hl=en"
          target="blank"
        >
          <TwitterIcon /> Twitter
        </a>
        <a href="https://github.com/rahuljha4171" target="blank">
          <GitHubIcon /> Github
        </a>
        <a href="https://www.linkedin.com/in/Rahuljha4171/" target="blank">
          <LinkedInIcon /> LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
