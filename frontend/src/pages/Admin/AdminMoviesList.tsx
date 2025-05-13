import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movie";
import { useState } from "react";

const AdminMoviesList = () => {
  const { data: movies, isLoading } = useGetAllMoviesQuery();
  const [searchTerm, setSearchTerm] = useState("");

  // Функция для формирования правильного URL изображения
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";

    // Если путь уже начинается с http, то это полный URL
    if (imagePath.startsWith("http")) return imagePath;

    // Проверяем, начинается ли путь с /uploads или uploads
    if (!imagePath.includes("/uploads") && !imagePath.includes("uploads/")) {
      return imagePath;
    }

    // Если путь содержит /uploads, удаляем все до /uploads и формируем правильный URL
    const uploadPath = imagePath.substring(imagePath.indexOf("/uploads"));
    return `http://localhost:8000${uploadPath}`;
  };

  // Фильтрация фильмов по поисковому запросу
  const filteredMovies = movies?.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Получение года из строки
  const getYear = (year: number) => {
    return year ? year : "N/A";
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Коллекция фильмов{" "}
            <span className="text-teal-400">({movies?.length || 0})</span>
          </h1>

          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск фильмов..."
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-200 placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <Link
              to="/admin/movies/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-teal-400 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-400"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Добавить фильм
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
          </div>
        ) : filteredMovies?.length === 0 ? (
          <div className="bg-gray-800 shadow rounded-lg p-6 text-center">
            <p className="text-gray-400 text-lg">Нет фильмов для отображения</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies?.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl border border-gray-700"
              >
                <div className="relative">
                  <img
                    src={getImageUrl(movie.image)}
                    alt={movie.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-teal-500 text-gray-900 px-2 py-1 m-2 rounded font-semibold">
                    {getYear(movie.year)}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {movie.name}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {movie.detail.length > 100
                      ? `${movie.detail.substring(0, 100)}...`
                      : movie.detail}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {movie.cast?.slice(0, 3).map((actor, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300"
                      >
                        {actor}
                      </span>
                    ))}
                    {movie.cast?.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                        +{movie.cast.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <Link
                      to={`/admin/movies/update/${movie._id}`}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-900 bg-teal-400 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-400"
                    >
                      <svg
                        className="mr-1 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Редактировать
                    </Link>
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-gray-300 font-medium">
                        {movie.rating || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMoviesList;
