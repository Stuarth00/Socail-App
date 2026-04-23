import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/GlobalState";

function PostProfile() {
  const { state } = useContext(AppContext);
  const [numCols, setNumCols] = useState(3);

  const userPosts = state.posts.filter(
    (post) => post.authorId === state.currentUser?.id,
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setNumCols(2);
      else setNumCols(3);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial column count based on current window size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const distributePhotos = (items: typeof userPosts, numCols: number) => {
    const cols = Array.from({ length: numCols }, () => [] as typeof userPosts);
    items.forEach((post, i) => {
      cols[i % numCols].push(post);
    });
    return cols;
  };
  const columns = distributePhotos(userPosts, numCols);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Your posts</h1>
      <div className="flex gap-4 items-start">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4 flex-1">
            {col.map((photo) => (
              <div
                key={photo.id}
                className="border border-gray-300 rounded overflow-hidden shadow-lg break-inside-avoid"
              >
                <img
                  src={photo.contentUrl}
                  alt={photo.description}
                  className="w-full h-auto rounded-t hoverImg"
                  // onClick={() => handleClick(photo)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostProfile;

{
  /* 1. columns-2: 2 columns on small screens
         2. md:columns-3: 3 columns on medium screens and up
         3. gap-4: spacing between images
      */
}
{
  /* <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {userPosts.map((post) => (
          <div key={post.id} className="break-inside-avoid">
            <img
              src={post.contentUrl}
              alt={post.description}
              className="w-full rounded-lg shadow-md hover:opacity-90 transition"
            />
          </div>
        ))}
      </div> */
}
