import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    shortDescription: String,
    longDescription: String,

    level: String,              // Beginner, Intermediate, Advanced
    language: String,           // English, Hindi, etc.
    totalLectures: Number,      // Example: 35
    courseDuration: String,     // Example: "6 hours"

    instructorName: String,
    instructorImage: String,

    whatYouWillLearn: [String], // Array of bullet points
    requirements: [String],     // Array of prerequisites

}, { timestamps: true });




export const Course = mongoose.model("Course", courseSchema);
