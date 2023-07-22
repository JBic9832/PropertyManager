import { useContext } from "react";
import MobileDrawerMenu from "./MobileDrawerMenu";
import MobileDrawerOption from "./MobileDrawerOption";
import { UserContext } from "@/lib/context";
import { signOut } from "firebase/auth";

export default function DefaultDrawerMenu({ isMenuOpen }) {
  const { user, username } = useContext(UserContext);
  return (
    <MobileDrawerMenu isMenuOpen={isMenuOpen}>
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
