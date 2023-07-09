import { db } from "@/lib/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

export default async (req, res) => {
  const { propertyID, userID } = req.query;

  if (req.method == "GET") {
    let property;

    try {
      const propertyRef = doc(db, "users", userID, "properties", propertyID);
      const docSnap = await getDoc(propertyRef);
      if (docSnap.exists()) {
        property = docSnap.data();
      }
      res.status(200).json({
        property,
      });
    } catch (e) {
      res.status(400).json({
        e,
      });
    }
  } else if (req.method == "DELETE") {
    try {
      const propertyRef = doc(db, "users", userID, "properties", propertyID);
      await deleteDoc(propertyRef);
      res.status(200).json({
        response: "Document successfully deleted",
      });
    } catch {
      res.status(400).json({
        e,
      });
    }
  }
};
