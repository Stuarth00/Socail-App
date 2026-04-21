import { useState, useContext, type ChangeEvent } from "react";
import { AppContext } from "../../Context/GlobalState";
import type { Post } from "../../Types/Interafaces";
import heic2any from "heic2any";

function CreationPost() {
  const { state, dispatch, asyncSimulate } = useContext(AppContext);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [, setFile] = useState<File | null>(null);
  const acceptedFormats = "image/*, .webp, .avif, .jpeg, .jpg, .png";

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let selectedFile = e.target.files ? e.target.files[0] : null;
    if (!selectedFile) return;

    // 1. Check for HEIC specifically
    if (
      selectedFile.name.toLowerCase().endsWith(".heic") ||
      selectedFile.type === "image/heic"
    ) {
      try {
        // 2. Convert HEIC to JPEG blob
        const convertedBlob = await heic2any({
          blob: selectedFile,
          toType: "image/jpeg",
          quality: 0.8,
        });

        // 3. Create a new File object from the blob so it has a name
        selectedFile = new File(
          [Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob],
          selectedFile.name.replace(/\.[^/.]+$/, ".jpg"),
          { type: "image/jpeg" },
        );
      } catch (error) {
        console.log(error);
        alert("Brave/Chrome don't support HEIC yet. Please try a PNG or JPEG!");
        e.target.value = ""; // Clear the input
        return;
      }
    }

    // Your existing logic continues here...
    if (selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const render = new FileReader();
      render.onloadend = () => {
        setImageUrl(render.result as string);
      };
      render.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting post with image URL:", imageUrl);

    const newPost: Post = {
      id: Date.now(),
      authorId: state.currentUser?.id || "unknown",
      contentUrl: imageUrl || "",
      description: description,
      likes: [],
      createdAt: new Date().toISOString(),
      comments: [],
    };

    asyncSimulate(() => {
      dispatch({
        type: "CREATE_POST",
        payload: newPost,
      });
      setImageUrl(null);
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="content">Content:</label>
        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          required
          className="border p-2 rounded m-4"
          accept={acceptedFormats}
        />

        <label htmlFor="description">Description:</label>

        <textarea
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your post..."
          className="border p-2 rounded m-2"
        />

        <button type="submit">Create Post</button>
      </form>
      {imageUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Preview:</h3>
          <img src={imageUrl} alt="Preview" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  );
}
export default CreationPost;
