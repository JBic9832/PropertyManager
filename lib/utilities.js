import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const getPropertiesHelper = async (db, userId) => {
  let documents = [];
  try {
    const propertiesRef = query(collection(db, "users", userId, "properties"));
    const propsInOrder = query(propertiesRef, orderBy("dateAdded", "desc"));
    const snapshot = await getDocs(propsInOrder);
    snapshot.docs.map((doc) => {
      documents.push({ information: doc.data(), id: doc.id });
    });
  } catch (e) {
    console.error(e);
  }

  return documents;
};

export const getTenantsHelper = async (db, userId) => {
  let documents = [];
  try {
    const tenantsRef = query(collection(db, "users", userId, "tenants"));
    const snapshot = await getDocs(tenantsRef);
    snapshot.docs.map((doc) => {
      documents.push({ information: doc.data(), id: doc.id });
    });
  } catch (e) {
    console.error(e);
  }

  return documents;
};

export const deleteTenantHelper = async (db, userId, id) => {
  try {
    const docRef = doc(db, "users", userId, "tenants", id);
    await deleteDoc(docRef);

    router.reload();
  } catch (e) {
    console.error(e);
  }
};
