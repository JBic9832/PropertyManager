import { UserContext } from "@/lib/context";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Properties from ".";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Property() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const { propertyID } = router.query;

  const [property, setProperty] = useState();
  const [tenants, setTenants] = useState();

  const getProperty = async () => {
    let property;
    let tenantsList = [];
    try {
      const propertyRef = doc(db, "users", user.uid, "properties", propertyID);
      const docSnap = await getDoc(propertyRef);
      if (docSnap.exists()) {
        property = docSnap.data();
      }

      const tenantsRef = collection(db, "users", user.uid, "tenants");
      const tenantsInCurrentProperty = query(
        tenantsRef,
        where("propertyId", "==", propertyID)
      );
      const tenantSnap = await getDocs(tenantsInCurrentProperty);
      tenantSnap.docs.map((tenant) => {
        tenantsList.push(tenant.data());
        console.log(tenant.data());
      });

      setTenants(tenantsList);
    } catch (e) {
      console.error(e);
    }
    setProperty(property);
  };

  const deleteProperty = async () => {
    try {
      const propertyRef = doc(db, "users", user.uid, "properties", propertyID);
      await deleteDoc(propertyRef);

      router.push("/app/properties");
    } catch {
      console.error(e);
    }
  };

  useEffect(() => {
    if (user) getProperty();
  }, [user]);

  useEffect(() => {
    console.log(tenants);
  }, [tenants]);

  return (
    <div className="p-6 md:p-10 lg:p-14">
      <div className="flex flex-col items-center">
        {property ? (
          <div>
            <img src={property.picture} alt="" />
            <div className="flex w-full justify-between">
              <h1 className="text-lg font-semibold">{property.propertyName}</h1>
              <p
                className={`
                ${property.cashFlow > 0 ? "text-green-500" : "text-red-500"}
                flex items-center text-lg
              `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  {property.cashFlow > 0 ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
                    />
                  )}
                </svg>
                ${property.cashFlow}
              </p>
            </div>
            <p>{property.address}</p>
            <p>Tenants:</p>
            {tenants ? tenants.map((t) => <p>{t.name}</p>) : <p>Error</p>}

            <button className="text-red-500" onClick={deleteProperty}>
              delete
            </button>
          </div>
        ) : (
          <h1>loading...</h1>
        )}
      </div>
    </div>
  );
}

Property.getLayout = Properties.getLayout;
