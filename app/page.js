"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <main>
      {session ? (
        <>
          <User session={session} />
        </>
      ) : (
        <Guest session={session} />
      )}
    </main>
  );
}

function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h1 className="text-4xl font-bold">Guest Homepage</h1>
      <div className="flex justify-center">
        <Link
          href={"/login"}
          className="mt-5 px-10 py-1 font-bold rounded-sm bg-indigo-500 text-gray-50"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}

function User({ session }) {
  if (session) {
    toast.success("Successfully registered", {
      draggable: true,
      draggableDirection: "x",
    });
  }
  return (
    <main className="container mx-auto text-center py-20">
      <h1 className="text-4xl font-bold">Authorize User Homepage</h1>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
        <h5>{session.user.image}</h5>
        <h5>{session.expires}</h5>
      </div>

      <div>
        <button
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          onClick={() =>
            signOut("google", { callbackUrl: "http://localhost:3000" })
          }
        >
          Log Out
        </button>
      </div>
    </main>
  );
}
