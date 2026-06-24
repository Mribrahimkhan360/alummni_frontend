import React, { useState } from "react";
import { Play, Film, Calendar, Eye } from "lucide-react";
import VideoCard from "../components/VideoCard";
import VideoModal from "../components/VideoModal";

const categories = [
  { id: "all", label: "All Videos" },
  { id: "highlights", label: "Highlights" },
  { id: "interviews", label: "Interviews" },
  { id: "events", label: "Events" },
  { id: "campus", label: "Campus Tour" },
];

const videos = [
  {
    id: 1,
    title: "Annual Alumni Meet 2025 – Highlights",
    description:
      "Relive the unforgettable moments from our grand alumni reunion. Speeches, performances, and networking at its finest.",
    thumbnail: "/event/event-img-1.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "highlights",
    date: "Mar 15, 2025",
    duration: "12:34",
    views: "2.4K",
  },
  {
    id: 2,
    title: "An Interview with Dr. Sarah Rahman – Class of 2010",
    description:
      "Our alumna shares her journey from campus to corporate leadership and offers advice for current students.",
    thumbnail: "/about/about-img-2.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "interviews",
    date: "Feb 28, 2025",
    duration: "18:20",
    views: "1.8K",
  },
  {
    id: 3,
    title: "Campus Tour 2025 – New Facilities & Upgrades",
    description:
      "Take a walk through the newly renovated library, labs, and student center.",
    thumbnail: "/event/event-img-2.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "campus",
    date: "Feb 10, 2025",
    duration: "8:45",
    views: "3.2K",
  },
  {
    id: 4,
    title: "Convocation 2025 – Full Ceremony",
    description:
      "Watch the complete graduation ceremony including the chancellor's address and degree conferral.",
    thumbnail: "/event/event-img-3.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "events",
    date: "Jan 20, 2025",
    duration: "45:12",
    views: "5.1K",
  },
  {
    id: 5,
    title: "Alumni Panel: Careers in Tech & Innovation",
    description:
      "Four distinguished alumni discuss emerging technologies and how to navigate the tech industry.",
    thumbnail: "/about/about-img-1.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "highlights",
    date: "Jan 05, 2025",
    duration: "32:08",
    views: "1.2K",
  },
  {
    id: 6,
    title: "Homecoming 2024 – A Night to Remember",
    description:
      "Highlights from the homecoming gala dinner, awards ceremony, and cultural performances.",
    thumbnail: "/event/event-img-4.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "events",
    date: "Dec 18, 2024",
    duration: "15:22",
    views: "4.0K",
  },
  {
    id: 7,
    title: "Prof. Kabir's Farewell – A Tribute",
    description:
      "Students and colleagues share heartfelt memories of Professor Kabir as he retires after 30 years.",
    thumbnail: "/about/about-img-3.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "interviews",
    date: "Dec 01, 2024",
    duration: "22:15",
    views: "3.7K",
  },
  {
    id: 8,
    title: "Campus Drone Tour – Aerial View of ZHSUST",
    description:
      "Experience the breathtaking beauty of our campus from above.",
    thumbnail: "/banner.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "campus",
    date: "Nov 15, 2024",
    duration: "6:30",
    views: "8.6K",
  },
  {
    id: 9,
    title: "Startup Pitch Fest 2024 – Alumni Edition",
    description:
      "Alumni entrepreneurs pitch their startups to a panel of investors. Exciting ideas and bold innovations.",
    thumbnail: "/event/event-img-1.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "highlights",
    date: "Oct 20, 2024",
    duration: "28:44",
    views: "950",
  },
];

export default function VideoGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filtered =
    activeCategory === "all"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-[#161f37] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/banner.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161f37]/80 via-[#161f37]/90 to-[#161f37]" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
          <div data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-[#ffe156]/20 text-[#ffe156] text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <Film size={14} /> Alumni Media
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Video <span className="text-[#ffe156]">Gallery</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Explore moments that define our alumni community — from grand
              reunions and inspiring interviews to campus tours and special
              events.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div
        className="bg-white border-b border-gray-100"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-[#161f37]">
              {videos.length}+
            </div>
            <div className="text-gray-500 text-xs md:text-sm">Videos</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-[#161f37]">
              {videos.reduce((s, v) => s + parseInt(v.views), 0)}K+
            </div>
            <div className="text-gray-500 text-xs md:text-sm">Total Views</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-[#161f37]">
              {categories.length - 1}
            </div>
            <div className="text-gray-500 text-xs md:text-sm">Categories</div>
          </div>
        </div>
      </div>

      {/* Filter & Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {/* Filter Buttons */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          data-aos="fade-up"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#161f37] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={setSelectedVideo}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <Film size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No videos in this category yet.</p>
          </div>
        )}

        {/* Load More */}
        {filtered.length > 0 && (
          <div className="text-center mt-12" data-aos="fade-up">
            <button className="bg-[#161f37] hover:bg-[#1f2a4a] text-white px-8 py-3 rounded-md font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer">
              Load More Videos
            </button>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
