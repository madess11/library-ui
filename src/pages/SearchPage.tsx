import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SearchPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const queryParts: string[] = [];

    if (title) queryParts.push(`title:${title}`);
    if (author) queryParts.push(`author:${author}`);
    if (subject) queryParts.push(`subject:${subject}`);
    if (year) queryParts.push(`first_publish_year:${year}`);

    const finalQuery = queryParts.join(" ");
    navigate(`/results?q=${encodeURIComponent(finalQuery)}`);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 md:p-10"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-8">
          Recherche avancée
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Titre</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Les Misérables"
                className="mt-1 w-full border rounded-xl px-4 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Auteur</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ex: Victor Hugo"
                className="mt-1 w-full border rounded-xl px-4 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Sujet</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex: Révolution française"
                className="mt-1 w-full border rounded-xl px-4 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Année de publication</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Ex: 1862"
                className="mt-1 w-full border rounded-xl px-4 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-sm"
            >
              Rechercher
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
