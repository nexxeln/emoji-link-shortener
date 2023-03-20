import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-black uppercase tracking-wider">spores</h1>
      <p className="text-xl font-semibold capitalize tracking-wide text-secondary">
        Looks like this link doesn&apos;t exist.
      </p>
      <div className="pt-6" />
      <Link
        href="/"
        className="underline decoration-secondary decoration-1 underline-offset-4 transition-colors hover:decoration-primary"
      >
        Go Back Home
      </Link>
    </div>
  );
}
