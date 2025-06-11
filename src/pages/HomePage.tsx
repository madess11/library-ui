import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Change = {
  id: string;
  kind: string;
  timestamp: string;
  comment?: string;
  changes?: { key: string }[];
};

export default function HomePage() {
  const [changes, setChanges] = useState<Change[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const LIMIT = 9;

  useEffect(() => {
    const fetchRecentEdits = async () => {
      try {
        const res = await fetch(
          `https://openlibrary.org/recentchanges/edit-book.json?limit=${LIMIT}&bot=false`
        );
        const data = await res.json();

        // Ne garde que les changements ayant une clé de type "/works/..."
        const filtered = data.filter((item: Change) =>
          item.changes?.some((change) => change.key.startsWith("/works/"))
        );

        setChanges(filtered);
      } catch (err) {
        setError("Impossible de charger les changements récents.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEdits();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Dernières modifications de livres
      </h1>

      {loading && <p className="text-gray-500">Chargement des données...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {changes.map((change) => {
          const workKey = change.changes?.find(c => c.key.startsWith("/works/"))?.key;
          const workId = workKey?.split("/").pop();

          return (
            <Link
              to={workId ? `/book/${workId}` : "#"}
              key={change.id}
              className={`border rounded-lg p-4 shadow hover:shadow-md transition ${
                workId ? "cursor-pointer" : "opacity-50 pointer-events-none"
              }`}
            >
              <p className="text-sm text-gray-500 mb-1">
                {new Date(change.timestamp).toLocaleString("fr-FR")}
              </p>
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {change.comment || "Modification sans commentaire"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">Type : {change.kind}</p>
              {workId && (
                <p className="text-blue-600 text-sm mt-2 underline">
                  Voir le livre
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
