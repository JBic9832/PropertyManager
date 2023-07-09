import { UserContext } from "@/lib/context";
import { db } from "@/lib/firebase";
import axios from "axios";
import { collection, getDocs, query } from "firebase/firestore";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import MainApp from "..";

export default function Properties({}) {
  const { user } = useContext(UserContext);

  const [properties, setProperties] = useState();

  const getProperties = async () => {
    const res = await axios.get(`/api/${user.uid}/properties/properties`);
    setProperties(res.data.properties);
  };

  useEffect(() => {
    if (user) getProperties();
  }, [user]);

  return (
    <div>
      {properties ? (
        properties.map((property) => (
          <a key={property.id} href={`/app/properties/${property.id}`}>
            <div className="shadow-xl rounded-xl p-3">
              <img
                src={property.information.picture}
                alt=""
                className="w-[200px] sm:w-[800px]"
              />
              <h1 className="text-xl font-bold">
                {property.information.address}
              </h1>
              <p
                className={`font-semibold ${
                  property.information.cashFlow > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {property.information.cashFlow}
              </p>
            </div>
          </a>
        ))
      ) : (
        <p>Loading</p>
      )}
      <Link href="/app/properties/add-property">Add Property</Link>
    </div>
  );
}

Properties.getLayout = MainApp.getLayout;
