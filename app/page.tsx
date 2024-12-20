// app/page.tsx
import { Suspense } from "react";
import { Course } from "@/types/courses";
import CourseSearchClient from "./components/ClientSearch";
import { DEPARTMENTS } from "./data/departments";

async function getCourses(): Promise<Course[]> {
  const res = await fetch(`${process.env.API_URL}/courses`, {
    cache: "force-cache", // This enables caching
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
}

export default async function CoursePage() {
  const courses = await getCourses();

  return (
    <div className="mx-auto max-w-6xl p-4">
      <Suspense fallback={<CourseSearchSkeleton />}>
        <CourseSearchClient
          initialCourses={courses}
          departments={DEPARTMENTS}
        />
      </Suspense>
    </div>
  );
}

// Skeleton loader component
function CourseSearchSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-1/4 animate-pulse rounded bg-gray-200" />
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded bg-gray-200" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
