import React from "react";
import styles from "./style.module.scss";
import ProjectContainer from "./ProjectContainer/ProjectContainer";
function ProjectBox() {
  let projectData = [
    {
      id: "1",
      name: "My Social Space",
      type: "Social Media Website",
      about: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, officia eaque inventore a molestiae impedit architecto veritatis
    necessitatibus sequi tempore magnam veniam at blanditiis tempora cupiditate eveniet, ratione ipsam pariatur. Asperiores magnam quis tenetur
    eveniet sunt iure reprehenderit aperiam cumque a iste odio ex minus doloremque`,
      tech: ["React", "Typescript", "SASS", "NodeJS", "Postgres", "Socket.io", "AWS S3"],
    },
    {
      id: "2",
      name: "Test",
      type: "Social Media Website",
      about: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, officia eaque inventore a molestiae impedit architecto veritatis
    necessitatibus sequi tempore magnam veniam at blanditiis tempora cupiditate eveniet, ratione ipsam pariatur. Asperiores magnam quis tenetur
    eveniet sunt iure reprehenderit aperiam cumque a iste odio ex minus doloremque`,
      tech: ["React", "Javascript", "NodeJS", "Postgres", "Socket.io", "AWS S3"],
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.heading}>My Amazing Works</div>
      {projectData.map((project, index) => (
        <ProjectContainer projectData={project} key={project.id} index={index} />
      ))}
    </div>
  );
}

export default ProjectBox;
