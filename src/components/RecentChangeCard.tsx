import type { Change } from "../types/openlibrary";

type Props = {
  change: Change;
};

export default function RecentChangeCard({ change }: Props) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">
        {change.data?.title ?? "Titre inconnu"}
      </h2>
      <p className="text-gray-600 text-sm mb-1">
        🧑 Auteur modification : {change.author?.key}
      </p>
      <p className="text-gray-600 text-sm mb-1">
        🕒 {new Date(change.timestamp).toLocaleString("fr-FR")}
      </p>
      <p className="text-gray-700 italic text-sm">
        💬 {change.comment || "Aucun commentaire"}
      </p>

      {change.data?.key && (
        <a
          href={`https://openlibrary.org${change.data.key}`}
          target="_blank"
          className="inline-block mt-3 text-blue-600 hover:underline text-sm font-medium"
        >
          Voir sur OpenLibrary →
        </a>
      )}
    </div>
  );
}
