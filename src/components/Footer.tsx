export default function Footer() {
  return (
    <footer className="relative z-10 bg-black">
      <div className="mx-auto max-w-[1400px] px-6 md:px-20">
        <div className="border-t border-white/5 py-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <span className="font-display text-sm font-extrabold tracking-[0.2em] text-white uppercase">
                XSEN
              </span>
              <span className="text-[13px] text-white/30">
                Cinematic Visual Storytelling
              </span>
            </div>

<div className="flex flex-col items-center gap-2 md:items-end">
              <a
                href="https://instagram.com/itsjonathanxu"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[13px] font-medium tracking-[0.08em] text-white/50 uppercase transition-opacity duration-300 hover:opacity-50"
              >
                Instagram
              </a>
              <span className="text-[12px] text-white/20">
                &copy; {new Date().getFullYear()} XSEN
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
