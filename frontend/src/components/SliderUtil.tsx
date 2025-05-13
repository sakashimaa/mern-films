import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";

// Определяем интерфейс для props компонента
interface SliderUtilProps {
  data: any[] | undefined;
}

const SliderUtil = ({ data }: SliderUtilProps) => {
  const [slidesToShow, setSlidesToShow] = useState(4);

  // Адаптивное количество слайдов в зависимости от ширины экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize(); // Установить начальное значение
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Настройки для слайдера
  const settings = {
    dots: true,
    infinite: data && data.length > slidesToShow,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    swipeToSlide: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
    dotsClass: "slick-dots custom-dots",
    appendDots: (dots: React.ReactNode) => (
      <div className="mt-8">
        <ul className="flex justify-center items-center"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 mx-1 rounded-full bg-gray-700 hover:bg-teal-400 transition-colors"></div>
    ),
  };

  // Если данных нет или они пусты
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-800/30 p-8 rounded-lg text-center">
        <p className="text-gray-500">Нет доступных фильмов</p>
      </div>
    );
  }

  return (
    <div className="slider-container relative group">
      <Slider {...settings}>
        {data.map((movie) => (
          <div key={movie._id} className="px-2">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Компонент стрелки "вперед"
const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slider-arrow next-arrow`}
      style={{
        ...style,
        display: "flex",
        background: "rgba(16, 20, 24, 0.7)",
        backdropFilter: "blur(4px)",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        right: "-20px",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: 0,
        transition: "opacity 0.3s ease",
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-white"
      >
        <path
          fillRule="evenodd"
          d="M13.28 11.47a.75.75 0 0 1 0 1.06l-4.19 4.19a.75.75 0 1 1-1.06-1.06L11.19 12 8.03 8.84a.75.75 0 0 1 1.06-1.06l4.19 4.19Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

// Компонент стрелки "назад"
const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slider-arrow prev-arrow`}
      style={{
        ...style,
        display: "flex",
        background: "rgba(16, 20, 24, 0.7)",
        backdropFilter: "blur(4px)",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        left: "-20px",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: 0,
        transition: "opacity 0.3s ease",
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-white"
      >
        <path
          fillRule="evenodd"
          d="M10.72 11.47a.75.75 0 0 0 0 1.06l4.19 4.19a.75.75 0 1 0 1.06-1.06L12.81 12l3.16-3.16a.75.75 0 0 0-1.06-1.06l-4.19 4.19Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

// Добавляем глобальные стили для слайдера
const addGlobalStyles = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    .slider-container:hover .slider-arrow {
      opacity: 1 !important;
    }
    .slick-dots li button:before {
      display: none;
    }
    .slick-dots li {
      margin: 0;
    }
    .slick-dots li.slick-active div {
      background-color: #2dd4bf; /* teal-400 */
      width: 24px;
      border-radius: 12px;
    }
  `;
  document.head.appendChild(style);
};

// Вызываем функцию добавления стилей при загрузке компонента
if (typeof window !== "undefined") {
  addGlobalStyles();
}

export default SliderUtil;
