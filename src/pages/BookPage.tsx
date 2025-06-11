import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Book = {
  title: string;
  description?: string | { value: string };
  covers?: number[];
  subjects?: string[];
  authors?: { author: { key: string } }[];
};

type Author = {
  name: string;
};

export default function BookPage() {
  const {  id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [authorNames, setAuthorNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wikiSummary, setWikiSummary] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!res.ok) throw new Error("Livre non trouvé");
        const data: Book = await res.json();
        setBook(data);

        // Fetch author names
        if (data.authors) {
          const authorNamesPromises = data.authors.map(async (a) => {
            const res = await fetch(`https://openlibrary.org${a.author.key}.json`);
            const json: Author = await res.json();
            return json.name;
          });
          const names = await Promise.all(authorNamesPromises);
          setAuthorNames(names);
        }

        // Fetch Wikipedia summary
        const wikiRes = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(data.title)}`
        );
        if (wikiRes.ok) {
          const wikiData = await wikiRes.json();
          if (wikiData.extract) {
            setWikiSummary(wikiData.extract);
          }
        }
      } catch (err) {
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <div className="p-6 text-gray-600">Chargement en cours...</div>;
  if (error || !book) return <div className="p-6 text-red-600">{error}</div>;

  const getDescription = () =>
    typeof book.description === "string"
      ? book.description
      : book.description?.value ?? "Aucune description disponible.";

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {book.covers?.[0] ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
            alt={book.title}
            className="w-full max-w-xs rounded-lg shadow"
          />
        ) : (
          <div className="w-full max-w-xs h-80 bg-gray-100 rounded flex items-center justify-center text-gray-400">
            Pas de couverture
          </div>
        )}

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>

          {authorNames.length > 0 && (
            <p className="text-gray-700">
              <span className="font-medium">Auteur(s) :</span> {authorNames.join(", ")}
            </p>
          )}

          {book.subjects && (
            <p className="text-gray-600">
              <span className="font-medium">Sujets :</span> {book.subjects.slice(0, 5).join(", ")}
            </p>
          )}

          <p className="text-gray-800 leading-relaxed">{getDescription()}</p>

          {wikiSummary && (
            <div className="mt-4 border-t pt-4">
              <h2 className="text-lg font-semibold">Résumé Wikipedia</h2>
              <p className="text-gray-700">{wikiSummary}</p>
              <a
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(book.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                Voir sur Wikipedia
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
