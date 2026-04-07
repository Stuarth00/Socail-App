import { useState, useContext, type ChangeEvent } from "react";
import { AppContext } from "../../Context/GlobalState";

// interface CreationPostProps {
//   content: {
//     type: string;
//     url: string;
//   };
//   description: string;
// }

// const initial_data: CreationPostProps = {
//   content: {
//     type: "",
//     url: "",
//   },
//   description: "",
// };

function CreationPost() {
  //   const [formData, setFormData] = useState<CreationPostProps>(initial_data);
  const { state, dispatch, asyncSimulate, LoadingSpinner } =
    useContext(AppContext);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [, setFile] = useState<File | null>(null);
  const acceptedFormats = "image/*, .HEIC, .HEIF";

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  //   const hanldeChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting post with image URL:", imageUrl);
    handleFileChange(e as unknown as ChangeEvent<HTMLInputElement>);

    const newPost = {
      id: Date.now(),
      authorId: state.currentUser?.id || "unknown",
      content: {
        type: "image",
        url: imageUrl || "",
      },
      description: "",
      likes: [],
      comments: [],
    };

    asyncSimulate(() => {
      dispatch({
        type: "CREATE_POST",
        payload: newPost,
      });
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
          //   name="imageUrl"
          onChange={handleFileChange}
          placeholder="Past your image here"
          accept={acceptedFormats}
          required
          className="border p-2 rounded"
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
