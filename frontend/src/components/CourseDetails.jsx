import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/api/v1/course/${courseId}`);
        setCourse(res.data.course);
      } catch (err) {
        console.log("Error loading course details", err);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <h1 className="text-xl font-semibold text-gray-700 animate-pulse">Loading course...</h1>
      </div>
    );
  }

  const originalPrice = 5999;
  const discount = Math.round(((originalPrice - course.price) / originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 md:p-10">

      {/* Page Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        Course Details —{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          {course.title}
        </span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* Left Content Panel */}
        <div className="lg:col-span-2 space-y-8">

          {/* Course Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src={course.image?.url}
              alt={course.title}
              className="w-full h-80 object-cover hover:scale-110 transition-transform duration-500"
            />

            {/* Rating Badge */}
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold shadow-md">
              ⭐ {course.rating || "4.5"}
            </div>

            {/* Discount Badge */}
            <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              {discount}% OFF
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">About This Course</h2>
            <p className="text-gray-600 leading-relaxed">{course.description}</p>
          </div>

          {/* Key Details */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Course Details</h2>
            <ul className="space-y-2 text-gray-700">
              {course.level && <li><strong>Level:</strong> {course.level}</li>}
              {course.language && <li><strong>Language:</strong> {course.language}</li>}
              {course.totalLectures && <li><strong>Total Lectures:</strong> {course.totalLectures}</li>}
              {course.courseDuration && <li><strong>Duration:</strong> {course.courseDuration}</li>}
              {course.instructorName && <li><strong>Instructor:</strong> {course.instructorName}</li>}
            </ul>
          </div>

          {/* What You Will Learn */}
          {course.whatYouWillLearn?.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">What You Will Learn</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                {course.whatYouWillLearn.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* RIGHT Pricing Sticky Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-20">

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Price</h2>

            <div className="mb-4">
              <span className="text-4xl font-extrabold text-gray-900">₹{course.price}</span>
              <span className="text-gray-400 line-through ml-3">₹{originalPrice}</span>
            </div>

            <div className="text-gray-600 mb-6 flex items-center gap-2">
              <i className="fas fa-users text-blue-600"></i>
              {course.students?.toLocaleString() || 0} students enrolled
            </div>

            <Link
              to={`/buy/${course._id}`}
              className="w-full block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              Enroll Now
            </Link>

          </div>
        </div>

      </div>

    </div>
  );
}

export default CourseDetails;



// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// function CourseDetails() {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4001/api/v1/course/${courseId}`);
//         setCourse(res.data.course);
//       } catch (err) {
//         console.log("Error loading course details", err);
//       }
//     };
//     fetchCourse();
//   }, [courseId]);

//   if (!course) return <h1 className="text-center mt-20 text-white">Loading...</h1>;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
//       <div className="bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-md p-6 overflow-auto max-h-[80vh]">
//         {/* Course Image */}
//         <img
//           src={course.image?.url}
//           className="w-full h-48 object-cover rounded-lg mb-4"
//           alt={course.title}
//         />

//         {/* Course Title */}
//         <h1 className="text-2xl font-bold text-orange-400 mb-2">{course.title}</h1>

//         {/* Short Description */}
//         <p className="text-gray-300 mb-4">{course.description}</p>

//         {/* More Details Section */}
//         {course.level && <p><strong>Level:</strong> {course.level}</p>}
//         {course.language && <p><strong>Language:</strong> {course.language}</p>}
//         {course.totalLectures && <p><strong>Total Lectures:</strong> {course.totalLectures}</p>}
//         {course.courseDuration && <p><strong>Duration:</strong> {course.courseDuration}</p>}
//         {course.instructorName && (
//           <p><strong>Instructor:</strong> {course.instructorName}</p>
//         )}

//         {/* What You Will Learn */}
//         {course.whatYouWillLearn?.length > 0 && (
//           <div className="mt-4">
//             <h2 className="font-semibold mb-1">What You Will Learn:</h2>
//             <ul className="list-disc ml-6">
//               {course.whatYouWillLearn.map((item, idx) => (
//                 <li key={idx}>{item}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Price */}
//         <p className="text-2xl font-bold text-green-400 mt-4">₹{course.price}</p>

//         {/* Enroll Button */}
//         <Link
//           to={`/buy/${course._id}`}
//           className="mt-6 inline-block bg-orange-500 px-6 py-2 rounded-lg text-white hover:bg-orange-600"
//         >
//           Enroll Now
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default CourseDetails;




// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// function CourseDetails() {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4001/api/v1/course/${courseId}`);
//         setCourse(res.data.course);
//       } catch (err) {
//         console.log("Error loading course details", err);
//       }
//     };
//     fetchCourse();
//   }, []);

//   if (!course) return <h1 className="text-center mt-20 text-white">Loading...</h1>;

//   return (
//     <div className="container mx-auto p-10 text-white">
//       <div className="bg-gray-900 p-6 rounded-lg">
//         <img src={course.image?.url} className="w-full h-60 object-cover rounded-lg" />

//         <h1 className="text-3xl font-bold mt-4 text-orange-400">{course.title}</h1>
//         <p className="mt-4 text-gray-300">{course.description}</p>

//         <p className="text-2xl font-bold text-green-400 mt-4">₹{course.price}</p>

//         <Link
//           to={`/buy/${course._id}`}
//           className="mt-6 inline-block bg-orange-500 px-6 py-2 rounded-lg text-white hover:bg-orange-600"
//         >
//           Enroll Now
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default CourseDetails;
