const VideoCard = ({ image, title, date, comments }) => {
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
    <>
      <div className="flex items-center w-[90%] mt-5">
        <div>
          <img src={getImageUrl(image)} alt="Card Image" className="h-[3rem]" />
        </div>

        <div className="ml-4">
          <h2 className="text-lg text-white">{title}</h2>
          <p className="text-gray-500 mb-3">{date}</p>
        </div>

        <div className="flex-grow mb-5 flex justify-end items-center">
          <div className="text-white text-lg">{comments}</div>
        </div>
      </div>
    </>
  );
};
export default VideoCard;
