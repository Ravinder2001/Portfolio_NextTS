export const getImageName = (tech: string) => {
  let imageName = ["React", "Typescript", "Javascript", "SASS", "Postgres", "Node", "AWS", "Socket","Mongo"];
  const foundName = imageName.find((name) => tech.toLowerCase().includes(name.toLowerCase()));
  return foundName || "";
};
