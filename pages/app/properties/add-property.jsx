import { UserContext } from "@/lib/context";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Link from "next/link";
import { useContext, useState } from "react";
import Properties from ".";
import { useRouter } from "next/router";

export default function AddProperty() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [propertyName, setPropertyName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [zipcode, setZipcode] = useState();
  const [mortgage, setMortgage] = useState();
  const [rentalIncome, setRentalIncome] = useState();
  const [propertyTax, setPropertyTax] = useState();
  const [vacancy, setVacancy] = useState(false);

  const [leaseFile, setLeaseFile] = useState("");
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);

  const submitProperty = async () => {
    let cashFlow = 0;
    let pictureServerLocation = "";
    let leaseFileServerLocation = "";
    setLoading(true);

    // Put the lease file in the storage bucket
    if (leaseFile) {
      const storageRef = ref(storage, `/files/${leaseFile.name}`);

      const uploadTask = uploadBytesResumable(storageRef, leaseFile);

      await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        leaseFileServerLocation = url.toString();
      });
    }

    // Put the picture in the storage bucket
    if (picture) {
      console.log("Starting picture upload");
      const storageRef = ref(storage, `/files/${picture.name}`);
      await uploadBytesResumable(storageRef, picture);

      const url = await getDownloadURL(storageRef);
      pictureServerLocation = url.toString();
    }
    const usersRef = collection(db, "users", user.uid, "properties");

    cashFlow = rentalIncome - mortgage - propertyTax;

    const response = await addDoc(usersRef, {
      propertyName: propertyName,
      address: address,
      city: city,
      zipcode: Number(zipcode),
      mortgage: Number(mortgage),
      rentalIncome: Number(rentalIncome),
      vacancy: vacancy,
      propertyTax: Number(propertyTax),
      lease: leaseFileServerLocation,
      picture: pictureServerLocation, // this is the final upload
      cashFlow,
      dateAdded: new Date(),
    });
    if (response) {
      setLoading(false);
      router.back();
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="font-bold text-3xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center p-6 md:p-10 lg:p-14">
      <input
        type="file"
        placeholder="Picture"
        onChange={(e) => setPicture(e.target.files[0])}
        accept="image/*"
      />
      <input
        type="text"
        placeholder="Property Name"
        onChange={(e) => setPropertyName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Zip Code"
        onChange={(e) => setZipcode(e.target.value)}
      />
      <input
        type="number"
        placeholder="Mortgage"
        onChange={(e) => setMortgage(e.target.value)}
      />
      <input
        type="number"
        placeholder="Monthly Rental Income"
        onChange={(e) => setRentalIncome(e.target.value)}
      />
      <input
        type="number"
        placeholder="Monthly Property Taxes"
        onChange={(e) => setPropertyTax(e.target.value)}
      />
      <input
        type="checkbox"
        placeholder="Vacant"
        onChange={(e) => setVacancy(e.target.value)}
      />
      <label htmlFor="lease">Copy of Lease</label>
      <input
        type="file"
        id="lease"
        onChange={(e) => setLeaseFile(e.target.files[0])}
      />
      <button onClick={submitProperty} className="mt-4">
        Submit
      </button>
      <Link className="text-red-400 mt-4" href="/app/properties">
        Cancel
      </Link>
    </div>
  );
}

AddProperty.getLayout = Properties.getLayout;
