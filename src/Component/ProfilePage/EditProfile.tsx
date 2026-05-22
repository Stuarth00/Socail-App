import { useState, useContext, type ChangeEvent } from "react";
import { AppContext } from "../../Context/GlobalState";
import type { UserProfile } from "../../Types/Interafaces";
import heic2any from "heic2any";

function EditProfile() {
  const {
    state,
    dispatch,
    LoadingSpinner,
    handleUserProfileClick,
    editAccount,
  } = useContext(AppContext);

  const [formData, setFormData] = useState<UserProfile>(
    state.currentUser || {
      user_id: "",
      first_name: "",
      last_name: "",
      email: "",
      date_of_birth: "",
      avatar: "",
      about_me: "",
      location: "",
      interests: [],
      password: "",
      gender: "",
    },
  );
  const [, setFile] = useState<File | null>(null);
  const handleCancelSubmission = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleUserProfileClick();
  };

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

    if (selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const render = new FileReader();
      render.onloadend = () => {
        const imageBase64 = render.result as string;
        setFormData((prev) => ({
          ...prev,
          avatar: imageBase64,
        }));
      };
      render.readAsDataURL(selectedFile);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
    await editAccount({
      ...formData,
    });

    dispatch({
      type: "UPDATE_PROFILE",
      payload: {
        ...formData,
        user_id: state.currentUser?.user_id || crypto.randomUUID(),
        password: state.currentUser?.password || "",
      },
    });
    handleUserProfileClick();
    setFormData({
      user_id: "",
      first_name: "",
      last_name: "",
      email: "",
      date_of_birth: "",
      avatar: "",
      about_me: "",
      location: "",
      interests: [],
      password: "",
      gender: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-sm rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <LoadingSpinner />
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Column 1: Identity */}
        <div className="space-y-4">
          <img
            src={formData.avatar || "/default-avatar.png"}
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover"
          />
          <label
            htmlFor="avatar"
            className="cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition block font-medium"
          >
            Update your image profile
          </label>
          <input
            type="file"
            id="avatar"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />

          <label className="block font-medium">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <label className="block font-medium">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <label className="block font-medium">About Me</label>
          <input
            id="about_me"
            type="text"
            name="about_me"
            value={formData.about_me}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                about_me: e.target.value,
              }))
            }
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Column 2: Account Details */}
        <div className="space-y-4">
          <label className="block font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <label className="block font-medium">Location</label>
          <input
            id="location"
            type="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <label className="block font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="not_say">Prefer not to say</option>
          </select>

          <label className="block font-medium">interests</label>
          <input
            id="interests"
            type="text"
            name="interests"
            value={
              Array.isArray(formData.interests)
                ? formData.interests.join(", ")
                : formData.interests || ""
            }
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                interests: e.target.value.split(",").map((i) => i.trim()),
              }))
            }
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <p className="text-sm font-medium ">Date of Birth</p>
          <p className="p-3 border rounded-lg text-gray-500">
            {state.currentUser?.date_of_birth}
          </p>
        </div>

        <div className="md:col-span-2 flex justify-end gap-4 mt-6">
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancelSubmission}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default EditProfile;
