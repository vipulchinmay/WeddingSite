import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Welcome!</h1>
        <p>A new RSVP page has been created.</p>
        <Link href="/rsvp" className="text-blue-500 hover:underline">
          Go to RSVP page
        </Link>
      </div>
    </main>
  );
}