import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movie";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

interface Review {
  name: string;
  rating: number;
  comment: string;
  userId: number;
}

interface MovieType {
  name: string;
  year: number;
  detail: string;
  cast: string[];
  rating: number;
  image: string | null;
  genre: string;
}

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  console.log(`passing id: ${id}`);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);
  const { data: genres } = useFetchGenresQuery();

  useEffect(() => {
    if (initialMovieData) {
      console.log("settings movie data to: ", initialMovieData);
      setMovieData(initialMovieData[0]);
      console.log("movie data: ", movieData);
    }
    console.log("here");
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const [deleteMovie] = useDeleteMovieMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setSelectedImage(file);
  };

  const handleUpdateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !movieData.genre
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      let uploadedImagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);
        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image:", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
      }

      await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          image: uploadedImagePath,
        },
      });

      navigate("/movies");
    } catch (error: any) {
      console.error("failed to update movie:", error);
      toast.error(
        `Failed to update movie: ${error?.message || "Unknown error"}`
      );
    }
  };

  const handleDeleteMovie = async () => {
    try {
      toast.success("Movie deleted sucessfully");
      await deleteMovie(id);
      navigate("/movies");
    } catch (error: any) {
      console.error("failed to delete movie:", error);
      toast.error(
        `failed to delete movie: ${error?.message || "Unknown error"}`
      );
    }
  };

  return (
    <div className="container flex justify-center items-center mt-4">
      <form>
        <p className="text-green-200 w-[50rem] text-2xl mb-4">Update Movie</p>

        <div className="mb-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Year:
            <input
              type="number"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Detail:
            <textarea
              name="detail"
              value={movieData.detail}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Cast (comma-separated):
            <input
              type="text"
              name="cast"
              value={movieData?.cast?.join(", ")}
              onChange={(e) =>
                setMovieData({
                  ...movieData,
                  cast: e.target.value.split(", "),
                })
              }
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Genre:
            <select
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            >
              <option value="">Select Genre</option>
              {genres?.map((genre: any) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label
            style={
              !selectedImage
                ? {
                    border: "1px solid #888",
                    borderRadius: "5px",
                    padding: "8px",
                  }
                : {
                    border: "0",
                    borderRadius: "0",
                    padding: "0",
                  }
            }
          >
            {!selectedImage && "Upload image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: !selectedImage ? "none" : "block" }}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleUpdateMovie}
          className="bg-teal-500 text-white px-4 py-2 rounded"
          disabled={isUpdatingMovie || isUploadingImage}
        >
          {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
        </button>

        <button
          type="button"
          onClick={handleDeleteMovie}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          disabled={isUpdatingMovie || isUploadingImage}
        >
          {isUpdatingMovie || isUploadingImage ? "Deleting..." : "Delete movie"}
        </button>
      </form>
    </div>
  );
};
export default UpdateMovie;
