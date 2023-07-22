import { useContext } from "react";
import MobileDrawerMenu from "./MobileDrawerMenu";
import MobileDrawerOption from "./MobileDrawerOption";
import { UserContext } from "@/lib/context";
import { signOut } from "firebase/auth";

export default function DashboardDrawerMenu({ isMenuOpen }) {
  const { user, username } = useContext(UserContext);
  return (
    <MobileDrawerMenu isMenuOpen={isMenuOpen}>
      <MobileDrawerOption href="/app" text="Dashboard" />
      <MobileDrawerOption href="/app/properties" text="Properties" />
      <MobileDrawerOption href="/app/tenants" text="Tenants" />
      <MobileDrawerOption href="/" text="Home" />
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
