export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#d4d9c8]">
      {/* Main content */}
      <main className="px-6 py-20 max-w-5xl mx-auto">
        {/* Hero section */}
        <div className="text-center mb-24">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-[#2d3e2e]/5 text-[#2d3e2e] border border-[#2d3e2e]/10">
              <span className="w-2 h-2 bg-[#2d3e2e] rounded-full mr-2"></span>
              Secure Financial Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#2d3e2e] mb-4 tracking-tight">
            Welcome to
            <br />
            <span className="italic font-serif">FinAuth</span>
          </h1>

          <p className="text-lg md:text-xl text-[#4a5a4a] max-w-2xl mx-auto leading-relaxed mb-12">
            Next-generation financial authentication and onboarding platform
            with{" "}
            <span className="font-medium text-[#2d3e2e]">
              bank-grade security
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <button className="px-8 py-3 bg-[#2d3e2e] text-[#d4d9c8] rounded-full text-sm hover:bg-[#1a2519] transition-all">
              Sign In →
            </button>
            <button className="px-8 py-3 border border-[#2d3e2e] text-[#2d3e2e] rounded-full text-sm hover:bg-[#2d3e2e] hover:text-[#d4d9c8] transition-all">
              Create Account →
            </button>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#2d3e2e] rounded-xl flex items-center justify-center mb-5">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#2d3e2e] mb-3">
              Bank-Grade Security
            </h3>
            <p className="text-[#4a5a4a] text-sm leading-relaxed">
              Enterprise-level encryption and multi-factor authentication to
              protect your financial data
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#2d3e2e] rounded-xl flex items-center justify-center mb-5">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#2d3e2e] mb-3">
              Lightning Fast
            </h3>
            <p className="text-[#4a5a4a] text-sm leading-relaxed">
              Instant verification and real-time processing for seamless
              onboarding experience
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#2d3e2e] rounded-xl flex items-center justify-center mb-5">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#2d3e2e] mb-3">
              Global Reach
            </h3>
            <p className="text-[#4a5a4a] text-sm leading-relaxed">
              Support for 50+ countries with multi-currency transactions and
              local compliance
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
