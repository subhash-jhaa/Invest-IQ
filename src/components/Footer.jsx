import { FaGithub } from "react-icons/fa";
import { MdMail, MdBugReport } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-white p-2 sm:p-4">
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 bg-blur-3xl backdrop-blur-3xl rounded-lg px-3 sm:px-4 py-3 sm:py-4">
        {/* Logo Section */}
        <div className="flex flex-col gap-1">
          <div className="transition-transform duration-200 text-center sm:text-left">
            <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Invest-IQ
            </span>
            <p className="text-[10px] sm:text-xs md:text-sm font-light text-gray-600">
              Made with ❤️ by{" "}
              <a
                href="https://my-investiq.vercel.app"
                className="underline hover:text-emerald-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subhash Jha
              </a>
            </p>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500 max-w-xs">
            Invest-IQ offers AI-based insights. Not investment advice.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          {/* Github Link */}
          <div className="relative group">
            <a
              href="https://github.com/subhash-jhaa/Invest-IQ"
              className="text-gray-600 hover:text-emerald-500 transition-colors p-2"
            >
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-xs sm:text-sm whitespace-nowrap">
              Github
            </span>
          </div>

          {/* Mail Link */}
          <div className="relative group">
            <a
              href="mailto:subhashkumarjha162@gmail.com"
              className="text-gray-600 hover:text-emerald-500 transition-colors p-2"
            >
              <MdMail className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-xs sm:text-sm whitespace-nowrap">
              Mail
            </span>
          </div>

          {/* Bug Report Button */}
          <div className="relative group">
            <button className="bg-emerald-50 text-emerald-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-emerald-100 hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-1 sm:gap-2">
              <MdBugReport className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm whitespace-nowrap">
                {typeof window !== "undefined" && window.innerWidth < 640 ? "Bug" : "Report Bug"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
