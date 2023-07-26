import DashboardLayout from "@/components/DashboardLayout";
import PropertyCard from "@/components/PropertyCard";
import { UserContext } from "@/lib/context";
import { db } from "@/lib/firebase";
import { getPropertiesHelper, getTenantsHelper } from "@/lib/utilities";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function MainApp() {
  const { user } = useContext(UserContext);
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);

  const getProperties = async () => {
    const properties = await getPropertiesHelper(db, user.uid);

    setProperties(properties);
  };

  const getTenants = async () => {
    const tenants = await getTenantsHelper(db, user.uid);

    setTenants(tenants);
  };

  useEffect(() => {
    if (user) {
      getProperties();
      getTenants();
    }
  }, [user]);
  return (
    <div className="flex flex-col gap-6 p-6 md:p-10 lg:p-14">
      {user ? (
        <>
          <div className="flex flex-col gap-4">
            <Link href="/app/properties" className="flex items-center gap-1">
              Properties{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </Link>
            {properties.map((property) => (
              <PropertyCard
                picture={property.information.picture}
                propertyName={property.information.propertyName}
                address={property.information.address}
                cashFlow={property.information.cashFlow}
                id={property.id}
                key={property.id}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/app/tenants" className="flex items-center gap-1">
              Tenants
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </Link>
            {tenants.map((tenant) => (
              <div
                className="flex justify-between p-2 md:p-4 lg:p-6 shadow-md"
                key={tenant.id}
              >
                <div>
                  <h1>{tenant.information.name}</h1>
                  <p>{tenant.information.email}</p>
                  <p>{tenant.information.residentOf}</p>
                </div>
                <button
                  onClick={() => deleteTenant(tenant.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Link href="signin">
          Please <span className="text-sky-500 underline">sign in</span>.
        </Link>
      )}
    </div>
  );
}

MainApp.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
