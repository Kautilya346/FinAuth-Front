export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[#2d3e2e]/10 bg-[#d4d9c8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="flex justify-center mb-3">
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[#2d3e2e] to-[#1a2519]/70"></div>
        </div>
        <p className="text-[#2d3e2e] text-sm md:text-base">
          made by <span className="font-medium">Aditya Karanwal</span>
          <span className="mx-2">·</span>
          <span className="font-medium">Kautilya Srivastava</span>
          <span className="mx-2">·</span>
          <span className="font-medium">Shashwat Singh</span>
          <span className="mx-2">·</span>
          <span className="font-medium">Shailesh Nehra</span>
        </p>
        <p className="text-[#4a5a4a] text-xs md:text-sm mt-1">
          during Open Gateaway Hackathon x NOKIA x GSMA
        </p>
        <div className="inline-flex items-center gap-2 mt-3 bg-[#2d3e2e]/10 px-3 py-1.5 rounded-full border border-[#2d3e2e]/20 text-[#2d3e2e] text-xs">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>9th - 10th October</span>
        </div>

        <div className="flex justify-center mt-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="inline-flex items-center gap-2 text-[#2d3e2e] hover:text-[#1a2519] transition-colors px-3 py-1.5 rounded-full border border-[#2d3e2e]/10 bg-transparent"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.8 24 17.313 24 12 24 5.373 18.627 0 12 0z" />
            </svg>
            <span className="text-xs md:text-sm">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
