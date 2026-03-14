import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A] bg-black">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row md:px-20">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="text-sm font-medium tracking-[0.2em] text-white uppercase">
            XSEN
          </span>
          <span className="text-[13px] text-[#8A8A8A]">
            Cinematic Visual Storytelling
          </span>
        </div>

        <div className="flex items-center gap-8">
          <Link
            href="/work"
            className="text-[13px] tracking-[0.05em] text-[#8A8A8A] uppercase transition-colors hover:text-white"
          >
            Work
          </Link>
          <Link
            href="/about"
            className="text-[13px] tracking-[0.05em] text-[#8A8A8A] uppercase transition-colors hover:text-white"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-[13px] tracking-[0.05em] text-[#8A8A8A] uppercase transition-colors hover:text-white"
          >
            Contact
          </Link>
        </div>

        <div className="flex flex-col items-center gap-2 md:items-end">
          <a
            href="https://instagram.com/itsjonathanxu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] tracking-[0.05em] text-[#8A8A8A] transition-colors hover:text-white"
          >
            Instagram
          </a>
          <span className="text-[12px] text-[#8A8A8A]/60">
            &copy; {new Date().getFullYear()} XSEN
          </span>
        </div>
      </div>
    </footer>
  );
}
