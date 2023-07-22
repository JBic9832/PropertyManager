import Link from "next/link";
import MainApp from "..";
import { db } from "@/lib/firebase";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { UserContext } from "@/lib/context";

export default function Tenants({}) {
  const { user } = useContext(UserContext);

  const [tenants, setTenants] = useState();
  const [hoveringAdd, setHoveringAdd] = useState(false);

  const getTenats = async () => {
    let documents = [];
    try {
      const tenantsRef = query(collection(db, "users", user.uid, "tenants"));
      const snapshot = await getDocs(tenantsRef);
      snapshot.docs.map((doc) => {
        documents.push({ information: doc.data(), id: doc.id });
      });
    } catch (e) {
      console.error(e);
    }

    setTenants(documents);
  };

  useEffect(() => {
    if (user) getTenats();
  }, [user]);

  return (
    <div>
      <div>
        <h1>All Tenants</h1>
        {tenants ? (
          tenants.length > 0 ? (
            <table>
              <tr>
                <th>Address</th>
                <th>Cashflow</th>
              </tr>
            </table>
          ) : (
            <h1>It looks like you haven't added any tenants yet.</h1>
          )
        ) : (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
      </div>
      {/* Add tenant button */}
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
          <h1 className={`${hoveringAdd ? "block" : "hidden"}`}>Add Tenant</h1>
        </div>
      </Link>
    </div>
  );
}

Tenants.getLayout = MainApp.getLayout;
