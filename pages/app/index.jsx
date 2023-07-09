import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function MainApp() {
  return (
    <div>
      <Link href="/app/properties">Properties</Link>
      <Link href="/app/tenants">Tenants</Link>
    </div>
  );
}

MainApp.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
