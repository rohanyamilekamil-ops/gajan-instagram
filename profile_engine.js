// profile_engine.js - Safe & Secure Image Upload
export async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'gajan_preset'); // Aapka Cloudinary Preset

    try {
        const res = await fetch('https://api.cloudinary.com/v1_1/tiktok-clone-gajan/image/upload', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        return data.secure_url; // Yeh link Firebase mein jayega
    } catch (e) {
        console.error("Cloudinary Error:", e);
        return null;
    }
}
