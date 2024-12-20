"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { ArrowDown, Bookmark, CheckCircle, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

function CourseNode({
  courseCode,
  initialCourseInfo,
  allCoursesInfo,
  level = 0,
  className,
}: {
  courseCode: String;
  initialCourseInfo: any;
  allCoursesInfo: any;
  level?: number;
  className?: String;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      setIsBookmarked(
        getBookmarks().some((course: any) => course.code === courseCode),
      );
      setIsAdded(
        getAddedCourses().some((course: any) => course.code === courseCode),
      );
    };

    checkStatus();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "bookmarkedCourses" || e.key === "addedCourses") {
        checkStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [courseCode]);

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isBookmarked) {
      removeBookmark(courseCode);
    } else {
      const courseData = {
        code: courseCode,
        ...initialCourseInfo,
      };
      addBookmark(courseData);
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const courseData = {
      code: courseCode,
      ...initialCourseInfo,
    };
    toggleAddedCourse(courseData);
    setIsAdded(!isAdded);
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col items-center pb-6">
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <button className="min-w-36 rounded-md border border-gray-800 px-10 py-4 text-base dark:bg-gray-300 dark:text-black">
                  {courseCode}
                </button>
              </PopoverTrigger>
              <PopoverContent className="min-w-64">
                <div className="text-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-medium">{courseCode}</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleBookmark(e)}
                        className="rounded-full p-1"
                      >
                        <Bookmark
                          size={16}
                          className={
                            isBookmarked
                              ? "fill-current text-blue-500"
                              : "text-gray-400"
                          }
                        />
                      </button>
                      <button
                        onClick={(e) => handleAdd(e)}
                        className="rounded-full p-1"
                      >
                        {isAdded ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <Plus size={16} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <h5 className="mb-1 font-medium">
                    {initialCourseInfo.title}
                  </h5>
                  <p className="mb-2 text-gray-600">
                    {initialCourseInfo.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Credits: {initialCourseInfo.credits}
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {isHovered &&
            !isExpanded &&
            initialCourseInfo.dependencies.length > 0 && (
              <button
                onClick={(e) => handleExpand(e)}
                className="absolute bottom-0 rounded-full p-1 transition-colors"
              >
                <ArrowDown
                  size={20}
                  className="text-gray-400 transition-colors hover:text-white"
                />
              </button>
            )}
        </div>
      </div>

      {isExpanded && initialCourseInfo.dependencies.length > 0 && (
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {initialCourseInfo.dependencies.map((dep: any) => (
            <div key={dep} className="relative">
              <div className="absolute -top-6 left-1/2 h-6 w-px -translate-x-1/2 transform bg-gray-300" />
              <CourseNode
                courseCode={dep}
                initialCourseInfo={allCoursesInfo[dep]}
                allCoursesInfo={allCoursesInfo}
                level={level + 1}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseNode;

// Utility functions for bookmark management
const getBookmarks = () => {
  const stored = localStorage.getItem("bookmarkedCourses");
  return stored ? JSON.parse(stored) : [];
};

const addBookmark = (course: any) => {
  const bookmarks = getBookmarks();
  if (!bookmarks.some((b: any) => b.code === course.code)) {
    bookmarks.push({
      code: course.code,
      title: course.title,
      description: course.description,
      credits: course.credits,
      dependencies: course.dependencies,
      bookmarkedAt: new Date().toISOString(),
    });
    localStorage.setItem("bookmarkedCourses", JSON.stringify(bookmarks));
  }
};

const removeBookmark = (courseCode: any) => {
  const bookmarks = getBookmarks();
  const filtered = bookmarks.filter(
    (course: any) => course.code !== courseCode,
  );
  localStorage.setItem("bookmarkedCourses", JSON.stringify(filtered));
};

// Same pattern for added courses
const getAddedCourses = () => {
  const stored = localStorage.getItem("addedCourses");
  return stored ? JSON.parse(stored) : [];
};

const toggleAddedCourse = (course: any) => {
  const added = getAddedCourses();
  const isCurrentlyAdded = added.some((c: any) => c.code === course.code);
  const newAdded = isCurrentlyAdded
    ? added.filter((c: any) => c.code !== course.code)
    : [
        ...added,
        {
          code: course.code,
          title: course.title,
          description: course.description,
          credits: course.credits,
          dependencies: course.dependencies,
          addedAt: new Date().toISOString(),
        },
      ];
  localStorage.setItem("addedCourses", JSON.stringify(newAdded));
};