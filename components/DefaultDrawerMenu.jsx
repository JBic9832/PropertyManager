import { useContext } from "react";
import MobileDrawerMenu from "./MobileDrawerMenu";
import MobileDrawerOption from "./MobileDrawerOption";
import { UserContext } from "@/lib/context";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";

export default function DefaultDrawerMenu({ isMenuOpen, changeMenuState }) {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.push("/");
  };
  return (
    <MobileDrawerMenu isMenuOpen={isMenuOpen} changeMenuState={changeMenuState}>
      <MobileDrawerOption href="/" text="Home" />
      <MobileDrawerOption href="/pricing" text="Pricing" />
      <MobileDrawerOption
        href="/app"
        className={user ? "block" : "hidden"}
        text="Dashboard"
      />
      {user ? (
        <h1 className="w-full" onClick={signOut}>
          Sign out
        </h1>
      ) : (
        <MobileDrawerOption href="signin" text="Sign in" />
      )}
    </MobileDrawerMenu>
  );
}
