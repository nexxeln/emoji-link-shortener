import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-black uppercase tracking-wider">spores</h1>
      <p className="text-xl font-semibold tracking-wide text-secondary">
        A Different Link Shortener
      </p>
      <div className="pt-6" />
      <div className="flex gap-8 text-lg">
        <Link
          href="/emoji"
          className="underline decoration-secondary decoration-1 underline-offset-4 hover:decoration-primary"
        >
          Emoji
        </Link>
        <Link
          href="/sketchy"
          className="underline decoration-secondary decoration-1 underline-offset-4 hover:decoration-primary"
        >
          Sketchy
        </Link>
      </div>
    </div>
  );
}
