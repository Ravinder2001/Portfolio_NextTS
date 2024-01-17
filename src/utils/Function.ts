import { ObjectId } from "mongodb";

export const getImageName = (tech: string) => {
  let imageName = ["React", "Typescript", "Javascript", "SASS", "Postgres", "Node", "AWS", "Socket", "Mongo"];
  const foundName = imageName.find((name) => tech.toLowerCase().includes(name.toLowerCase()));
  return foundName || "";
};
export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

