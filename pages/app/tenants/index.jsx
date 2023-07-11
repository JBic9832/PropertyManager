import Link from "next/link";
import MainApp from "..";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/lib/context";
import axios from "axios";

export default function Tenants({}) {
  const { user } = useContext(UserContext);

  const [tenants, setTenants] = useState();
  const [hoveringAdd, setHoveringAdd] = useState(false);

  const getTenants = async () => {
    const res = await axios.get(`/api/${user.uid}/tenants`);
    setTenants(res.data.tenants);
  };

  useEffect(() => {
    if (user) getTenants();
  }, [user]);

  return (
    <div>
      {/* Turnary hell */}
      {tenants ? (
        tenants.length > 0 ? (
          tenants.map((tenant) => (
            <a key={tenant.id} href={`/app/tenants/${tenant.id}`}>
              <h1>This is a tenant</h1>
            </a>
          ))
        ) : (
          <div>
            <h1>Looks like you have no tenants.</h1>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
      <Link href="/app/tenants/add-tenant">
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
          <h1 className={`${hoveringAdd ? "block" : "hidden"}`}>Add tenant</h1>
        </div>
      </Link>
    </div>
  );
}

Tenants.getLayout = MainApp.getLayout;
