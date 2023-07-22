import Link from "next/link";
import MobileDrawerOption from "./MobileDrawerOption";
import { UserContext } from "@/lib/context";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import MobileDrawerMenu from "./MobileDrawerMenu";
import DashboardDrawerMenu from "./DashboardDrawerMenu";
import DefaultDrawerMenu from "./DefaultDrawerMenu";

export default function MobileDrawer({ isMenuOpen, changeMenuState }) {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => changeMenuState(false)}
        className={`${
          isMenuOpen ? "block" : "hidden"
        } fixed left-0 top-0 bottom-0 h-[100dvh] w-full bg-black/[0.6]`}
      ></div>
      {router.pathname.startsWith("/app") ? (
        <DashboardDrawerMenu isMenuOpen={isMenuOpen} />
      ) : (
        <DefaultDrawerMenu isMenuOpen={isMenuOpen} />
      )}
    </>
  );
}
