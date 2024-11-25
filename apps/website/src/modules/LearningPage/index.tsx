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
    <div className="bg-white container mx-auto">
      <div>
        <div className="relative  z-[100]  lg:hidden" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-black/25" aria-hidden="true"></div>

          <div className="fixed inset-0 flex">

            <div className="relative px-4 ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button type="button" className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
                  <span className="sr-only">Close menu</span>
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  <li>
                    <a href="#" className="block px-2 py-3">Totes</a>
                  </li>
                  <li>
                    <a href="#" className="block px-2 py-3">Backpacks</a>
                  </li>
                  <li>
                    <a href="#" className="block px-2 py-3">Travel Bags</a>
                  </li>
                  <li>
                    <a href="#" className="block px-2 py-3">Hip Bags</a>
                  </li>
                  <li>
                    <a href="#" className="block px-2 py-3">Laptop Sleeves</a>
                  </li>
                </ul>

                <div className="border-t border-gray-200 px-4 py-6">
                  <h3 className="-mx-2 -my-3 flow-root">
                    <button type="button" className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
                      <span className="font-medium text-gray-900">Color</span>
                    </button>
                  </h3>
                  <div className="pt-6" id="filter-section-mobile-0">
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <input id="filter-mobile-color-0" name="color[]" value="white" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-mobile-color-0" className="ml-3 min-w-0 flex-1 text-gray-500">White</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-mobile-color-1" name="color[]" value="beige" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-mobile-color-1" className="ml-3 min-w-0 flex-1 text-gray-500">Beige</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-mobile-color-2" name="color[]" value="blue" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-mobile-color-2" className="ml-3 min-w-0 flex-1 text-gray-500">Blue</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-mobile-color-3" name="color[]" value="brown" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-mobile-color-3" className="ml-3 min-w-0 flex-1 text-gray-500">Brown</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-mobile-color-4" name="color[]" value="green" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-mobile-color-4" className="ml-3 min-w-0 flex-1 text-gray-500">Green</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-mobile-color-5" name="color[]" value="purple" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-mobile-color-5" className="ml-3 min-w-0 flex-1 text-gray-500">Purple</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-6">
                  <h3 className="-mx-2 -my-3 flow-root">
                    <button type="button" className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-1" aria-expanded="false">
                      <span className="font-medium text-gray-900">Category</span>
                    </button>
                  </h3>

                  <div className="pt-6" id="filter-section-mobile-1">
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <input id="filter-mobile-category-0" name="category[]" value="new-arrivals" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-mobile-category-0" className="ml-3 min-w-0 flex-1 text-gray-500">New Arrivals</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-mobile-category-1" name="category[]" value="sale" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-mobile-category-1" className="ml-3 min-w-0 flex-1 text-gray-500">Sale</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-mobile-category-2" name="category[]" value="travel" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-mobile-category-2" className="ml-3 min-w-0 flex-1 text-gray-500">Travel</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-mobile-category-3" name="category[]" value="organization" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-mobile-category-3" className="ml-3 min-w-0 flex-1 text-gray-500">Organization</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-mobile-category-4" name="category[]" value="accessories" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-mobile-category-4" className="ml-3 min-w-0 flex-1 text-gray-500">Accessories</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="mx-auto">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex flex-wrap gap-4 items-center justify-between">
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
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              <div className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  <li>
                    <a href="#">Totes</a>
                  </li>
                  <li>
                    <a href="#">Backpacks</a>
                  </li>
                  <li>
                    <a href="#">Travel Bags</a>
                  </li>
                  <li>
                    <a href="#">Hip Bags</a>
                  </li>
                  <li>
                    <a href="#">Laptop Sleeves</a>
                  </li>
                </ul>

                <div className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                      <span className="font-medium text-gray-900">Color</span>
                    </button>
                  </h3>
                  <div className="pt-6" id="filter-section-0">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input id="filter-color-0" name="color[]" value="white" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-color-0" className="ml-3 text-sm text-gray-600">White</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-color-1" name="color[]" value="beige" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-color-1" className="ml-3 text-sm text-gray-600">Beige</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-color-2" name="color[]" value="blue" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-color-2" className="ml-3 text-sm text-gray-600">Blue</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-color-3" name="color[]" value="brown" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-color-3" className="ml-3 text-sm text-gray-600">Brown</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-color-4" name="color[]" value="green" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-color-4" className="ml-3 text-sm text-gray-600">Green</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-color-5" name="color[]" value="purple" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-color-5" className="ml-3 text-sm text-gray-600">Purple</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                      <span className="font-medium text-gray-900">Category</span>
                    </button>
                  </h3>
                  <div className="pt-6" id="filter-section-1">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input id="filter-category-0" name="category[]" value="new-arrivals" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-category-0" className="ml-3 text-sm text-gray-600">New Arrivals</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-category-1" name="category[]" value="sale" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-category-1" className="ml-3 text-sm text-gray-600">Sale</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-category-2" name="category[]" value="travel" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-category-2" className="ml-3 text-sm text-gray-600">Travel</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-category-3" name="category[]" value="organization" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-category-3" className="ml-3 text-sm text-gray-600">Organization</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-category-4" name="category[]" value="accessories" type="checkbox" className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-category-4" className="ml-3 text-sm text-gray-600">Accessories</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="min-h-screen bg-gray-50 p-8">
                  <div className="max-w-7xl mx-auto">
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
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>

  );
};

export default LearningPage;
