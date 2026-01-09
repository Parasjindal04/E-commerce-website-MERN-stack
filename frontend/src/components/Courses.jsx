import React, { useState, useEffect } from "react";

const sampleCourses = [
  {
    _id: "1",
    title: "Complete Web Development Bootcamp 2025",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive web development course. Build real-world projects and launch your career.",
    price: 4999,
    image: { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop" },
    rating: 4.8,
    students: 2500,
  },
  {
    _id: "2",
    title: "Data Science & Machine Learning Masterclass",
    description:
      "Master Python, pandas, scikit-learn, TensorFlow and more. Build ML models and start your data science journey today.",
    price: 5999,
    image: { url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop" },
    rating: 4.9,
    students: 3200,
  },
  {
    _id: "3",
    title: "UI/UX Design Complete Course",
    description:
      "Learn Figma, Adobe XD, user research, prototyping and create stunning designs that users love.",
    price: 4499,
    image: { url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop" },
    rating: 4.7,
    students: 1800,
  },
  {
    _id: "4",
    title: "Digital Marketing Mastery 2025",
    description:
      "Master SEO, social media marketing, Google Ads, email marketing and grow your business online.",
    price: 3999,
    image: { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
    rating: 4.6,
    students: 2100,
  },
  {
    _id: "5",
    title: "Mobile App Development with React Native",
    description: "Build iOS and Android apps using React Native. Learn to create professional mobile applications.",
    price: 5499,
    image: { url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop" },
    rating: 4.8,
    students: 1950,
  },
  {
    _id: "6",
    title: "Python Programming for Beginners",
    description: "Start your programming journey with Python. Learn fundamentals, data structures, and build projects.",
    price: 2999,
    image: { url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop" },
    rating: 4.9,
    students: 4200,
  },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(sampleCourses);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const buyCourse = (id) => {
    alert(`Redirecting to purchase page for course: ${id}`);
  };

  return (
    <div className="flex">
      {/* Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-lg p-2 shadow-lg hover:shadow-xl transition-all"
        onClick={() => setSidebarOpen(true)}
      >
        <i className="fas fa-bars text-2xl text-gray-800"></i>
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white w-64 p-6 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40 transition-transform duration-300 ease-in-out shadow-2xl`}
      >
        {/* Close Button */}
        <button
          className="md:hidden absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
          onClick={() => setSidebarOpen(false)}
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 mt-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            CourseHeaven
          </h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
          >
            <i className="fas fa-home text-gray-600 group-hover:text-blue-600 transition-colors"></i>
            <span className="text-gray-700 group-hover:text-blue-600 font-medium transition-colors">
              Home
            </span>
          </a>

          <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
            <i className="fas fa-book text-white"></i>
            <span className="text-white font-semibold">Courses</span>
          </a>

          <a
            href="/purchases"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
          >
            <i className="fas fa-download text-gray-600 group-hover:text-blue-600 transition-colors"></i>
            <span className="text-gray-700 group-hover:text-blue-600 font-medium transition-colors">
              Purchases
            </span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
          >
            <i className="fas fa-cog text-gray-600 group-hover:text-blue-600 transition-colors"></i>
            <span className="text-gray-700 group-hover:text-blue-600 font-medium transition-colors">
              Settings
            </span>
          </a>

          <div className="pt-6 border-t border-gray-200 mt-6">
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-all duration-300 group w-full"
              onClick={() => alert("Logout functionality - connect to your backend")}
            >
              <i className="fas fa-sign-out-alt text-gray-600 group-hover:text-red-600 transition-colors"></i>
              <span className="text-gray-700 group-hover:text-red-600 font-medium transition-colors">
                Logout
              </span>
            </button>
          </div>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">Premium Member</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-10 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="ml-12 md:ml-0">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Explore{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                  Courses
                </span>
              </h1>
              <p className="text-gray-600">Discover your next learning adventure</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="flex items-center bg-white rounded-full shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="px-4 py-2 md:py-3 w-48 md:w-64 focus:outline-none text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="px-4 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-opacity">
                  <i className="fas fa-search"></i>
                </button>
              </div>

              {/* User Avatar */}
              <div className="md:block w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-md">
                <i className="fas fa-user text-xl"></i>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 ml-12 md:ml-0">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all">
              All Courses
            </button>
            {["Web Development", "Data Science", "Design", "Business"].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        {/* Courses Grid */}
        <div
          className="overflow-y-auto custom-scrollbar"
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          {/* Loading State */}
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <div className="h-48 bg-gray-200 animate-pulse"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-6 rounded bg-gray-200 animate-pulse"></div>
                      <div className="h-4 rounded w-3/4 bg-gray-200 animate-pulse"></div>
                      <div className="h-4 rounded w-1/2 bg-gray-200 animate-pulse"></div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Courses */}
          {!loading && filteredCourses.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course, index) => {
                const originalPrice = 5999;
                const discount = Math.round(((originalPrice - course.price) / originalPrice) * 100);

                return (
                  <div
                    key={course._id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                      <img
                        src={course.image.url}
                        alt={course.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-md">
                        <i className="fas fa-star"></i> {course.rating}
                      </div>
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        {discount}% OFF
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                        <i className="fas fa-users text-blue-600"></i>
                        <span>{course.students.toLocaleString()} students</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-gray-800">₹{course.price}</span>
                          <span className="text-sm text-gray-400 line-through ml-2">₹{originalPrice}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => buyCourse(course._id)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <i className="fas fa-shopping-cart"></i> Buy Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <div className="mb-6">
                <i className="fas fa-book-open text-6xl text-gray-300"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Courses Available</h3>
              <p className="text-gray-600">Check back later for new courses</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}




// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Import axios for API call
// import { FaCircleUser } from "react-icons/fa6";
// import { RiHome2Fill } from "react-icons/ri";
// import { FaDiscourse } from "react-icons/fa";
// import { FaDownload } from "react-icons/fa6";
// import { IoMdSettings } from "react-icons/io";
// import { IoLogIn, IoLogOut } from "react-icons/io5";
// import { FiSearch } from "react-icons/fi";
// import { HiMenu, HiX } from "react-icons/hi"; // Import menu and close icons
// import logo from "../../public/logo.webp";
// import toast from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";
// import { BACKEND_URL } from "../utils/utils";

// function Courses() {
//   const [courses, setCourses] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar

//   console.log("courses: ", courses);

//   // Check token
//   useEffect(() => {
//     const token = localStorage.getItem("user");
//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   // Fetch courses
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4001/api/v1/course/courses`, {
//           withCredentials: true,
//         });
//         console.log(response.data.courses);
//         setCourses(response.data.courses);
//         setLoading(false);
//       } catch (error) {
//         console.log("error in fetchCourses ", error);
//       }
//     };
//     fetchCourses();
//   }, []);

//   // Logout
//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4001/api/v1/user/logout`, {
//         withCredentials: true,
//       });
//       toast.success(response.data.message);
//       localStorage.removeItem("user");
//       setIsLoggedIn(false);
//     } catch (error) {
//       console.log("Error in logging out ", error);
//       toast.error(error.response.data.errors || "Error in logging out");
//     }
//   };

//   // Toggle sidebar for mobile devices
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex">
//       {/* Hamburger menu button for mobile */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-800"
//         onClick={toggleSidebar}
//       >
//         {isSidebarOpen ? <HiX /> : <HiMenu />} {/* Toggle menu icon */}
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-screen bg-gray-100 w-64 p-5 transform z-10 transition-transform duration-300 ease-in-out ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:static`}
//       >
//         <div className="flex items-center mb-10 mt-10 md:mt-0">
//           <img src={logo} alt="Profile" className="rounded-full h-12 w-12" />
//         </div>
//         <nav>
//           <ul>
//             <li className="mb-4">
//               <a href="/" className="flex items-center">
//                 <RiHome2Fill className="mr-2" /> Home
//               </a>
//             </li>
//             <li className="mb-4">
//               <a href="#" className="flex items-center text-blue-500">
//                 <FaDiscourse className="mr-2" /> Courses
//               </a>
//             </li>
//             <li className="mb-4">
//               <a href="/purchases" className="flex items-center">
//                 <FaDownload className="mr-2" /> Purchases
//               </a>
//             </li>
//             <li className="mb-4">
//               <a href="#" className="flex items-center">
//                 <IoMdSettings className="mr-2" /> Settings
//               </a>
//             </li>
//             <li>
//               {isLoggedIn ? (
//                 <Link to={"/"}

//                   className="flex items-center"
//                   onClick={handleLogout}
//                 >
//                   <IoLogOut className="mr-2" /> Logout
//                 </Link>
//               ) : (
//                 <Link to={"/login"} className="flex items-center">
//                   <IoLogIn className="mr-2" /> Login
//                 </Link>
//               )}
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main className="ml-0 md:ml-64 w-full bg-white p-10">
//         <header className="flex justify-between items-center mb-10">
//           <h1 className="text-xl font-bold">Courses</h1>
//           <div className="flex items-center space-x-3">
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 placeholder="Type here to search..."
//                 className="border border-gray-300 rounded-l-full px-4 py-2 h-10 focus:outline-none"
//               />
//               <button className="h-10 border border-gray-300 rounded-r-full px-4 flex items-center justify-center">
//                 <FiSearch className="text-xl text-gray-600" />
//               </button>
//             </div>

//             <FaCircleUser className="text-4xl text-blue-600" />
//           </div>
//         </header>

//         {/* Vertically Scrollable Courses Section */}
//         <div className="overflow-y-auto h-[75vh]">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading...</p>
//           ) : courses.length === 0 ? (
//             // Check if courses array is empty
//             <p className="text-center text-gray-500">
//               No course posted yet by admin
//             </p>
//           ) : (
//             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {courses.map((course) => (
//                 <div
//                   key={course._id}
//                   className="border border-gray-200 rounded-lg p-4 shadow-sm"
//                 >
//                   <img
//                     src={course.image?.url}
//                     alt={course.title}
//                     className="rounded mb-4"
//                   />
//                   <h2 className="font-bold text-lg mb-2">{course.title}</h2>
//                   <p className="text-gray-600 mb-4">
//                     {course.description.length > 100
//                       ? `${course.description.slice(0, 100)}...`
//                       : course.description}
//                   </p>
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="font-bold text-xl">
//                       ₹{course.price}{" "}
//                       <span className="text-gray-500 line-through">5999</span>
//                     </span>
//                     <span className="text-green-600">20% off</span>
//                   </div>

//                   {/* Buy page */}
//                   <Link
//                     to={`/buy/${course._id}`} // Pass courseId in URL
//                     className="bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-900 duration-300"
//                   >
//                     Buy Now
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Courses;