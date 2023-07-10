import Button from "@/components/Button";
import { UserContext } from "@/lib/context";
import { db, googleAuthProvider } from "@/lib/firebase";
import { getAuth, signInWithRedirect } from "firebase/auth";
import { doc, getDoc, setDoc, writeBatch } from "firebase/firestore";
import { debounce } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";

// REMOVE UNIQUE USER NAMES

export default function SignIn() {
  const { user, username } = useContext(UserContext);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/app");
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <main>
        <div>
          {user ? (
            !username ? (
              <UsernameForm user={user} />
            ) : (
              <SignOutButton username={username} auth={auth} />
            )
          ) : (
            <SignInButton auth={auth} />
          )}
        </div>
      </main>
    </>
  );
}

const SignInButton = ({ auth }) => {
  const signIn = () => {
    signInWithRedirect(auth, googleAuthProvider);
  };
  return (
    <Button css="p-3" onClick={signIn}>
      Sign in
    </Button>
  );
};

const SignOutButton = ({ auth, username }) => {
  const signOut = () => {
    auth.signOut();
    username = null;
  };
  return (
    <Button css="p-3" onClick={signOut}>
      Sign out
    </Button>
  );
};

const UsernameForm = () => {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "users", user.uid);
    const usernameDoc = doc(db, "usernames", formValue);

    const batch = writeBatch(db);
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
    router.push("/dashboard");
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(db, "usernames", username);
        const docSnap = await getDoc(ref);
        console.log("Firestore read executed!");
        setIsValid(!docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="myname"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <Button type="submit" css="p-3" disabled={!isValid}>
            Choose
          </Button>
        </form>
      </section>
    )
  );
};

const UsernameMessage = ({ username, isValid, loading }) => {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-green-500">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-red-500">That username is taken!</p>;
  } else {
    return <p></p>;
  }
};
