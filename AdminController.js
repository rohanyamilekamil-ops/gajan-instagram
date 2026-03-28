import { db } from './firebaseConfig';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export const ADMIN_CREDENTIALS = {
  user: "MRGAJAN",
  pass: "Abdul6353738585@"
};

// Admin Power: QR Code Change
export const changeQR = async (newUrl) => {
  await updateDoc(doc(db, "appConfig", "payments"), { qrCodeUrl: newUrl });
};

// Admin Power: 10 Million Tokens Stock
export const setAdminStock = async () => {
  await updateDoc(doc(db, "users", "MRGAJAN_UID"), { tokens: 10000000 });
};
