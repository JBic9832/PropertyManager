import { UserContext } from "@/lib/context";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Link from "next/link";
import { useContext, useState } from "react";
import Properties from ".";

export default function AddProperty() {
  const { user } = useContext(UserContext);

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
    if (leaseFile) {
      const storageRef = ref(storage, `/files/${leaseFile.name}`);

      const uploadTask = uploadBytesResumable(storageRef, leaseFile);

      await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        leaseFileServerLocation = url.toString();
      });
    }

    if (picture) {
      console.log("Starting picture upload");
      const storageRef = ref(storage, `/files/${picture.name}`);
      await uploadBytesResumable(storageRef, picture);

      const url = await getDownloadURL(storageRef);
      console.log("Got download url", url.toString()); // This properly logs out the necessary download url
      pictureServerLocation = url.toString();
    }
    const usersRef = collection(db, "users", user.uid, "properties");
    console.log("Creating the doc");
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
    });
    if (response) setLoading(false);
  };

  if (loading) {
    return (
      <div>
        <h1 className="font-bold text-3xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Link href="/app/properties">{"<"} Back</Link>
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
      <button onClick={submitProperty}>Submit</button>
    </div>
  );
}

AddProperty.getLayout = Properties.getLayout;
