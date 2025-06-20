import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <div className="p-4 border rounded bg-gray-50">
        <p dangerouslySetInnerHTML={{ __html: `Search query: ${query}` }} />
        <p className="mt-2 text-sm text-gray-600">
          Hasil pencarian akan ditampilkan di sini
        </p>
      </div>
    </div>
  );
};

export default SearchPage;
