import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from 'cloudinary';
import { Purchase } from "../models/purchase.model.js";


// export const createCourse = async (req, res) => {
//     const adminId = req.adminId; // <- use req.adminId set in middleware

//     const { title, description, price } = req.body;

//     try {
//         if (!title || !description || !price) {
//             return res.status(400).json({ error: "All fields are required" })
//         }
//         const { image } = req.files;
//         if (!req.files || Object.keys(req.files).length === 0) {
//             return res.status(400).json({ error: "No file uploaded" });
//         }
//         const allowedFormat = ["image/jpeg", "image/png"]
//         if (!allowedFormat.includes(image.mimetype)) {
//             return res.status(400).json({ error: "Invalid image format" });
//         }
//         //claudinary code
//         const cloud_response = await cloudinary.uploader.upload(image.tempFilePath)
//         if (!cloud_response || cloud_response.error || !cloud_response.secure_url) {
//             return res.status(400).json({ errors: "Error uploading file to cloudinary" });
//         }

//         const courseData = {
//             title,
//             description,
//             price,
//             image: {
//                 public_id: cloud_response.public_id,
//                 url: cloud_response.url,
//             },
//             creatorId: adminId
//         };
//         const course = await Course.create(courseData)
//         res.json({
//             message: "Course created successfully",
//             course,
//         });
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ errors: "Error creating course" });
//     }
// };

export const createCourse = async (req, res) => {
    const adminId = req.adminId;
    const {
        title,
        description,
        shortDescription,
        longDescription,
        price,
        level,
        language,
        totalLectures,
        courseDuration,
        instructorName,
        instructorImage,
        whatYouWillLearn,
        requirements
    } = req.body;

    try {
        if (!title || !description || !price) {
            return res.status(400).json({ error: "Title, description and price are required" });
        }

        const { image } = req.files;
        if (!image) return res.status(400).json({ error: "No image uploaded" });

        // Upload to Cloudinary
        const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
        if (!cloud_response || cloud_response.error || !cloud_response.secure_url) {
            return res.status(400).json({ error: "Error uploading image" });
        }

        const courseData = {
            title,
            description,
            shortDescription,
            longDescription,
            price,
            level,
            language,
            totalLectures,
            courseDuration,
            instructorName,
            instructorImage,
            whatYouWillLearn: whatYouWillLearn ? JSON.parse(whatYouWillLearn) : [],
            requirements: requirements ? JSON.parse(requirements) : [],
            image: {
                public_id: cloud_response.public_id,
                url: cloud_response.secure_url
            },
            creatorId: adminId
        };

        const course = await Course.create(courseData);
        res.json({ message: "Course created successfully", course });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating course" });
    }
};


// export const updateCourse = async (req, res) => {
//     const adminId = req.adminId;
//     const { courseId } = req.params;
//     const { title, description, price, image } = req.body;
//     try {
//         const courseSearch = await Course.findById(courseId);
//         if (!courseSearch) {
//             return res.status(400).json({ error: "Course not found" })
//         }
//         const course = await Course.findOneAndUpdate(
//             {
//                 _id: courseId,
//                 creatorId: adminId
//             },
//             {
//                 title,
//                 description,
//                 price,
//                 image: {
//                     public_id: image?.public_id,
//                     url: image?.url,
//                 },
//             }
//         ); if (!course) {
//             return res.status(404).json({ errors: "Can't update ,created by other admin " })
//         }
//         res.status(201).json({ message: "Course updated successfully", course })
//     } catch (error) {
//         res.status(500).json({ error: "Error updating course" })
//         console.log("error in course updating", error)
//     }
// };

export const updateCourse = async (req, res) => {
    const adminId = req.adminId;
    const { courseId } = req.params;

    const {
        title,
        description,
        shortDescription,
        longDescription,
        price,
        level,
        language,
        totalLectures,
        courseDuration,
        instructorName,
        instructorImage,
        whatYouWillLearn,
        requirements,
        image
    } = req.body;

    try {
        const course = await Course.findOneAndUpdate(
            { _id: courseId, creatorId: adminId },
            {
                title,
                description,
                shortDescription,
                longDescription,
                price,
                level,
                language,
                totalLectures,
                courseDuration,
                instructorName,
                instructorImage,
                whatYouWillLearn: whatYouWillLearn ? JSON.parse(whatYouWillLearn) : [],
                requirements: requirements ? JSON.parse(requirements) : [],
                image: image ? { public_id: image.public_id, url: image.url } : undefined
            },
            { new: true }
        );

        if (!course) return res.status(404).json({ error: "Course not found or not yours" });

        res.json({ message: "Course updated successfully", course });

    } catch (error) {
        console.log("Error updating course:", error);
        res.status(500).json({ error: "Error updating course" });
    }
};


export const deleteCourse = async (req, res) => {
    const adminId = req.adminId;
    const { courseId } = req.params;
    try {

        const course = await Course.findOneAndDelete({
            _id: courseId,
            creatorId: adminId
        })
        if (!course) {
            return res.status(400).json({ errors: "can't delete , created by other admin" })
        }
        res.status(200).json({ message: "Course deleted successfully" })


    } catch (error) {
        res.status(500).json({ errors: "Error deleting course" });
        console.log("error in course deleting", error)

    }
};
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(201).json({ courses })
    } catch (error) {
        console.log("error in getting courses", error)

    }
};
export const courseDetails = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({ error: "Course not found" })
        }
        res.status(200).json({ course });
    } catch (error) {
        res.status(500).json({ error: "Error fetching course details" })
        console.log("Error in fetching course details", error);
    }
};

import Stripe from "stripe"
import config from "../config.js";
// const stripe = new Stripe(config.STRIPE_SECRET_KEY);
// console.log(config.STRIPE_SECRET_KEY);

// export const buyCourse = async (req, res) => {
//     const userId = req.userId; // <- use req.userId set in middleware
//     const { courseId } = req.params;

//     try {
//         const course = await Course.findById(courseId);
//         if (!course) {
//             return res.status(400).json({ error: "Course not found" });
//         }

//         const existingPurchase = await Purchase.findOne({ userId, courseId });
//         if (existingPurchase) {
//             return res.status(400).json({ error: "Course already purchased" });
//         }
//         //  stripe payment gateway
//         const amount = course.price
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: amount,
//             currency: "usd",
//             payment_method_types: ["card"],
//             course,
//             metadata:{userId,courseId},
//             clientSecret: paymentIntent.client_secret,
//         });
//         res.status(200).json({
//             course,
//             clientSecret: paymentIntent.client_secret,
//         });
//     } catch (error) {
//         console.error("Error in buying course : ", error);
//         res.status(500).json({ error: "error in creating payment intent " });
//     }
// };


const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export const buyCourse = async (req, res) => {
  const userId = req.userId; // set in middleware
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ error: "Course not found" });
    }

    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({ error: "Course already purchased" });
    }

    // ✅ Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: course.price * 100, // Stripe expects cents
      currency: "usd",            // or "inr" for testing
      payment_method_types: ["card"],
      metadata: { userId, courseId },
    });

    // ✅ Return course + clientSecret
    res.status(200).json({
      course,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error in buyCourse:", error);
    res.status(500).json({ error: "Error creating payment intent" });
  }
};
