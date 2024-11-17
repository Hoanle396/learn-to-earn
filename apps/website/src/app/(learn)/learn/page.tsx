"use client"
import Image from "next/image";
import { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { FiBookmark, FiFilter, FiPlay, FiSearch } from "react-icons/fi";

const LearningPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      description: "Learn the basics of HTML, CSS, and JavaScript",
      progress: 75,
      difficulty: "beginner",
      category: "development",
      image: "images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      description: "Master advanced React concepts and patterns",
      progress: 30,
      difficulty: "advanced",
      category: "development",
      image: "images.unsplash.com/photo-1633356122544-f134324a6cee"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description: "Learn essential UI/UX design principles",
      progress: 50,
      difficulty: "intermediate",
      category: "design",
      image: "images.unsplash.com/photo-1507238691740-187a5b1d37b8"
    }
  ];

  const toggleBookmark = (courseId: number) => {
    // @ts-expect-error ignore
    setBookmarkedItems((prev) =>
      prev.includes(courseId as never)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const filteredCourses = courses.filter(
    (course) =>
      (selectedFilter === "all" || course.category === selectedFilter) &&
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Platform</h1>
          <p className="text-lg text-gray-600">Expand your knowledge with our comprehensive courses</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="development">Development</option>
              <option value="design">Design</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <FiFilter />
              Filters
            </button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex-col relative h-[30rem]"
            >
              <div className="relative h-48 w-full flex top-0">
                <Image
                  fill
                  src={`https://${course.image}`}
                  alt={course.title}
                  className="w-full h-full object-cover rounded-xl absolute top-0 left-0 right-0"
                />
                <button
                  onClick={() => toggleBookmark(course.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <FiBookmark
                    className={bookmarkedItems.includes(course.id as never) ? "text-blue-500" : "text-gray-400"}
                  />
                </button>
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {course.difficulty}
                  </span>
                  <div className="flex items-center gap-1">
                    <BsStarFill className="text-yellow-400" />
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
              </div>
              <div className="p-4 absolute bottom-0 w-full">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-blue-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <FiPlay />
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quiz Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Assessment</h2>
          <div className="space-y-6">
            <div className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What is the main purpose of HTML?</h3>
              <div className="space-y-3">
                {["Structure", "Styling", "Interactivity", "Database"].map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input type="radio" name="question1" className="form-radio text-blue-500" />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
