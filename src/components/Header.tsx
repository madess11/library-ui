import { Link } from "react-router-dom";
import QuickSearchBar from "./QuickSearchBar";

export default function Header() {
  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-700 tracking-wide hover:text-blue-800 transition"
          aria-label="Aller à la page d'accueil"
        >
          Médiathèque
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-8 text-gray-700 text-base font-semibold">
          <Link
            to="/"
            className="relative group"
          >
            Accueil
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[2px] bg-blue-600"></span>
          </Link>
          <Link
            to="/search"
            className="relative group"
          >
            Recherche avancée
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[2px] bg-blue-600"></span>
          </Link>
        </nav>

        {/* Quick Search Bar */}
        <div className="w-full max-w-xs md:max-w-sm">
          <QuickSearchBar />
        </div>
      </div>
    </header>
  );
}
