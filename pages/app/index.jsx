import DashboardLayout from "@/components/DashboardLayout";
import { UserContext } from "@/lib/context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function MainApp() {
  const { user } = useContext(UserContext);
  return (
    <div className="flex flex-col items-center">
      {user ? (
        <>
          <h1 className="text-red-500 text-center text-3xl font-bold">
            THIS SHOULD DISPLAY INFORMATION ABOUT BOTH TENANTS AND PROPERTIES
            WITH THE ABILITY TO VIEW MORE SPECIFIC INFO. DON'T FUCKING FORGET.
            HERE ARE SOME QUICK LINKS LAZY BASTARD:
          </h1>
          <Link href="/app/properties">Properties</Link>
          <Link href="/app/tenants">Tenants</Link>
        </>
      ) : (
        <Link href="signin">
          Please <span className="text-sky-500 underline">sign in</span>.
        </Link>
      )}
    </div>
  );
}

MainApp.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
