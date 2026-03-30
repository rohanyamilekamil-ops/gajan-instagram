export const uploadMedia = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "gajan_uploads"); // Cloudinary setting me ye preset banayein
  data.append("cloud_name", "dvfgzrxs7");

  const response = await fetch("https://api.cloudinary.com/v1_1/dvfgzrxs7/image/upload", {
    method: "POST",
    body: data
  });
  const result = await response.json();
  return result.secure_url; 
};
