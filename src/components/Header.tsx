import { Link } from "react-router-dom";
import QuickSearchBar from "./QuickSearchBar";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-blue-700 tracking-tight">
          Médiathèque
        </Link>

        <nav className="flex gap-6 text-gray-600 text-sm font-medium">
          <Link to="/" className="hover:text-blue-600">Accueil</Link>
          <Link to="/search" className="hover:text-blue-600">Recherche avancée</Link>
        </nav>

        <QuickSearchBar />
      </div>
    </header>
  );
}
