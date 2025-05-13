import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movie";
import { toast } from "react-toastify";

const AllComments = () => {
  const { data: movies, refetch } = useGetAllMoviesQuery();
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment(movieId, reviewId);
      toast.success("Comment deleted!");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <div>
      {movie?.map((movie) => (
        <section key={movie._id}>
          {movie?.reviews.map((review) => (
            <div key={review._id}>
              <div className="flex justify-between">
                <strong className="text-[#B0B0B0]">{review.name}</strong>
                <p className="text-[#B0B0B0]">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>

              <p className="my-4">{review.comment}</p>
              <button
                onClick={() => handleDeleteComment(movie._id, review._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};
export default AllComments;
