import { UserContext } from "@/lib/context";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Navbar({}) {
  const { user, username } = useContext(UserContext);
  const auth = getAuth();
  const router = useRouter();

  const signOut = () => {
    auth.signOut().then(() => {
      router.push("/");
    });
  };

  return (
    <nav className="flex justify-between items-center p-6 border-b-2">
      <h1 className="text-3xl font-bold">Landlords oasis</h1>
      <div className="flex gap-4">
        <Link href="/">home</Link>
        <Link href="/pricing">pricing</Link>
        {user ? (
          <button onClick={signOut}>sign out</button>
        ) : (
          <Link href="signin">sign in</Link>
        )}
        <Link href="/app" className={user ? "block" : "hidden"}>
          dashboard
        </Link>
        {user && (
          <h1 className={user ? "block" : "hidden w-0"}>
            {username ? username : user.email}
          </h1>
        )}
      </div>
    </nav>
  );
}
