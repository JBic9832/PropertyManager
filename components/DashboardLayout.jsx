import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const activeClass =
    "bg-black rounded-full text-white w-full p-4 text-left flex gap-6 items-center";
  const inactiveClass =
    "rounded-full w-full p-4 text-left flex gap-6 items-center";

  const [open, setOpen] = useState(true);
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div
        className={`${
          open ? "sm:flex" : "hidden"
        } sm:flex-col items-center justify-between fixed left-0 top-0 bottom-0 md:w-72 lg:w-96 p-6 bg-white shadow-xl z-[10000]`}
      >
        <h1 className="text-3xl font-bold">Landlord DB</h1>
        <div className="w-full">
          <Link
            href="/app/properties"
            className={
              router.pathname.startsWith("/app/properties")
                ? activeClass
                : inactiveClass
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
              />
            </svg>
            <p className="font-semibold">Properties</p>
          </Link>
          <Link
            href="/app/tenants"
            className={
              router.pathname.startsWith("/app/tenants")
                ? activeClass
                : inactiveClass
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <p className="font-semibold">Tenants</p>
          </Link>
        </div>
        <button className="sm:hidden" onClick={() => setOpen(false)}>
          Close
        </button>
        <span className="hidden sm:block"></span>
      </div>
      <div className="ml-96">
        <button className="sm:hidden" onClick={() => setOpen(true)}>
          Open
        </button>
        <main>{children}</main>
      </div>
    </div>
  );
}
