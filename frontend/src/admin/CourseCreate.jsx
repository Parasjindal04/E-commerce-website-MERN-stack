import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CourseCreate() {
  // Basic fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [totalLectures, setTotalLectures] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [instructorName, setInstructorName] = useState("");

  // Image handling for course and instructor
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [instructorImage, setInstructorImage] = useState(null);
  const [instructorImagePreview, setInstructorImagePreview] = useState("");

  // Arrays for whatYouWillLearn and requirements
  const [whatYouWillLearn, setWhatYouWillLearn] = useState([""]);
  const [requirements, setRequirements] = useState([""]);

  const navigate = useNavigate();

  // Handlers for file inputs with preview
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const changeInstructorPhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setInstructorImagePreview(reader.result);
      setInstructorImage(file);
    };
  };

  // Handlers for dynamic arrays inputs
  const handleWhatYouWillLearnChange = (index, value) => {
    const list = [...whatYouWillLearn];
    list[index] = value;
    setWhatYouWillLearn(list);
  };

  const handleAddWhatYouWillLearn = () => {
    setWhatYouWillLearn([...whatYouWillLearn, ""]);
  };

  const handleRemoveWhatYouWillLearn = (index) => {
    const list = [...whatYouWillLearn];
    list.splice(index, 1);
    setWhatYouWillLearn(list);
  };

  const handleRequirementsChange = (index, value) => {
    const list = [...requirements];
    list[index] = value;
    setRequirements(list);
  };

  const handleAddRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const handleRemoveRequirement = (index) => {
    const list = [...requirements];
    list.splice(index, 1);
    setRequirements(list);
  };

  // Submit handler
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    formData.append("price", price);
    formData.append("level", level);
    formData.append("language", language);
    formData.append("totalLectures", totalLectures);
    formData.append("courseDuration", courseDuration);
    formData.append("instructorName", instructorName);
    if (image) formData.append("image", image);
    if (instructorImage) formData.append("instructorImage", instructorImage);

    // Append arrays as JSON strings because FormData doesn't handle arrays natively
    formData.append("whatYouWillLearn", JSON.stringify(whatYouWillLearn.filter(item => item.trim() !== "")));
    formData.append("requirements", JSON.stringify(requirements.filter(item => item.trim() !== "")));

    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin?.token;
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4001/api/v1/course/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success(response?.data?.message || "Course created successfully");
      navigate("/admin/our-courses");

      // Reset form fields
      setTitle("");
      setDescription("");
      setShortDescription("");
      setLongDescription("");
      setPrice("");
      setLevel("");
      setLanguage("");
      setTotalLectures("");
      setCourseDuration("");
      setInstructorName("");
      setImage(null);
      setImagePreview("");
      setInstructorImage(null);
      setInstructorImagePreview("");
      setWhatYouWillLearn([""]);
      setRequirements([""]);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.errors || "Failed to create course");
    }
  };

  return (
    <div>
      <div className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg bg-gray-800 text-white">
          <h3 className="text-2xl font-semibold mb-8">Create Course</h3>

          <form onSubmit={handleCreateCourse} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none text-black"
                required
              />
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <label className="block text-lg">Short Description</label>
              <input
                type="text"
                placeholder="Brief summary of the course"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none text-black"
                required
              />
            </div>

            {/* Long Description */}
            <div className="space-y-2">
              <label className="block text-lg">Long Description</label>
              <textarea
                placeholder="Detailed description"
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none text-black"
                rows={4}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-lg">Description</label>
              <input
                type="text"
                placeholder="Enter your course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none text-black"
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="block text-lg">Price</label>
              <input
                type="number"
                placeholder="Enter your course price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none text-black"
                required
                min={0}
              />
            </div>

            {/* Level */}
            <div className="space-y-2">
              <label className="block text-lg">Level</label>
              <input
                type="text"
                placeholder="Course difficulty level (e.g. Beginner)"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none text-black"
                required
              />
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="block text-lg">Language</label>
              <input
                type="text"
                placeholder="Course language (e.g. English)"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none text-black"
                required
              />
            </div>

            {/* Total Lectures */}
            <div className="space-y-2">
              <label className="block text-lg">Total Lectures</label>
              <input
                type="number"
                placeholder="Number of lectures"
                value={totalLectures}
                onChange={(e) => setTotalLectures(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none text-black"
                required
                min={1}
              />
            </div>

            {/* Course Duration */}
            <div className="space-y-2">
              <label className="block text-lg">Course Duration</label>
              <input
                type="text"
                placeholder="E.g., 10 hours"
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none text-black"
                required
              />
            </div>

            {/* Instructor Name */}
            <div className="space-y-2">
              <label className="block text-lg">Instructor Name</label>
              <input
                type="text"
                placeholder="Instructor's name"
                value={instructorName}
                onChange={(e) => setInstructorName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none text-black"
                required
              />
            </div>

            {/* Instructor Image */}
            <div className="space-y-2">
              <label className="block text-lg">Instructor Image</label>
              <div className="flex items-center justify-center">
                <img
                  src={instructorImagePreview || "/imgPL.webp"}
                  alt="Instructor"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={changeInstructorPhotoHandler}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            {/* What You Will Learn - dynamic list */}
            <div>
              <label className="block text-lg mb-2">What You Will Learn</label>
              {whatYouWillLearn.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Point ${index + 1}`}
                    value={item}
                    onChange={(e) => handleWhatYouWillLearnChange(index, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-400 rounded-md outline-none text-black"
                    required
                  />
                  {whatYouWillLearn.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveWhatYouWillLearn(index)}
                      className="bg-red-500 text-white px-2 rounded"
                      title="Remove"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddWhatYouWillLearn}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add More
              </button>
            </div>

            {/* Requirements - dynamic list */}
            <div>
              <label className="block text-lg mb-2 mt-6">Requirements</label>
              {requirements.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Requirement ${index + 1}`}
                    value={item}
                    onChange={(e) => handleRequirementsChange(index, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-400 rounded-md outline-none text-black"
                    required
                  />
                  {requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(index)}
                      className="bg-red-500 text-white px-2 rounded"
                      title="Remove"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddRequirement}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add More
              </button>
            </div>

            {/* Course Image */}
            <div className="space-y-2 mt-6">
              <label className="block text-lg">Course Image</label>
              <div className="flex items-center justify-center">
                <img
                  src={imagePreview ? imagePreview : "/imgPL.webp"}
                  alt="Course"
                  className="w-full max-w-sm h-auto rounded-md object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={changePhotoHandler}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
            >
              Create Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CourseCreate;
