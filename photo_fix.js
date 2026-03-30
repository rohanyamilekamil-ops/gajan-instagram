// photo_fix.js
export const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "gajan_live");
    const res = await fetch("https://api.cloudinary.com/v1_1/dvfgzrxs7/image/upload", {
        method: "POST",
        body: fd
    });
    return await res.json();
};
