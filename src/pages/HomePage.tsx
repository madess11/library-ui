import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="max-w-6xl mx-auto px-6 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight"
      >
        Dernières modifications de livres
      </motion.h1>

      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500"
        >
          Chargement des données...
        </motion.p>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500"
        >
          {error}
        </motion.p>
      )}

      {!loading && !error && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {changes.map((change) => {
            const workKey = change.changes?.find((c) =>
              c.key.startsWith("/works/")
            )?.key;
            const workId = workKey?.split("/").pop();

            return (
              <motion.div
                key={change.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  to={workId ? `/book/${workId}` : "#"}
                  className={`block rounded-xl border bg-white hover:shadow-xl transition-all duration-300 p-5 ${
                    workId ? "cursor-pointer" : "opacity-50 pointer-events-none"
                  }`}
                >
                  <p className="text-sm text-gray-500 mb-1">
                    {new Date(change.timestamp).toLocaleString("fr-FR")}
                  </p>
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {change.comment || "Modification sans commentaire"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Type : {change.kind}</p>
                  {workId && (
                    <p className="text-sm text-blue-600 mt-3 underline">
                      Voir les détails du livre
                    </p>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
