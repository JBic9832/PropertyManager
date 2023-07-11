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
  const [hoveringAdd, setHoveringAdd] = useState(false);

  const getProperties = async () => {
    const res = await axios.get(`/api/${user.uid}/properties`);
    setProperties(res.data.properties);
  };

  useEffect(() => {
    if (user) getProperties();
  }, [user]);

  return (
    <div>
      {properties ? (
        properties.length > 0 ? (
          properties.map((property) => (
            <a key={property.id} href={`/app/properties/${property.id}`}>
              <div
                className="w-[200px] sm:w-[800px] 
            flex flex-col items-center shadow-xl 
            rounded-xl overflow-hidden"
              >
                <img
                  src={property.information.picture}
                  alt=""
                  className="object-contain"
                />
                <div className="self-start p-4">
                  <h1 className="text-xl font-bold">
                    {property.information.address}
                  </h1>
                  <p className="font-semibold">
                    Current Cashflow:{" "}
                    <span
                      className={`font-semibold ${
                        property.information.cashFlow > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {property.information.cashFlow}
                    </span>
                  </p>
                </div>
              </div>
            </a>
          ))
        ) : (
          <div>
            <h1>Looks like you have no properties added.</h1>
          </div>
        )
      ) : (
        <p>Loading</p>
      )}
      <Link href="/app/properties/add-property">
        <div
          onMouseEnter={() => setHoveringAdd(true)}
          onMouseLeave={() => setHoveringAdd(false)}
          className="transition ease-in-out delay-150 flex items-center bg-sky-500 text-white p-4 rounded-full fixed right-4 bottom-4 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <h1 className={`${hoveringAdd ? "block" : "hidden"}`}>
            Add property
          </h1>
        </div>
      </Link>
    </div>
  );
}

Properties.getLayout = MainApp.getLayout;
