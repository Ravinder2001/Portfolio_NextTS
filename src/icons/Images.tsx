import About from "@/assets/Images/about.png";
import Experience from "@/assets/Images/experience.png";
import Skills from "@/assets/Images/skill.png";
import Contact from "@/assets/Images/contact.png";
import Reviews from "@/assets/Images/rating.png";
import Project from "@/assets/Images/project.png";
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
    default:
      return "";
  }
};
export default Images;
