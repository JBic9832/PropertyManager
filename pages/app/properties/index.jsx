import { UserContext } from "@/lib/context";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import MainApp from "..";
import PropertyCard from "@/components/PropertyCard";
import { getPropertiesHelper } from "@/lib/utilities";

export default function Properties({}) {
  const { user } = useContext(UserContext);

  const [properties, setProperties] = useState([]);
  const [hoveringAdd, setHoveringAdd] = useState(false);

  const getProperties = async () => {
    const properties = await getPropertiesHelper(db, user.uid);

    setProperties(properties);
  };

  useEffect(() => {
    if (user) getProperties();
  }, [user]);

  return (
    <div className="p-6 md:p-10 lg:p-14">
      <div className="flex flex-col gap-4">
        <h1 className="mb-3 md:mb-6 lg:mb-10">All Properties</h1>
        {properties ? (
          properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard
                picture={property.information.picture}
                propertyName={property.information.propertyName}
                address={property.information.address}
                cashFlow={property.information.cashFlow}
                id={property.id}
                key={property.id}
              />
            ))
          ) : (
            <h1>It looks like you haven't added any properties yet.</h1>
          )
        ) : (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
      </div>
      {/* Add property button */}
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
