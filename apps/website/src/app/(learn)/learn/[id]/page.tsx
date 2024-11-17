"use client"
import { cn } from "@/libs/utils";
import Image from "next/image";
import React, { useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { FaBookmark, FaSearch, FaShareAlt, FaStar, FaTrophy, FaUpload, FaUser } from "react-icons/fa";

const LearningDetailPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showChat, setShowChat] = useState(false);

  const dummyData = {
    courseTitle: "Advanced Web Development Masterclass",
    instructor: {
      name: "Dr. Sarah Johnson",
      expertise: "Full Stack Development",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    overview: "Master modern web development with this comprehensive course covering React, Node.js, and more.",
    syllabus: [
      { title: "Introduction to Web Development", duration: "2 hours" },
      { title: "Frontend Fundamentals", duration: "4 hours" },
      { title: "Backend Development", duration: "6 hours" },
    ],
    reviews: [
      { user: "John D.", rating: 5, comment: "Excellent course content!" },
      { user: "Maria S.", rating: 4, comment: "Very informative and well-structured." },
    ]
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Uploading file:", file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{dummyData.courseTitle}</h1>
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-full hover:bg-gray-200"
                aria-label="Share course"
                onClick={() => console.log("Share clicked")}
              >
                <FaShareAlt className="text-gray-600" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-200"
                aria-label="Bookmark course"
                onClick={() => console.log("Bookmark clicked")}
              >
                <FaBookmark className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search within course..."
              className="w-full p-3 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearch}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="bg-gray-200 rounded-full h-4 mb-4">
            <div
              className={cn("bg-blue-500 h-4 rounded-full transition-all duration-300", `w-[45%]`)}
            />
          </div>
          <p className="text-sm text-gray-600">45% Complete</p>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                {["overview", "syllabus", "instructor", "reviews"].map((tab) => (
                  <li key={tab}>
                    <button
                      className={`w-full text-left p-3 rounded-lg transition ${activeTab === tab ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                      onClick={() => handleTabChange(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gamification */}
            <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <FaTrophy className="text-yellow-500 mr-2" /> Achievements
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((badge) => (
                  <div
                    key={badge}
                    className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center"
                    title={`Badge ${badge}`}
                  >
                    <FaStar className="text-yellow-500" />
                  </div>
                ))}
              </div>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
                  <p className="text-gray-700 mb-6">{dummyData.overview}</p>

                  {/* Video Player */}
                  <div className="aspect-video bg-gray-900 rounded-lg mb-6">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Course Introduction"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* File Upload */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Assignment Upload</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FaUpload className="mx-auto text-gray-400 text-3xl mb-2" />
                      <p className="text-gray-600 mb-2">Drag and drop your files here or</p>
                      <input
                        type="file"
                        className="hidden"
                        id="fileUpload"
                        onChange={handleFileUpload}
                      />
                      <label
                        htmlFor="fileUpload"
                        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
                      >
                        Browse Files
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "syllabus" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Course Syllabus</h2>
                  <div className="space-y-4">
                    {dummyData.syllabus.map((item, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{item.title}</h3>
                          <span className="text-gray-600 text-sm">{item.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "instructor" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Meet Your Instructor</h2>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full relative">
                      <Image
                        fill
                        src={dummyData.instructor.image}
                        alt={dummyData.instructor.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{dummyData.instructor.name}</h3>
                      <p className="text-gray-600">{dummyData.instructor.expertise}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
                  <div className="space-y-4">
                    {dummyData.reviews.map((review, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <FaUser className="text-gray-400 mr-2" />
                          <span className="font-semibold">{review.user}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-500" />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Chat Widget */}
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setShowChat(!showChat)}
            className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
            aria-label="Toggle chat"
          >
            <BsChatDots className="text-xl" />
          </button>

          {showChat && (
            <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Course Discussion</h3>
              </div>
              <div className="h-80 overflow-y-auto p-4">
                {/* Chat messages would go here */}
                <p className="text-gray-500 text-center">Start a conversation!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningDetailPage;
