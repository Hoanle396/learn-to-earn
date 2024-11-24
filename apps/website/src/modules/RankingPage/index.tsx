"use client"
import React, { useState } from 'react'


type Course = {
  id: number;
  title: string;
  level: string;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
};

// data.ts
const mockCourses: Course[] = [
  {
    id: 1,
    title: "Basic English Grammar",
    level: "Beginner",
    category: "Grammar",
    description: "Learn fundamental English grammar rules and structures",
    imageUrl: "https://via.placeholder.com/400",
    price: 29.99,
  },
  {
    id: 2,
    title: "Business English",
    level: "Advanced",
    category: "Business",
    description: "Master professional English communication",
    imageUrl: "https://via.placeholder.com/400",
    price: 49.99,
  },
  {
    id: 2,
    title: "Business English",
    level: "Advanced",
    category: "Business",
    description: "Master professional English communication",
    imageUrl: "https://via.placeholder.com/400",
    price: 49.99,
  }, {
    id: 2,
    title: "Business English",
    level: "Advanced",
    category: "Business",
    description: "Master professional English communication",
    imageUrl: "https://via.placeholder.com/400",
    price: 49.99,
  }, {
    id: 2,
    title: "Business English",
    level: "Advanced",
    category: "Business",
    description: "Master professional English communication",
    imageUrl: "https://via.placeholder.com/400",
    price: 49.99,
  }, {
    id: 2,
    title: "Business English",
    level: "Advanced",
    category: "Business",
    description: "Master professional English communication",
    imageUrl: "https://via.placeholder.com/400",
    price: 49.99,
  }, {
    id: 2,
    title: "Business English",
    level: "Advanced",
    category: "Business",
    description: "Master professional English communication",
    imageUrl: "https://via.placeholder.com/400",
    price: 49.99,
  }, {
    id: 2,
    title: "Business English",
    level: "Advanced",
    category: "Business",
    description: "Master professional English communication",
    imageUrl: "https://via.placeholder.com/400",
    price: 49.99,
  },
];

const RankingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredCourses = mockCourses.filter(course => {
    return course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedLevel ? course.level === selectedLevel : true) &&
      (selectedCategory ? course.category === selectedCategory : true);
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-12 px-12">
      <div className="mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Prove Your Expertise, Earn Your Certification</h1>
          <p className="text-xl text-gray-700">Get certified today and unlock new opportunities</p>
        </div>
        <div className="flex flex-wrap justify-end gap-4 mb-8">
          <input
            type="text"
            placeholder="Search courses..."
            className="p-2 border rounded-lg w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="Grammar">Grammar</option>
            <option value="Business">Business</option>
            <option value="Conversation">Conversation</option>
          </select>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-2">
                      {course.level}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {course.category}
                    </span>
                  </div>
                  <span className="font-bold text-lg">${course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingPage
