import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.linkedin.com/in/anish-kumar-0817201a2/"
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
              src="https://res.cloudinary.com/dif8c78xj/image/upload/v1661419529/Profile%20Pic/Profile_Pic.jpg"
              alt="Founder"
            />
            <Typography>Anish Kumar</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit LinkedIn
            </Button>
            <span>
              Hi Guys, I welcome you to explore my Ecommerce website, Please feel
              Free to explore, If you have any querries or suggestion please let me know
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="mailto:anishsingh.199804@gmail.com"
              target="blank"
            >
              <EmailIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.linkedin.com/in/anish-kumar-0817201a2/" target="blank">
              <LinkedInIcon  className="instagramSvgIcon" />
            </a>

            <a href="https://www.facebook.com/profile.php?id=100006203108831" target="blank">
              <FacebookIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
