import { UserContext } from "@/lib/context";
import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import MainApp from "..";

export default function Properties({}) {
  const { user } = useContext(UserContext);

  const [properties, setProperties] = useState();
  const [hoveringAdd, setHoveringAdd] = useState(false);

  const getProperties = async () => {
    let documents = [];
    const propertiesRef = query(
      collection(db, "users", user.uid, "properties")
    );
    const snapshot = await getDocs(propertiesRef);
    snapshot.docs.map((doc) => {
      documents.push({ information: doc.data(), id: doc.id });
    });

    setProperties(documents);
  };

  useEffect(() => {
    if (user) getProperties();
  }, [user]);

  return (
    <div>
      <div>
        <h1>All Properties</h1>
        {properties ? (
          properties.length > 0 ? (
            <table>
              <tr>
                <th>Address</th>
                <th>Cashflow</th>
              </tr>
            </table>
          ) : (
            <h1>It looks like you haven't added any properties yet.</h1>
          )
        ) : (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
      </div>
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
