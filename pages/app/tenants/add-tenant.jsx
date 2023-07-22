import Link from "next/link";
import Tenants from ".";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/lib/context";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AddTenant() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [properties, setProperties] = useState();
  const [showSelectionMenu, setShowSelectionMenu] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const submitTenant = async () => {
    if (
      name == undefined ||
      email == undefined ||
      phoneNumber == undefined ||
      selectedProperty == undefined
    )
      return;
    setLoading(true);
    const docRef = collection(db, "users", user.uid, "tenants");
    const response = await addDoc(docRef, {
      name,
      email,
      phoneNumber,
      residentOf: selectedProperty.information.propertyName,
      propertyId: selectedProperty.id,
    });

    if (response) {
      setLoading(false);
      router.back();
    }
  };

  const getProperties = async () => {
    let documents = [];
    try {
      const propertiesRef = query(
        collection(db, "users", user.uid, "properties")
      );
      const propsInOrder = query(propertiesRef, orderBy("dateAdded", "desc"));
      const snapshot = await getDocs(propsInOrder);
      snapshot.docs.map((doc) => {
        documents.push({ information: doc.data(), id: doc.id });
      });
    } catch (e) {
      console.error(e);
    }

    setProperties(documents);
  };

  useEffect(() => {
    if (user) {
      getProperties();
    }
    console.log(selectedProperty);
  }, [user, selectedProperty]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Tenant name"
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tenant email"
        />
        <input
          type="tel"
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Tenant phone number"
        />
        <div className="inline-block relative">
          <h1>Which property does this tenant live at?</h1>
          <button onClick={() => setShowSelectionMenu(!showSelectionMenu)}>
            {selectedProperty ? (
              <span>{selectedProperty.information.propertyName}</span>
            ) : (
              <span>Select</span>
            )}
          </button>
          <div
            className={`${
              showSelectionMenu ? "block absolute bg-white" : "hidden"
            } shadow-md p-2 text-lg`}
          >
            {properties ? (
              properties.map((property) => (
                <h1
                  onClick={() => {
                    setSelectedProperty(property);
                    setShowSelectionMenu(false);
                  }}
                  key={property.id}
                  className="mb-2"
                >
                  {property.information.propertyName}
                </h1>
              ))
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      </div>
      <button onClick={submitTenant} className="my-4">
        Submit
      </button>
      <Link href="/app/tenants" className="text-red-500">
        Cancel
      </Link>
    </div>
  );
}

AddTenant.getLayout = Tenants.getLayout;
