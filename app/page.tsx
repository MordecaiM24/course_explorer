import Image from "next/image";
import { ModeToggle } from "./components/ModeToggle";

export default function Home() {
  return (
    <div className="flex min-h-screen min-w-full flex-col items-start justify-between p-8 pb-12 font-[family-name:var(--font-geist-sans)] sm:p-16">
      <div className="flex min-w-full flex-col items-start justify-between gap-y-4">
        <p>Welcome to the course explorer</p>
        <p> This is what a course will look like </p>
        <div className="rounded-md bg-gray-200 px-8 py-4 text-black">
          CSC 116
        </div>
      </div>

      <footer className="flex flex-col flex-wrap items-start justify-center gap-2 text-sm">
        <p>Made by Mordecai Mengesteab</p>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://m16b.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          See more stuff!
        </a>
      </footer>
      <div className="absolute right-12 top-12">
        <ModeToggle />
      </div>
    </div>
  );
}
