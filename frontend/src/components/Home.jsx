// import React, { useEffect, useState } from "react";
// import logo from "../../public/logo.webp";
// import { Link } from "react-router-dom";
// import { FaFacebook } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import axios from "axios";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import toast from "react-hot-toast";
// import { BACKEND_URL } from "../utils/utils";
// function Home() {
//   const [courses, setCourses] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // token
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   // fetch courses
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4001/api/v1/course/courses`, {
//           withCredentials: true,
//         });
//         console.log(response.data.courses);
//         setCourses(response.data.courses);
//       } catch (error) {
//         console.log("error in fetchCourses ", error);
//       }
//     };
//     fetchCourses();
//   }, []);

//   // logout
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

//   var settings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     autoplay: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 2,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="bg-gradient-to-r from-black to-blue-950 ">
//       <div className="h-[1250px] md:h-[1050px] text-white container mx-auto">
//         {/* Header */}
//         <header className="flex items-center justify-between p-6 ">
//           <div className="flex items-center space-x-2">
//             <img
//               src={logo}
//               alt=""
//               className="w-7 h-7 md:w-10 md:h-10 rounded-full"
//             />
//             <h1 className="md:text-2xl text-orange-500 font-bold">
//               CourseHeaven
//             </h1>
//           </div>
//           <div className="space-x-4">
//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <Link
//                   to={"/login"}
//                   className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to={"/signup"}
//                   className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
//                 >
//                   Signup
//                 </Link>
//               </>
//             )}
//           </div>
//         </header>

//         {/* Main section */}
//         <section className="text-center py-20">
//           <h1 className="text-4xl font-semibold text-orange-500">
//             CourseHaven
//           </h1>

//           <br />
//           <p className="text-gray-500">
//             Sharpen your skills with courses crafted by experts.
//           </p>
//           <div className="space-x-4 mt-8">
//             <Link
//               to={"/courses"}
//               className="bg-green-500 text-white p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black"
//             >
//               Explore courses
//             </Link>
//             <Link
//               to={"https://www.youtube.com/learncodingofficial"}
//               className="bg-white text-black  p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-green-500 duration-300 hover:text-white"
//             >
//               Courses videos
//             </Link>
//           </div>
//         </section>
//         <section className="p-10">
//           <Slider className="" {...settings}>
//             {courses.map((course) => (
//               <div key={course._id} className="p-4">
//                 <div className="relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
//                   <div className="bg-gray-900 rounded-lg overflow-hidden">
//                     <img
//                       className="h-32 w-full object-contain"
//                       src={course.image?.url}
//                       alt=""
//                     />
//                     <div className="p-6 text-center">
//                       <h2 className="text-xl font-bold text-white">
//                         {course.title}
//                       </h2>
//                       <Link to={`/course/${course._id}`} className="mt-8 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 duration-300">
//                         Enroll Now
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </section>

//         <hr />
//         {/* Footer */}
//         <footer className="my-12">
//           <div className="grid grid-cols-1 md:grid-cols-3">
//             <div className="flex flex-col items-center md:items-start">
//               <div className="flex items-center space-x-2">
//                 <img src={logo} alt="" className="w-10 h-10 rounded-full" />
//                 <h1 className="text-2xl text-orange-500 font-bold">
//                   CourseHaeven
//                 </h1>
//               </div>
//               <div className="mt-3 ml-2 md:ml-8">
//                 <p className="mb-2">Follow us</p>
//                 <div className="flex space-x-4">
//                   <a href="">
//                     <FaFacebook className="text-2xl hover:text-blue-400 duration-300" />
//                   </a>
//                   <a href="">
//                     <FaInstagram className="text-2xl hover:text-pink-600 duration-300" />
//                   </a>
//                   <a href="">
//                     <FaTwitter className="text-2xl hover:text-blue-600 duration-300" />
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <div className="items-center mt-6 md:mt-0 flex flex-col">
//               <h3 className="text-lg font-semibold md:mb-4">connects</h3>
//               <ul className=" space-y-2 text-gray-400">
//                 <li className="hover:text-white cursor-pointer duration-300">
//                   Youtube
//                 </li>
//                 <li className="hover:text-white cursor-pointer duration-300">
//                   Telegram
//                 </li>
//                 <li className="hover:text-white cursor-pointer duration-300">
//                   Github
//                 </li>
//               </ul>
//             </div>
//             <div className="items-center mt-6 md:mt-0 flex flex-col">
//               <h3 className="text-lg font-semibold mb-4">
//                 copyrights &#169; 2025
//               </h3>
//               <ul className=" space-y-2 text-center text-gray-400">
//                 <li className="hover:text-white cursor-pointer duration-300">
//                   Terms & Conditions
//                 </li>
//                 <li className="hover:text-white cursor-pointer duration-300">
//                   Privacy Policy
//                 </li>
//                 <li className="hover:text-white cursor-pointer duration-300">
//                   Refund & Cancellation
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default Home;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaPlay, FaStar, FaUsers, FaBook, FaAward } from "react-icons/fa";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //  token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    setIsVisible(true);
    axios
      .get("http://localhost:4001/api/v1/course/courses")
      .then((res) => {
        console.log("📌 Courses Data:", res.data.courses);
        setCourses(res.data.courses);
      })
      .catch((e) => console.log("Fetch Error:", e));
  }, []);
   const handleLogout = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/api/v1/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const stats = [
    { icon: <FaUsers />, value: "50K+", label: "Active Students" },
    { icon: <FaBook />, value: "200+", label: "Quality Courses" },
    { icon: <FaStar />, value: "4.8", label: "Average Rating" },
    { icon: <FaAward />, value: "15K+", label: "Certificates" },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CourseHeaven
              </h1>
            </div>

            <div className="flex gap-2 md:gap-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-3 md:px-5 py-2 text-sm md:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 md:px-5 py-2 text-sm md:text-base bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="px-3 md:px-5 py-2 text-sm md:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-28">
        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-32 h-32 md:w-72 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-32 h-32 md:w-72 md:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Left Content */}
            <div className={`text-center md:text-left space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4">
                <span className="text-blue-700 font-semibold text-sm">🎓 #1 Learning Platform</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Transform Your Future
                </span>
                <br />
                <span className="text-gray-800">With Expert Courses</span>
              </h1>

              <p className="text-gray-600 text-base md:text-lg lg:text-xl max-w-xl mx-auto md:mx-0">
                Master in-demand skills with world-class instructors. Start learning today and unlock your potential with our comprehensive courses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Link
                  to="/courses"
                  className="group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-base md:text-lg flex items-center justify-center gap-2"
                >
                  Get Started
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>

                <a
                  href="https://youtube.com/learncodingofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 md:px-8 py-3 md:py-4 bg-white border-2 border-gray-300 text-gray-800 rounded-full hover:border-blue-600 hover:shadow-xl transition-all duration-300 font-bold text-base md:text-lg flex items-center justify-center gap-2"
                >
                  <FaPlay className="text-blue-600" />
                  Watch Demo
                </a>
              </div>
            </div>

            {/* Right Visual */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative w-full max-w-lg mx-auto">
                {/* Floating Cards */}
                <div className="absolute -top-4 -left-4 md:-top-8 md:-left-8 bg-white p-3 md:p-4 rounded-xl shadow-2xl animate-float">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-lg md:text-2xl">✓</span>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-gray-800">Course Completed</p>
                      <p className="text-xs text-gray-500">Web Development</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-white p-3 md:p-4 rounded-xl shadow-2xl animate-float animation-delay-2000">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <FaStar className="text-yellow-500 text-sm md:text-base" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-gray-800">5.0 Rating</p>
                      <p className="text-xs text-gray-500">1,250 Reviews</p>
                    </div>
                  </div>
                </div>

                {/* Main Image */}
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 md:p-8 shadow-2xl">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 space-y-4">
                    <div className="h-32 md:h-48 bg-white/20 rounded-xl flex items-center justify-center">
                      <FaBook className="text-4xl md:text-6xl text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 md:h-4 bg-white/30 rounded"></div>
                      <div className="h-3 md:h-4 bg-white/20 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 md:p-6 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-2xl md:text-4xl text-blue-600 mb-2 md:mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section className="py-12 md:py-20 container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Explore Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Popular Courses</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Choose from hundreds of courses with new additions published every month
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        ) : (
          <Slider {...settings}>
            {courses.map((course, index) => (
              <div key={course._id} className="p-3 md:p-4">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">

                  {/* Image */}
                  <div className="relative h-48 md:h-56 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={course.image?.url || `https://via.placeholder.com/400x300?text=Course+${index + 1}`}
                      alt={course.title}
                    />
                    <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs md:text-sm font-bold flex items-center gap-1">
                      <FaStar /> 4.8
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 line-clamp-2 min-h-[3.5rem]">
                      {course.title}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
                        <FaUsers className="text-blue-600" /> 2.5k students
                      </span>
                      <span className="text-base md:text-lg font-bold text-blue-600">
                        ${course.price || '49.99'}
                      </span>
                    </div>

                    <Link
                      to={`/course/${course._id}`}
                      className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 md:py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </section>

      {/* CTA SECTION */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-blue-100 text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on CourseHeaven
          </p>
          <Link
            to="/signup"
            className="inline-block px-6 md:px-10 py-3 md:py-4 bg-white text-blue-600 rounded-full font-bold text-base md:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Join Now for Free
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-4">CourseHeaven</h3>
              <p className="text-gray-400 text-sm">Empowering learners worldwide with quality education</p>
            </div>

            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/courses" className="hover:text-white transition">All Courses</Link></li>
                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                  <FaFacebook />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition">
                  <FaTwitter />
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 CourseHeaven. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;