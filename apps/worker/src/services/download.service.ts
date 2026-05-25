import fs from "fs";
import path from "path";
import axios from "axios";

export const downloadFile = async (url: string, filename: string) => {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  const tempPath = path.resolve(__dirname, "../../temp", filename);

  fs.writeFileSync(tempPath, response.data);

  return tempPath;
};
