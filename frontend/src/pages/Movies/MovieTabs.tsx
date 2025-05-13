import { Link } from "react-router-dom";
import type { Dispatch, SetStateAction, FormEvent } from "react";
import { FiUser, FiClock, FiStar } from "react-icons/fi";

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

interface MovieTabsProps {
  userInfo: any;
  submitHandler: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  movie: Movie;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  loadingMovieReview: boolean;
}

const MovieTabs = ({
  userInfo,
  submitHandler,
  comment,
  setComment,
  movie,
  rating,
  setRating,
  loadingMovieReview,
}: MovieTabsProps) => {
  return (
    <div className="space-y-8">
      {/* Форма отзыва */}
      <section className="bg-gray-800 rounded-lg p-6">
        {userInfo ? (
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label
                htmlFor="rating"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Рейтинг
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <FiStar
                      className={`w-6 h-6 ${
                        rating >= star
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Ваш отзыв
              </label>
              <textarea
                id="comment"
                rows={4}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Поделитесь своими впечатлениями о фильме..."
                className="w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 p-3 placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loadingMovieReview}
              className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMovieReview ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Отправка...
                </span>
              ) : (
                "Отправить отзыв"
              )}
            </button>
          </form>
        ) : (
          <div className="bg-gray-700/50 p-6 rounded-lg text-center">
            <p className="text-gray-300 mb-4">
              Чтобы оставить отзыв, необходимо войти в систему
            </p>
            <Link
              to="/login"
              className="inline-block px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200"
            >
              Войти
            </Link>
          </div>
        )}
      </section>

      {/* Список отзывов */}
      <section>
        {movie?.reviews?.length === 0 ? (
          <div className="bg-gray-800/50 rounded-lg p-8 text-center">
            <p className="text-gray-400">
              Пока никто не оставил отзыв. Будьте первым!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {movie?.reviews?.map((review) => (
              <div
                key={review._id}
                className="bg-gray-800 rounded-lg p-5 transform transition duration-200 hover:translate-y-[-2px]"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className="bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center text-white mr-3">
                      <FiUser />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{review.name}</h4>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-400"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <FiClock className="mr-1" />
                    <span>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 mt-3 pl-[52px]">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieTabs;
