// CourseExplorer.jsx
import { Suspense } from "react";
import CourseNode from "./CourseNode";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

// This data would eventually come from your database
const MOCK_COURSE_INFO = {
  CS101: {
    title: "Introduction to Computer Science",
    description:
      "Fundamental concepts of programming and computer science. Covers basic algorithms, data structures, and problem-solving techniques.",
    credits: 3,
    dependencies: ["MATH101", "CS100"],
  },
  MATH101: {
    title: "Calculus I",
    description:
      "Introduction to differential and integral calculus of functions of one variable.",
    credits: 4,
    dependencies: ["ALG101"],
  },
  CS100: {
    title: "Computer Science Foundations",
    description:
      "Basic computer concepts, introduction to programming logic, and problem-solving methods.",
    credits: 3,
    dependencies: ["MATH100"],
  },
  ALG101: {
    title: "Introduction to Algebra",
    description: "Fundamental algebraic concepts and operations.",
    credits: 3,
    dependencies: [],
  },
  MATH100: {
    title: "Pre-Calculus",
    description:
      "Preparation for calculus covering functions, trigonometry, and analytical geometry.",
    credits: 3,
    dependencies: [],
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const code = (await params).code.toUpperCase();
  const rootCourse = await getCourseInfo(code);
  if (rootCourse === undefined) {
    throw new Error("Course not found");
  }
  return (
    <Suspense fallback={<div>Loading course tree...</div>}>
      <CourseNode
        courseCode={code}
        className="mt-12"
        initialCourseInfo={rootCourse}
        allCoursesInfo={MOCK_COURSE_INFO}
      />
    </Suspense>
  );
}

async function getCourseInfo(courseCode: any) {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return MOCK_COURSE_INFO[courseCode as keyof typeof MOCK_COURSE_INFO];
}
