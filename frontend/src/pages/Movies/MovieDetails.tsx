import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movie";
import MovieTabs from "./MovieTabs";
import { FiArrowLeft, FiCalendar, FiUsers } from "react-icons/fi";

// Типы для данных фильма
interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  user: string;
  createdAt: string;
}

interface Movie {
  _id: string;
  name: string;
  year: number;
  detail: string;
  cast: string[];
  image: string;
  rating: number;
  genre: string;
  reviews: Review[];
}

interface RootState {
  auth: {
    userInfo: any;
  };
}

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data, refetch, isLoading, isError } =
    useGetSpecificMovieQuery(movieId);

  // Получаем первый элемент массива, так как API возвращает массив с одним фильмом
  const [movie, setMovie] = useState<Movie | null>(null);

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  // Обновляем состояние movie когда данные получены
  useEffect(() => {
    if (data && data.length > 0) {
      setMovie(data[0]);
    }
  }, [data]);

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

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();
      toast.success("Review created successfully!");
    } catch (error: any) {
      toast.error(error.data || error.message);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-2xl font-medium text-gray-300">
          Загрузка...
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-2xl font-medium text-red-400">
          Ошибка загрузки данных фильма
        </div>
      </div>
    );

  if (!movie)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-2xl font-medium text-amber-400">
          Фильм не найден
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-indigo-500 hover:text-indigo-600 transition-colors duration-200"
        >
          <FiArrowLeft className="mr-2" />
          <span>Вернуться на главную</span>
        </Link>
      </div>

      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
        {/* Hero Banner */}
        <div className="relative h-[40vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img
            src={getImageUrl(movie.image)}
            alt={movie.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8 bg-gradient-to-t from-gray-900 to-transparent">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-indigo-600 text-xs uppercase tracking-wider text-white rounded-full">
                {movie.genre}
              </span>
              <span className="flex items-center text-yellow-400 text-sm">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                {/* {movie.rating.toFixed(1)} */}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white mt-2">{movie.name}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          {/* Левая колонка - детали */}
          <div className="lg:col-span-2 space-y-8">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white">О фильме</h2>
              <p className="text-gray-300">{movie.detail}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Отзывы</h2>
              <MovieTabs
                loadingMovieReview={loadingMovieReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                movie={movie}
              />
            </div>
          </div>

          {/* Правая колонка - мета информация */}
          <div className="bg-gray-800 p-6 rounded-lg h-fit">
            <h3 className="text-xl font-bold text-white mb-4">Информация</h3>

            <div className="space-y-4">
              <div className="flex items-center">
                <FiCalendar className="text-indigo-400 mr-3" />
                <div>
                  <p className="text-gray-400 text-sm">Год выпуска</p>
                  <p className="text-white font-medium">{movie.year}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center">
                  <FiUsers className="text-indigo-400 mr-3" />
                  <p className="text-gray-400 text-sm">В ролях</p>
                </div>
                <ul className="mt-2 space-y-2">
                  {movie.cast?.map((actor, index) => (
                    <li
                      key={index}
                      className="text-white bg-gray-700 px-3 py-2 rounded-md"
                    >
                      {actor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
