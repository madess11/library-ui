import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

type Book = {
  key: string; // e.g. "/works/OL123W"
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
};

export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.trim() === "") return;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
        );
        const data = await res.json();
        setBooks(data.docs || []);
      } catch (err) {
        setError("Erreur lors du chargement des résultats.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Résultats pour “{query}”</h1>

      {loading && <p className="text-gray-500">Chargement en cours...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && books.length === 0 && (
        <p className="text-gray-700">Aucun résultat trouvé.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => {
          const workId = book.key?.split("/").pop(); // extrait "OL123W"
          return (
            <Link
              to={`/book/${workId}`}
              key={book.key}
              className="bg-white rounded-xl shadow p-4 hover:shadow-md transition cursor-pointer block"
            >
              <div className="aspect-[2/3] w-full bg-gray-100 mb-4 flex items-center justify-center overflow-hidden rounded">
                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">Pas de couverture</div>
                )}
              </div>
              <h2 className="font-semibold text-lg text-gray-800 truncate">{book.title}</h2>
              <p className="text-gray-600 text-sm">
                {book.author_name?.join(", ") || "Auteur inconnu"}
              </p>
              <p className="text-gray-500 text-sm">
                {book.first_publish_year ? `Publié en ${book.first_publish_year}` : ""}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
