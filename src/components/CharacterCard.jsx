import { Link } from "react-router-dom";

export default function CharacterCard({ character }) {
  return (
    <div className="card border rounded shadow">
      <img
        src={character.image}
        className="card-img-top"
        alt={character.name}
      />
      <div className="card-body p-4">
        <h5 className="card-title text-xl font-semibold">{character.name}</h5>
        <p className="card-text text-sm text-gray-700">
          <strong>Status:</strong> {character.status} <br />
          <strong>Species:</strong> {character.species}
        </p>
        <Link
          to={`/character/${character.id}`}
          className="inline-block mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}