import fs from "fs";
import path from "path";
import axios from "axios";

export const downloadFile = async (url: string, filename: string) => {
  const tempDir = path.resolve(__dirname, "../../temp");

  // ensure temp folder exists
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, {
      recursive: true,
    });
  }

  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  const tempPath = path.join(tempDir, filename);

  fs.writeFileSync(tempPath, response.data);

  return tempPath;
};
