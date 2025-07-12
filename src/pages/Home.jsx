import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = parseInt(searchParams.get("page")) || 1;
  const name = searchParams.get("name") || "";
  const status = searchParams.get("status") || "";

  useEffect(() => {
    const fetchCharacters = async () => {
      const query = new URLSearchParams({ page, name, status }).toString();
      const res = await fetch(`https://rickandmortyapi.com/api/character?${query}`
      );
      if (res.ok) {
        const data = await res.json();
        setCharacters(data.results);
        setInfo(data.info);
      } else {
        setCharacters([]);
        setInfo({});
      }
    };

    fetchCharacters();
  }, [page, name, status]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    setSearchParams({
      name: form.name.value,
      status: form.status.value,
      page: 1,
    });
  };

  const totalPages = Math.min(5, info.pages || 1);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


  return (
    <main className="max-w-6xl mx-auto px-4">
    <h1 className="text-3xl font-bold my-4">Rick & Morty Explorer</h1>

    <form onSubmit={handleSearch} className="flex flex-wrap gap-4 mb-6">
      <input
        type="text"
        name="name"
        placeholder="Search by name"
        defaultValue={name}
        className="border rounded p-2 flex-1"
        />
        <select
          name="status"
          defaultValue={status}
          className="border rounded p-2"
        >
          <option value="">All Statuses</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-6">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      <div className="flex justify-center items-center my-6 gap-2 flex-wrap">
        <button
          disabled={page <= 1}
          onClick={() => setSearchParams({ name, status, page: page - 1 })}
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => setSearchParams({ name, status, page: p })}
            className={`px-3 py-2 rounded ${
              p === page ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          disabled={page >= totalPages}
          onClick={() => setSearchParams({ name, status, page: page + 1 })}
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}
