import { useGetAllMoviesQuery } from "../../redux/api/movie";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movie";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import banner from "../../assets/860b50dd04db95d62fb33b2921eb7aed.jpg";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice.js";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { moviesFilter, filteredMovies } = useSelector(
    (state: any) => state.movies
  );

  useEffect(() => {
    if (data) {
      dispatch(setFilteredMovies(data));

      const years = data.map((movie: any) => movie.year);
      const uniqueYears = Array.from(new Set(years));

      dispatch(setMovieYears(years));
      dispatch(setUniqueYears(uniqueYears));
    }
  }, [data, dispatch]);

  const handleSearchChange = (e: any) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));
    if (data) {
      const filtered = data.filter((movie: any) =>
        movie.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      dispatch(setFilteredMovies(filtered));
    }
  };

  const handleGenreClick = (genreId: any) => {
    dispatch(setMoviesFilter({ selectedGenre: genreId }));
    if (data) {
      const filterByGenre = genreId
        ? data.filter((movie: any) => movie.genre === genreId)
        : data;
      dispatch(setFilteredMovies(filterByGenre));
    }
  };

  const handleYearChange = (year: any) => {
    dispatch(setMoviesFilter({ selectedYear: year }));
    if (data) {
      const filterByYear = year
        ? data.filter((movie: any) => movie.year === +year)
        : data;
      dispatch(setFilteredMovies(filterByYear));
    }
  };

  const handleSortChange = (sortOption: any) => {
    dispatch(setMoviesFilter({ selectedSort: sortOption }));
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies || []));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies || []));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies || []));
        break;
      default:
        dispatch(setFilteredMovies(data || []));
        break;
    }
  };

  const getGenreName = (genreId: any) => {
    const genre = genres?.find((g: any) => g._id === genreId);
    return genre?.name || "Все жанры";
  };

  const uniqueYears = useSelector((state: any) => state.movies.uniqueYear);

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="relative">
        <div className="w-full h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/70 to-gray-900 z-10"></div>
          <img
            src={banner}
            alt="Movie banner"
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 z-20">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              Коллекция Фильмов
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl">
              Кинематографическое путешествие: открывая магию кино
            </p>
          </div>
        </div>

        <div className="relative mx-auto max-w-5xl px-4 -mt-8 z-30">
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-xl p-6">
            <div className="relative mb-6">
              <input
                type="text"
                className={`w-full h-14 bg-gray-700 border-2 ${
                  isSearchFocused ? "border-teal-400" : "border-gray-600"
                } text-white px-12 outline-none rounded-lg text-lg transition-all`}
                placeholder="Поиск фильмов..."
                value={moviesFilter.searchTerm || ""}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <svg
                className="absolute left-4 top-4 h-6 w-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              {moviesFilter.searchTerm && (
                <button
                  onClick={() => {
                    dispatch(setMoviesFilter({ searchTerm: "" }));
                    dispatch(setFilteredMovies(data || []));
                  }}
                  className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
                  Жанр
                </label>
                <select
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 outline-none focus:border-teal-400 transition-colors"
                  value={moviesFilter.selectedGenre || ""}
                  onChange={(e) => handleGenreClick(e.target.value)}
                >
                  <option value="">Все жанры</option>
                  {isLoadingGenres ? (
                    <option value="" disabled>
                      Загрузка жанров...
                    </option>
                  ) : (
                    genres?.map((genre: any) => (
                      <option key={genre._id} value={genre._id}>
                        {genre.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
                  Год выпуска
                </label>
                <select
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 outline-none focus:border-teal-400 transition-colors"
                  value={moviesFilter.selectedYear || ""}
                  onChange={(e) => handleYearChange(e.target.value)}
                >
                  <option value="">Все годы</option>
                  {uniqueYears?.map((year: any) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
                  Сортировка
                </label>
                <select
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 outline-none focus:border-teal-400 transition-colors"
                  value={moviesFilter.selectedSort || ""}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="">По умолчанию</option>
                  <option value="new">Новинки</option>
                  <option value="top">Популярные</option>
                  <option value="random">Случайные</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {moviesFilter.selectedGenre ? (
                <>
                  <span className="text-teal-400">
                    {getGenreName(moviesFilter.selectedGenre)}
                  </span>
                  <span className="ml-2 text-gray-400 text-lg">
                    ({filteredMovies?.length || 0} фильмов)
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {moviesFilter.searchTerm
                      ? `Результаты поиска "${moviesFilter.searchTerm}"`
                      : "Все фильмы"}
                  </span>
                  <span className="ml-2 text-gray-400 text-lg">
                    ({filteredMovies?.length || 0} фильмов)
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="flex space-x-2">
            <button className="p-2 bg-gray-800 rounded-lg border border-gray-700 text-teal-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button className="p-2 bg-gray-800 rounded-lg border border-gray-700 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {filteredMovies?.length === 0 ? (
          <div className="bg-gray-800/50 rounded-xl p-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto mb-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              />
            </svg>
            <h3 className="text-xl font-medium text-white mb-2">
              Фильмы не найдены
            </h3>
            <p className="text-gray-400 mb-6">
              По вашему запросу ничего не найдено. Попробуйте изменить параметры
              поиска.
            </p>
            <button
              onClick={() => {
                dispatch(
                  setMoviesFilter({
                    searchTerm: "",
                    selectedGenre: "",
                    selectedYear: "",
                    selectedSort: "",
                  })
                );
                dispatch(setFilteredMovies(data || []));
              }}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies?.map((movie: any) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default AllMovies;
