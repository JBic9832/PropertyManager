import Link from "next/link";
import MainApp from "..";

export default function Tenants({}) {
  return (
    <div>
      <Link href="/app/tenants/add-tenant">Add Tenant</Link>
    </div>
  );
}

Tenants.getLayout = MainApp.getLayout;
