import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export default async (req, res) => {
  const { userID } = req.query;

  let tenants = [];

  try {
    const tenantsRef = query(collection(db, "users", userID, "tenants"));
    const snapshot = await getDocs(tenantsRef);

    snapshot.docs.map((doc) => {
      tenants.push({ information: doc.data(), id: doc.id });
    });

    res.status(200).json({
      tenants,
    });
  } catch (e) {
    res.status(400).end();
  }
};
