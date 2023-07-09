import Link from "next/link";
import Tenants from ".";

export default function AddTenant() {
  return (
    <div>
      <Link href="/app/tenants">{"<"} Back</Link>
      <h1>Add Tenant Screen</h1>
    </div>
  );
}

AddTenant.getLayout = Tenants.getLayout;
