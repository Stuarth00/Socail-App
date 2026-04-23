import { useState, useContext, type ChangeEvent } from "react";
import { AppContext } from "../../Context/GlobalState";
import type { UserProfile } from "../../Types/Interafaces";

function EditProfile() {
  const {
    state,
    dispatch,
    asyncSimulate,
    LoadingSpinner,
    handleUserProfileClick,
  } = useContext(AppContext);
  const [formData, setFormData] = useState<UserProfile>(
    state.currentUser || {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      DateOfBirth: "",
      avatar: "",
      aboutMe: "",
      location: "",
      interests: [],
      password: "",
    },
  );
  const handleCancelSubmission = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleUserProfileClick();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        avatar: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    asyncSimulate(() => {
      dispatch({
        type: "UPDATE_PROFILE",
        payload: {
          ...formData,
          id: state.currentUser?.id || crypto.randomUUID(),
          password: state.currentUser?.password || "",
        },
      });
      handleUserProfileClick();
      setFormData({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        DateOfBirth: "",
        avatar: "",
        aboutMe: "",
        location: "",
        interests: [],
        password: "",
      });
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
            type="text"
            name="aboutMe"
            value={formData.aboutMe}
            onChange={handleChange}
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
            type="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <label className="block font-medium">interests</label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <p className="text-sm font-medium ">Date of Birth</p>
          <p className="p-3 border rounded-lg text-gray-500">
            {state.currentUser?.DateOfBirth}
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
