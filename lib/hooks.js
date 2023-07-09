import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "./firebase";

export function useUserData() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState();

  useEffect(() => {
    let unsubscribe;
    if (user) {
      const ref = doc(db, "users", user.uid);
      if (ref) {
        getDoc(ref).then((docSnap) => {
          if (docSnap.data()) setUsername(docSnap.data().username);
        });
      }
    }
    return unsubscribe;
  }, [user]);

  return { user, username };
}
