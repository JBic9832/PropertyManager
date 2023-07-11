import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export default async (req, res) => {
  const { userID } = req.query;

  let properties = [];

  try {
    const propertiesRef = query(collection(db, "users", userID, "properties"));
    const snapshot = await getDocs(propertiesRef);

    snapshot.docs.map((doc) => {
      properties.push({ information: doc.data(), id: doc.id });
    });

    res.status(200).json({
      properties,
    });
  } catch (e) {
    res.status(400).json({
      userID,
    });
  }
};
