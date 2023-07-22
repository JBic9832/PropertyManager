import { useContext } from "react";
import MobileDrawerMenu from "./MobileDrawerMenu";
import MobileDrawerOption from "./MobileDrawerOption";
import { UserContext } from "@/lib/context";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";

export default function DashboardDrawerMenu({ isMenuOpen, changeMenuState }) {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.push("/");
  };
  return (
    <MobileDrawerMenu isMenuOpen={isMenuOpen} changeMenuState={changeMenuState}>
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
