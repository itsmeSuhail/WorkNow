import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverrfol");

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/itsmearyan/upload", data);

    const { url } = res.data;
    return url;
  } catch (err) {
  }
};

export default upload;