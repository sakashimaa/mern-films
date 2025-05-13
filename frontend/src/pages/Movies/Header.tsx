import SliderUtil from "../../components/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movie";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const { data, isLoading } = useGetNewMoviesQuery();
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setSelectedMovie(data[randomIndex]);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Функция для получения правильного URL изображения
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    if (!imagePath.includes("/uploads") && !imagePath.includes("uploads/")) {
      return imagePath;
    }
    const uploadPath = imagePath.substring(imagePath.indexOf("/uploads"));
    return `http://localhost:8000${uploadPath}`;
  };

  return (
    <div className="relative">
      {/* Фоновое изображение героя */}
      {selectedMovie && (
        <div className="absolute inset-0 w-full h-[80vh] overflow-hidden -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900"></div>
          <img
            src={getImageUrl(selectedMovie.image)}
            alt={selectedMovie.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      {/* Шапка сайта */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/90 backdrop-blur-md py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Логотип */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-teal-400 text-4xl font-bold">F</span>
              <span className="text-white text-2xl font-semibold">
                FilmsHub
              </span>
            </Link>

            {/* Навигация */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-white/90 hover:text-teal-400 transition-colors text-sm font-medium"
              >
                Главная
              </Link>
              <Link
                to="/movies"
                className="text-white/90 hover:text-teal-400 transition-colors text-sm font-medium"
              >
                Фильмы
              </Link>
              <Link
                to="/genres"
                className="text-white/90 hover:text-teal-400 transition-colors text-sm font-medium"
              >
                Жанры
              </Link>
              <Link
                to="/about"
                className="text-white/90 hover:text-teal-400 transition-colors text-sm font-medium"
              >
                О нас
              </Link>
            </nav>

            {/* Действия */}
            <div className="flex items-center space-x-4">
              <button className="bg-transparent p-2 rounded-full text-white/80 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <Link
                to="/login"
                className="hidden md:block bg-teal-400 text-gray-900 hover:bg-teal-500 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Войти
              </Link>
              <button className="md:hidden p-2 text-white/80 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Герой секция */}
      {selectedMovie && (
        <div className="min-h-[80vh] pt-28 pb-16 flex items-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {selectedMovie.name}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-teal-400/20 text-teal-400 text-xs font-medium px-2.5 py-1 rounded">
                  {selectedMovie.year}
                </span>
                <div className="flex items-center text-yellow-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white text-sm">
                    {selectedMovie.rating || "N/A"}
                  </span>
                </div>
              </div>
              <p className="text-white/80 text-lg mb-8 line-clamp-3">
                {selectedMovie.detail}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedMovie.cast
                  ?.slice(0, 5)
                  .map((actor: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300"
                    >
                      {actor}
                    </span>
                  ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/movies/${selectedMovie._id}`}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-teal-400 text-gray-900 font-medium hover:bg-teal-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Смотреть
                </Link>
                <button className="inline-flex items-center px-6 py-3 rounded-lg border border-white/30 text-white font-medium hover:bg-white/10 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                  В избранное
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Слайдер с новыми фильмами */}
      <div className="container mx-auto px-4 md:px-6 -mt-20 relative z-10">
        <h2 className="text-2xl font-bold text-white mb-6">Новые релизы</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-400"></div>
          </div>
        ) : (
          <SliderUtil data={data} />
        )}
      </div>
    </div>
  );
};

export default Header;
