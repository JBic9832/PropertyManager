import Button from "@/components/Button";
import { UserContext } from "@/lib/context";
import { db, googleAuthProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
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
    if (user && username) {
      router.push("/app");
    }
  }, [user, username]);

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
            <div className="flex flex-col items-center justify-center h-[100dvh]">
              <SignInButton auth={auth} />
              <h1 className="text-sm mt-4">
                Note: other sign in methods coming shortly.
              </h1>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

const SignInButton = ({ auth }) => {
  const [hasAccount, setHasAccount] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  const createNewUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (e) {
      setError(e.message);
    }
  };

  const manualSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div>
      {hasAccount ? (
        <div className="flex flex-col gap-2 mb-6">
          <h1>
            Sign in to your account.{" "}
            <span
              onClick={() => setHasAccount(false)}
              className="text-sky-500 underline hover:cursor-pointer"
            >
              I don't have one
            </span>
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <div className="flex justify-center">
            <button onClick={manualSignIn} className="bg-sky-500 w-[50%] p-2">
              Sign in
            </button>
          </div>
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mb-6">
          <h1>
            Create a new account.{" "}
            <span
              onClick={() => setHasAccount(true)}
              className="text-sky-500 underline hover:cursor-pointer"
            >
              I already have one
            </span>
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <div className="flex justify-center">
            <button onClick={createNewUser} className="bg-sky-500 w-[50%] p-2">
              Sign up
            </button>
          </div>
          <p className="text-red-500">{error}</p>
        </div>
      )}
      <div className="flex justify-center">
        <button
          onClick={signInWithGoogle}
          className="flex items-center shadow-md p-3"
        >
          <img
            className="w-9 h-9"
            src="/img/google_icon.svg"
            alt="google icon"
          />
          <h1>Sign in with Google.</h1>
        </button>
      </div>
    </div>
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
    router.push("/app");
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
