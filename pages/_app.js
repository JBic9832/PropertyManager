import DashboardLayout from "@/components/DashboardLayout";
import Navbar from "@/components/Navbar";
import { UserContext } from "@/lib/context";
import { useUserData } from "@/lib/hooks";
import "@/styles/globals.css";

export default function App({ Component, pageProps, router }) {
  const userData = useUserData();
  const getLayout = Component.getLayout || ((page) => page);

  // if (router.pathname.startsWith("/app")) {
  //   return (
  //     <div className="p-3">
  //       <UserContext.Provider value={userData}>
  //         <Navbar />
  //         <div className="flex flex-col items-center justify-center h-screen">
  //           <DashboardLayout>
  //             <Component {...pageProps} />
  //           </DashboardLayout>
  //         </div>
  //       </UserContext.Provider>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="p-3">
  //     <UserContext.Provider value={userData}>
  //       <Navbar />
  //       <div className="flex flex-col items-center justify-center h-screen">
  //         <Component {...pageProps} />
  //       </div>
  //     </UserContext.Provider>
  //   </div>
  // );

  return getLayout(
    <>
      <div>
        <UserContext.Provider value={userData}>
          <Navbar />
          <div className="flex flex-col items-center justify-center h-screen">
            <Component {...pageProps} />
          </div>
        </UserContext.Provider>
      </div>
    </>
  );
}
