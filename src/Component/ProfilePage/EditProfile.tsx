import { useState, useContext } from "react";
import { AppContext } from "../../Context/GlobalState";

interface EditFormData {
  first_name: string;
  last_name: string;
  DateOfBirth: string;
  email: string;
}

const initial_data: EditFormData = {
  first_name: "",
  last_name: "",
  DateOfBirth: "",
  email: "",
};

function EditProfile() {
  const [formData, setFormData] = useState<EditFormData>(initial_data);
  const { state, dispatch, asyncSimulate } = useContext(AppContext);

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
    });
  };

  return (
    <div className="p-4 mr-4">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Enter your first name"
          className="border p-2 rounded m-2 w-full"
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="border p-2 rounded m-2 w-full"
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded m-2 w-full"
        />

        <label htmlFor="birthday">Your birth date</label>
        <input
          type="date"
          id="birth"
          name="DateOfBirth"
          value={formData.DateOfBirth}
          onChange={handleChange}
          required
          className="border p-2 rounded m-2 w-full"
        />

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
export default EditProfile;
