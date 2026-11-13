import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="font-display text-2xl font-extrabold text-white">Page not found</h1>
        <Link
          href="/work"
          className="font-display mt-4 inline-block text-[12px] font-bold tracking-[0.15em] text-white/40 uppercase transition-colors hover:text-white"
        >
          &larr; Back to Work
        </Link>
      </div>
    </section>
  );
}
