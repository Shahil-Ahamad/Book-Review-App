import { useGetBooksQuery } from "../../api/book/query";
import { useState } from "react";
import { successToast } from "../toaster";

export function UserListBooks() {
  const { data, isLoading, isError, error } = useGetBooksQuery();
  const [visibleBooks, setVisibleBooks] = useState(6); // Default to showing 6 books
  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [key: string]: boolean;
  }>({});

  const handleLoadMore = () => setVisibleBooks((prev) => prev + 3);
  const handleShowLess = () => setVisibleBooks((prev) => prev - 3);

  const toggleDescription = (bookId: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error.message}
      </div>
    );
  }

  const bookData = data?.data || []; // Provide a fallback empty array

  return (
    <div className="bg-gradient-to-br from-amber-100 to-amber-200 min-h-screen py-6 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookData.slice(0, visibleBooks).map((book) => {
          const isDescriptionExpanded = expandedDescriptions[book._id];

          return (
            <div
              key={book._id}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              {/* Content Section */}
              <div className="p-4">
                <div>
                  <h2 className="text-lg font-bold text-amber-700">
                    {book.Title}
                  </h2>
                </div>
                <div>
                  <p className="text-sm italic text-amber-700">
                    <b>Author:</b> {book.author}
                  </p>
                </div>
                <p className="text-sm text-amber-600 italic mb-2">
                  <b>Genre:</b>
                  <div className="inline-flex flex-wrap gap-2">
                    {book.genres.split(",").map((genre, index) => (
                      <span
                        key={index}
                        className="bg-amber-200 text-amber-800 px-2 py-1 rounded-full text-xs"
                      >
                        {genre.trim()}
                      </span>
                    ))}
                  </div>
                </p>

                <h3 className="text-amber-600 underline">Description</h3>
                <p className="text-black mb-4">
                  {isDescriptionExpanded
                    ? book.description || "No description available."
                    : `${book.description?.substring(0, 100)}...`}
                </p>
                <button
                  className="text-amber-700 text-sm font-medium"
                  onClick={() => toggleDescription(book._id)}
                >
                  {isDescriptionExpanded ? "Show Less" : "Read More"}
                </button>

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    className="bg-amber-700 text-white text-sm px-4 py-2 rounded-lg"
                    onClick={() => successToast("Review Feature Coming Soon")}
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More / Show Less Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {visibleBooks < bookData.length && (
          <button
            className="bg-amber-700 text-white text-sm px-6 py-2 rounded-lg"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
        {visibleBooks > 6 && (
          <button
            className="bg-white text-amber-600 text-sm px-6 py-2 rounded-lg"
            onClick={handleShowLess}
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
}
