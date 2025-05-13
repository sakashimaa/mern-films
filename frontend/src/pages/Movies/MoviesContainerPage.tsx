import { useState, useEffect } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movie";
import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../components/SliderUtil";

const MoviesContainerPage = () => {
  const { data: newMovies, isLoading: isLoadingNew } = useGetNewMoviesQuery();
  const { data: topMovies, isLoading: isLoadingTop } = useGetTopMoviesQuery();
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();
  const { data: randomMovies, isLoading: isLoadingRandom } =
    useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("all");

  // Фильтрация фильмов по выбранному жанру
  const filteredMovies = newMovies?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  // Обработчик клика по жанру
  const handleGenreClick = (genreId: string) => {
    if (selectedGenre === genreId) {
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genreId);
      setActiveSection("filtered");
    }
  };

  // Отображение секции "Для вас", если нет выбранного жанра
  useEffect(() => {
    if (!selectedGenre) {
      setActiveSection("all");
    }
  }, [selectedGenre]);

  // Компонент загрузки
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-400"></div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4 md:px-6">
      <div className="container mx-auto">
        {/* Секция фильтров по жанрам */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Жанры</h2>
          {isLoadingGenres ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedGenre(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedGenre === null
                    ? "bg-teal-400 text-gray-900"
                    : "bg-gray-800 text-white/80 hover:bg-gray-700"
                }`}
              >
                Все
              </button>
              {genres?.map((g) => (
                <button
                  key={g._id}
                  onClick={() => handleGenreClick(g._id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedGenre === g._id
                      ? "bg-teal-400 text-gray-900"
                      : "bg-gray-800 text-white/80 hover:bg-gray-700"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Секции с фильмами */}
        <div className="space-y-16">
          {/* Секция с отфильтрованными фильмами */}
          {activeSection === "filtered" && selectedGenre && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {genres?.find((g) => g._id === selectedGenre)?.name ||
                    "Фильтр"}
                </h2>
              </div>
              {isLoadingNew ? (
                <LoadingSpinner />
              ) : (
                <SliderUtil data={filteredMovies} />
              )}
            </section>
          )}

          {/* Секция "Для вас" - случайные фильмы */}
          {activeSection === "all" && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Для вас</h2>
                <button className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
                  Показать все
                </button>
              </div>
              {isLoadingRandom ? (
                <LoadingSpinner />
              ) : (
                <SliderUtil data={randomMovies} />
              )}
            </section>
          )}

          {/* Секция "Популярные фильмы" */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Популярные фильмы
              </h2>
              <button className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
                Показать все
              </button>
            </div>
            {isLoadingTop ? (
              <LoadingSpinner />
            ) : (
              <SliderUtil data={topMovies} />
            )}
          </section>

          {/* Секция "Новинки" */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Новинки</h2>
              <button className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
                Показать все
              </button>
            </div>
            {isLoadingNew ? (
              <LoadingSpinner />
            ) : (
              <SliderUtil data={newMovies} />
            )}
          </section>

          {/* Рекомендуемый контент */}
          <section className="bg-gray-800/50 rounded-xl p-8 mt-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-lg">
                <h2 className="text-2xl font-bold text-white mb-3">
                  Премиум подписка
                </h2>
                <p className="text-white/70 mb-6">
                  Получите доступ ко всем фильмам, эксклюзивному контенту и
                  возможности скачивания для просмотра офлайн.
                </p>
                <button className="inline-flex items-center px-6 py-3 rounded-lg bg-teal-400 text-gray-900 font-medium hover:bg-teal-500 transition-colors">
                  Подробнее
                </button>
              </div>
              <div className="flex -space-x-4">
                <div className="w-16 h-16 rounded-full border-2 border-gray-800 bg-gray-700 flex items-center justify-center text-white/80">
                  HD
                </div>
                <div className="w-16 h-16 rounded-full border-2 border-gray-800 bg-gray-700 flex items-center justify-center text-white/80">
                  4K
                </div>
                <div className="w-16 h-16 rounded-full border-2 border-gray-800 bg-gray-700 flex items-center justify-center text-white/80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.816-4.816A8.25 8.25 0 012.25 10.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MoviesContainerPage;
