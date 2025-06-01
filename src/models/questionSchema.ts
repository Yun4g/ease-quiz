import mongoose, { Schema, Document, models } from 'mongoose';

interface Question {
  question: string;
  answer: string;
}

export interface CourseDocument extends Document {
  courseTitle: string;
  coursesLevel: string;
  questionData: Question[];
}

const QuestionSchema = new Schema<Question>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const CourseSchema = new Schema<CourseDocument>(
  {
    courseTitle: { type: String, required: true },
    coursesLevel: { type: String, required: true },
    questionData: { type: [QuestionSchema], required: true },
  },

  {
    timestamps: true,
   
  }
 
);

 const CourseModel = models.Course || mongoose.model<CourseDocument>('Course', CourseSchema);
 export default CourseModel;
