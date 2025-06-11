import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
  const { id } = useParams();
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

        if (data.authors) {
          const names = await Promise.all(
            data.authors.map(async (a) => {
              const res = await fetch(`https://openlibrary.org${a.author.key}.json`);
              const json: Author = await res.json();
              return json.name;
            })
          );
          setAuthorNames(names);
        }

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

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Chargement des informations du livre...
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        {error || "Erreur inconnue"}
      </div>
    );
  }

  const getDescription = () =>
    typeof book.description === "string"
      ? book.description
      : book.description?.value ?? "Aucune description disponible.";

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-8 items-start"
      >
        <div className="w-full md:w-1/3 max-w-sm mx-auto md:mx-0">
          {book.covers?.[0] ? (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
              alt={book.title}
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          ) : (
            <div className="w-full h-[22rem] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
              Pas de couverture
            </div>
          )}
        </div>

        <div className="flex-1 space-y-5">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{book.title}</h1>

          {authorNames.length > 0 && (
            <p className="text-gray-700 text-lg">
              <span className="font-medium">Auteur(s) :</span> {authorNames.join(", ")}
            </p>
          )}

          {book.subjects && book.subjects.length > 0 && (
            <div>
              <p className="text-gray-600">
                <span className="font-medium">Sujets :</span>{" "}
                {book.subjects.slice(0, 6).join(", ")}
              </p>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold text-gray-800">Description</h2>
            <p className="text-gray-700 leading-relaxed">{getDescription()}</p>
          </div>

          {wikiSummary && (
            <div className="pt-4 mt-4 border-t">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Résumé Wikipedia</h2>
              <p className="text-gray-700">{wikiSummary}</p>
              <a
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(book.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm mt-1 inline-block"
              >
                Voir sur Wikipedia
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
