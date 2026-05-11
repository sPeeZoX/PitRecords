import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-white/20 text-xs tracking-[0.5em] mb-6">PIT RECORDS</p>
      <h1 className="text-[clamp(6rem,20vw,18rem)] font-bold leading-none tracking-tighter text-white/10 mb-4">
        404
      </h1>
      <p className="text-white/40 text-sm tracking-[0.2em] mb-12">
        THIS PAGE DOESN&apos;T EXIST
      </p>
      <Link
        href="/"
        className="text-xs tracking-[0.3em] border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all duration-400"
      >
        RETURN HOME
      </Link>
    </div>
  );
}
