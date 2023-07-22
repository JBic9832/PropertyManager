import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MainApp() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-red-500 text-center text-3xl font-bold">
          THIS SHOULD DISPLAY INFORMATION ABOUT BOTH TENANTS AND PROPERTIES WITH
          THE ABILITY TO VIEW MORE SPECIFIC INFO. DON'T FUCKING FORGET. HERE ARE
          SOME QUICK LINKS LAZY BASTARD:
        </h1>
        <Link href="/app/properties">Properties</Link>
        <Link href="/app/tenants">Tenants</Link>
      </div>
    </div>
  );
}

MainApp.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
