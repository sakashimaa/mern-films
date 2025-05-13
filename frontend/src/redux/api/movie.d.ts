// Типы для Movie API
import { ApiResponse } from "@reduxjs/toolkit/query/react";

export interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  user: string;
  createdAt: string;
}

export interface Movie {
  _id: string;
  name: string;
  year: number;
  detail: string;
  cast: string[];
  image: string;
  rating: number;
  genre: string;
  reviews: Review[];
  numReviews: number;
  createdAt: string;
}

// Типы для запросов
export interface GetMoviesResponse extends Array<Movie> {}

export interface AddReviewRequest {
  id: string | undefined;
  rating: number;
  comment: string;
}

export interface AddReviewResponse {
  message: string;
}

export interface UploadImageRequest extends FormData {}

export interface UploadImageResponse {
  image: string;
}

export interface UpdateMovieRequest {
  id: string;
  updatedMovie: Partial<Movie>;
}

export interface DeleteCommentRequest {
  movieId: string;
  reviewId: string;
}

// Хуки для использования API
export declare const useGetAllMoviesQuery: () => ApiResponse<GetMoviesResponse>;
export declare const useCreateMovieMutation: () => [Function, any];
export declare const useUpdateMovieMutation: () => [Function, any];
export declare const useAddMovieReviewMutation: () => [Function, any];
export declare const useDeleteCommentMutation: () => [Function, any];
export declare const useDeleteMovieMutation: () => [Function, any];
export declare const useGetSpecificMovieQuery: (
  id: string | undefined
) => ApiResponse<GetMoviesResponse>;
export declare const useUploadImageMutation: () => [Function, any];
export declare const useGetNewMoviesQuery: () => ApiResponse<GetMoviesResponse>;
export declare const useGetTopMoviesQuery: () => ApiResponse<GetMoviesResponse>;
export declare const useGetRandomMoviesQuery: () => ApiResponse<GetMoviesResponse>;
