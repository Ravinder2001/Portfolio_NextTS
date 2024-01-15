import About from "@/assets/Images/about.png";
import Experience from "@/assets/Images/experience.png";
import Skills from "@/assets/Images/skill.png";
import Contact from "@/assets/Images/contact.png";
import Reviews from "@/assets/Images/rating.png";
import Project from "@/assets/Images/project.png";
import Profile from "@/assets/Images/profile.JPG";
import Logo from "@/assets/Images/logo.jpg";
import Water from "@/assets/Images/water.jpg";
import React from "@/assets/Images/react.png";
import Javascript from "@/assets/Images/javascript.png";
import Typescript from "@/assets/Images/typescript.png";
import SASS from "@/assets/Images/sass.png";
import Node from "@/assets/Images/node.png";
import Postgres from "@/assets/Images/postgres.png";
import AWS from "@/assets/Images/aws.png";
import Mongo from "@/assets/Images/mongo.png";
import Socket from "@/assets/Images/socket.png";
const Images = (name: string) => {
  switch (name) {
    case "About":
      return About;
    case "Experience":
      return Experience;
    case "Skills":
      return Skills;
    case "Contact":
      return Contact;
    case "Reviews":
      return Reviews;
    case "Project":
      return Project;
    case "React":
      return React;
    case "Javascript":
      return Javascript;
    case "Typescript":
      return Typescript;
    case "SASS":
      return SASS;
    case "Node":
      return Node;
    case "Postgres":
      return Postgres;
    case "AWS":
      return AWS;
    case "Socket":
      return Socket;
    case "Mongo":
      return Mongo;

    case "Profile":
      return Profile;
    case "Logo":
      return Logo;
    case "Water":
      return Water;
    default:
      return "";
  }
};
export default Images;
