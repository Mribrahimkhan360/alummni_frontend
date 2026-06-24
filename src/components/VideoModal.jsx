import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!video) return null;

  const getEmbedUrl = (url) => {
    const ytMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    return url;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#161f37] rounded-xl overflow-hidden shadow-2xl"
        data-aos="zoom-in"
        data-aos-duration="300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5 transition-all duration-200 cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="aspect-video w-full">
          <iframe
            src={getEmbedUrl(video.url)}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-6">
          <h3 className="text-white text-xl font-bold">{video.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{video.description}</p>
          <div className="flex items-center gap-4 mt-3 text-gray-500 text-xs">
            <span>{video.date}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full" />
            <span>{video.duration}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full" />
            <span className="text-[#ffe156]">{video.views} views</span>
          </div>
        </div>
      </div>
    </div>
  );
}
