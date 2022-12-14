import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

const Home = () => {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Resuse</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="text-center">
        <div>
          <div className="mt-36 px-20">
            {/* Heading */}
            {!session ? (
              <div>
                <h1 className="px-18 mt-4 text-7xl font-bold text-gray-800">
                  Welcome to Donate
                </h1>
              </div>
            ) : (
              <div>
                <h1 className="mt-4 px-10 text-7xl font-bold text-gray-800">
                  Welcome to Reuse
                  <br />
                  {session?.user?.name}
                </h1>
              </div>
            )}
          </div>
          <div className="mt-10 flex justify-center">
            <p className="w-2/5 text-xl font-extralight text-gray-500">
              Reuse is a platform that allows you to donate your old items to
              people who need them. Items which are set active are available for
              Resuse. Items which are set inactive were previously donated.
            </p>
          </div>
          <div className="mt-10 flex justify-center gap-5">
            <Link
              className="rounded-lg border-2 bg-slate-700 py-2 px-4 text-white  hover:border-slate-700 hover:bg-white hover:text-slate-700 "
              href="/posts"
            >
              View Post
            </Link>

            <Link
              href="/posts"
              className="rounded-lg border-2 border-slate-700 py-2 px-4 hover:bg-slate-700 hover:text-white"
            >
              Add Post
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
