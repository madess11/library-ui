import { useEffect, useState } from "react";
import { fetchRecentChanges } from "../services/openLibrary";
import { Link } from "react-router-dom";
import type { Change } from "../types/openlibrary";

export default function RecentChangesList() {
  const [changes, setChanges] = useState<Change[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const LIMIT = 9;

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    try {
      const newChanges = await fetchRecentChanges(LIMIT, offset);
      setChanges((prev) => [...prev, ...newChanges]);
      setOffset((prev) => prev + LIMIT);
    } catch {
      setError("Erreur lors du chargement des données.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Modifications récentes</h2>

      {error && <p className="text-red-500">{error}</p>}

      {loading && <p className="text-gray-500">Chargement...</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {changes.map((change) => (
          <li key={change.id} className="bg-white rounded-xl p-4 shadow hover:shadow-md transition">
            <Link to={`/book${change.data?.key}`} className="block">
              <h3 className="font-bold text-blue-600 text-lg truncate">{change.data?.title}</h3>
              <p className="text-sm text-gray-500">{new Date(change.timestamp).toLocaleString()}</p>
              <p className="text-sm text-gray-700 mt-1">{change.comment || "Aucune description"}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="text-center">
        <button
          onClick={loadMore}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Charger plus
        </button>
      </div>
    </div>
  );
}
