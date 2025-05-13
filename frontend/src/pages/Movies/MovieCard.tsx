import { Link } from "react-router-dom";
import { useState } from "react";

interface MovieProps {
  movie: any;
}

const MovieCard = ({ movie }: MovieProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Функция для получения правильного URL изображения
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

  return (
    <div
      className="relative group overflow-hidden rounded-lg transition-transform duration-300 shadow-md hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movies/${movie._id}`} className="block">
        {/* Изображение фильма */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={getImageUrl(movie.image)}
            alt={movie.name}
            className={`w-full h-full object-cover object-center transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* Градиент поверх изображения */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-70"></div>

          {/* Год и рейтинг */}
          <div className="absolute top-2 right-2 flex space-x-2">
            <span className="bg-teal-400/20 text-teal-400 text-xs font-medium px-2.5 py-1 rounded">
              {movie.year}
            </span>
            {movie.rating && (
              <div className="flex items-center bg-gray-900/60 text-yellow-400 text-xs px-2 py-1 rounded">
                <svg
                  className="w-3.5 h-3.5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                {movie.rating}
              </div>
            )}
          </div>
        </div>

        {/* Информация о фильме */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold truncate">{movie.name}</h3>

          {/* Детали фильма - появляются при наведении */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isHovered ? "max-h-32 opacity-100 mt-2" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-white/70 text-sm line-clamp-2 mb-2">
              {movie.detail}
            </p>

            {/* Актеры */}
            {movie.cast && movie.cast.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {movie.cast.slice(0, 2).map((actor: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-800/80 text-gray-300"
                  >
                    {actor}
                  </span>
                ))}
                {movie.cast.length > 2 && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-800/80 text-gray-300">
                    +{movie.cast.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Кнопка просмотра */}
            <button className="mt-3 w-full bg-teal-400/30 hover:bg-teal-400/50 text-teal-300 text-xs py-1.5 rounded transition-colors">
              Смотреть
            </button>
          </div>
        </div>
      </Link>

      {/* Overlay при наведении */}
      <div
        className={`absolute inset-0 bg-gray-900/60 transition-opacity duration-300 ${
          isHovered ? "opacity-50" : "opacity-0"
        }`}
      ></div>
    </div>
  );
};

export default MovieCard;
