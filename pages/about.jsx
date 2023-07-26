import Head from "next/head";

export default function Pricing({}) {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <main className="px-6 md:px-16 lg:px-24 mt-6 sm:mt-16">
        <h1 className="text-3xl font-extrabold mb-4">
          This is a software for tracking properties and tenants.
        </h1>
        <p>
          This is a side project started by{" "}
          <a
            className="text-sky-500 underline"
            href="https://josephbickford.com"
          >
            Joseph Bickford
          </a>{" "}
          as a display of knowledge in technologies such as NextJS and Firebase.
          For authentication I have used Firebase auth and for storage I have
          used Storage Bucket and Cloud Firestore. There are also cloud
          functions running for addition of new users. My purpose was to not
          only make an app that could challenge me but also something that
          people could use. This app still has many features that it needs but I
          hope it can have some kind of impact in the future.
        </p>
      </main>
    </>
  );
}
