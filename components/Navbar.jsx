import { UserContext } from "@/lib/context";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import MobileDrawer from "./MobileDrawer";

export default function Navbar({}) {
  const { user, username } = useContext(UserContext);
  const auth = getAuth();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const signOut = () => {
    auth.signOut().then(() => {
      router.push("/");
    });
  };

  return (
    <nav className="flex justify-between items-center p-6 border-b-2 lg:sticky lg:top-0 bg-white">
      <h1 className="text-3xl font-bold">Property Manager</h1>
      <div className="gap-4 hidden sm:flex">
        <Link href="/">Home</Link>
        <Link href="/pricing">Pricing</Link>
        {
          user ? (
            <>
              <Link href="/app">Dashboard</Link>
              <button onClick={signOut}>Sign out</button>
              <h1 className={user ? "block" : "hidden w-0"}>
                {username ? username : user.email}
              </h1>
            </>
          ) : (
            <Link href="/signin">Sign in</Link>
          )
          // : (
          //   user && (
          //     <>
          //       <h1 className={user ? "block" : "hidden w-0"}>
          //         {username ? username : user.email}
          //       </h1>
          //     </>
          //   )
          // )
        }
      </div>
      <div
        className={`${isMenuOpen ? "hidden" : "block"} sm:hidden`}
        onClick={() => setIsMenuOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <MobileDrawer isMenuOpen={isMenuOpen} changeMenuState={setIsMenuOpen} />
    </nav>
  );
}
