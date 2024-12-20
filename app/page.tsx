"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data - replace with your actual course data
const COURSES = {
  CS101: {
    code: "CS101",
    title: "Introduction to Computer Science",
    description: "Fundamental concepts of programming and computer science.",
    credits: 3,
    department: "CS",
    dependencies: ["MATH101", "CS100"],
  },
  MATH101: {
    code: "MATH101",
    title: "Calculus I",
    description: "Introduction to differential and integral calculus.",
    credits: 4,
    department: "MATH",
    dependencies: ["ALG101"],
  },
  // ... more courses
};

const DEPARTMENTS = [
  { id: "CS", name: "Computer Science" },
  { id: "MATH", name: "Mathematics" },
  { id: "PHYS", name: "Physics" },
  { id: "CHEM", name: "Chemistry" },
  // ... more departments
];

const CREDIT_OPTIONS = [1, 2, 3, 4, 5];

const CourseSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [creditFilter, setCreditFilter] = useState("all");

  const filterCourses = () => {
    return Object.values(COURSES).filter((course) => {
      const matchesSearch =
        !searchQuery ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        departmentFilter === "all" || course.department === departmentFilter;

      const matchesCredits =
        creditFilter === "all" || course.credits.toString() === creditFilter;

      return matchesSearch && matchesDepartment && matchesCredits;
    });
  };

  const filteredCourses = filterCourses();

  return (
    <div className="mx-auto max-w-6xl p-4">
      <Card>
        <CardHeader>
          <CardTitle>Course Explorer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Search Input */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="search">Search Courses</Label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                    size={16}
                  />
                  <Input
                    id="search"
                    placeholder="Search by code or title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Department Filter */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={departmentFilter}
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Credits Filter */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="credits">Credits</Label>
                <Select value={creditFilter} onValueChange={setCreditFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by credits" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Credits</SelectItem>
                    {CREDIT_OPTIONS.map((credits) => (
                      <SelectItem key={credits} value={credits.toString()}>
                        {credits} {credits === 1 ? "Credit" : "Credits"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results */}
            <div className="mt-6">
              {filteredCourses.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  No courses match your search criteria
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCourses.map((course) => (
                    <Link
                      href={`/${course.code}`}
                      key={course.code}
                      className="block hover:no-underline"
                    >
                      <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
                        <CardContent className="pt-6">
                          <div>
                            <div className="mb-2 flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-foreground">
                                  {course.code}
                                </h3>
                                <h4 className="text-gray-600">
                                  {course.title}
                                </h4>
                              </div>
                              <span className="text-sm text-gray-500">
                                {course.credits}{" "}
                                {course.credits === 1 ? "credit" : "credits"}
                              </span>
                            </div>
                            <p className="line-clamp-2 text-sm text-gray-600">
                              {course.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseSearch;
