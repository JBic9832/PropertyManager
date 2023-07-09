import { UserContext } from "@/lib/context";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Properties from ".";

export default function Property() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const { propertyID } = router.query;

  const [property, setProperty] = useState();

  const getProperty = async () => {
    const res = await axios.get(`/api/${user.uid}/properties/${propertyID}`);
    setProperty(res.data.property);
  };

  const deleteProperty = async () => {
    const res = await axios.delete(`/api/${user.uid}/properties/${propertyID}`);
    router.push("/app/properties");
  };

  useEffect(() => {
    if (user) getProperty();
  }, [user]);

  return (
    <div>
      <div>
        {property ? (
          <div>
            <h1>{property.propertyName}</h1>
            <button
              className="bg-red-500 p-3 rounded-md"
              onClick={deleteProperty}
            >
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
