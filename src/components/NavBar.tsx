import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useImages } from "../context/ImagesProvider";
import { fetchGallery } from "../server/fetchGallery";
import { useQueries } from "../context/SearchHistoryContext";

const NavBar = () => {
  const [query, setQuery] = useState("");
  const { setImages } = useImages();
  const { setQueries } = useQueries();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const modifiedQuery = pluralizeQuery(query);

    const images = await fetchGallery(1, 10, modifiedQuery);
    setImages(images);
    setQueries((prevQueries) => [...new Set([modifiedQuery, ...prevQueries])]);
    localStorage.setItem(modifiedQuery, JSON.stringify(images));
  };

  const pluralizeQuery = (query: string): string => {
  
    if (query.endsWith("s") || query.endsWith("es")) {
      return query;
    } else {
      return query + "s";
    }
  };

  return (
    <nav className="bg-white px-6 py-3 shadow-md">
      <form onSubmit={onSubmitHandler} className="flex justify-between items-center">
        <input
          type="search"
          onChange={onChangeHandler}
          value={query}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
          placeholder="Search for images..."
        />
        <div className="flex items-center ml-4 space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">
            Gallery
          </Link>
          <Link to="/history" className="text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">
            History
          </Link>
        </div>
      </form>
    </nav>
  );
};

export default NavBar;
 