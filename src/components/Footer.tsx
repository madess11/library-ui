export default function Footer() {
  return (
    <footer className="mt-10 border-t pt-6 pb-4 bg-gray-50 text-center text-sm text-gray-500">
      <div className="max-w-6xl mx-auto px-4">
        <p>© {new Date().getFullYear()} Médiathèque de la ville. Tous droits réservés.</p>
        <p>
          Données fournies par <a href="https://openlibrary.org" target="_blank" className="text-blue-600 hover:underline">Open Library</a>
        </p>
      </div>
    </footer>
  );
}
