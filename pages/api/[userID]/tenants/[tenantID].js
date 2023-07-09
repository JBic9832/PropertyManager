import { db } from "@/lib/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

export default async (req, res) => {
  const { tenantID, userID } = req.query;

  if (req.method == "GET") {
    let tenant;

    try {
      const tenantRef = doc(db, "users", userID, "tenants", tenantID);
      const docSnap = await getDoc(tenantRef);
      if (docSnap.exists()) {
        tenant = docSnap.data();
      }
      res.status(200).json({
        tenant,
      });
    } catch (e) {
      res.status(400).json({
        e,
      });
    }
  } else if (req.method == "DELETE") {
    try {
      const tenantRef = doc(db, "users", userID, "tenants", tenantID);
      await deleteDoc(tenantRef);
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
