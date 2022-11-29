import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const About = () => {
  const visitWebsite = () => {
    window.location = "https://www.rahuljha.tech/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dhtyorsun/image/upload/v1665498233/avatars/izsmsc06wyzy8bnpyyh5.png"
              alt="Founder"
            />
            <h3>Rahul Jha</h3>
            <Button onClick={visitWebsite} color="primary">
              Visit Website
            </Button>
            <span>
              Hi, I am Rahul Jha. This website is Made By me using MERN stack
              Technology.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Connect Me:</Typography>
            <div className="socialIcon">
              <a
                href="https://www.instagram.com/dead.programmer/?hl=en"
                target="blank"
              >
                <TwitterIcon className="twitterSvgIcon" />
              </a>
              <a href="https://github.com/rahuljha4171" target="blank">
                <GitHubIcon className="githubSvgIcon" />
              </a>
              <a
                href="https://www.linkedin.com/in/Rahuljha4171/"
                target="blank"
              >
                <LinkedInIcon className="linkedInSvgIcon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
