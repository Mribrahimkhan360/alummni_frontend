import React from "react";
import { Play } from "lucide-react";

export default function VideoCard({ video, onClick }) {
  return (
    <div
      className="group relative rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      data-aos="fade-up"
      onClick={() => onClick(video)}
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="w-14 h-14 bg-[#ffe156] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75 shadow-lg">
            <Play size={24} className="text-[#161f37] fill-current ml-1" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-medium">
          {video.duration}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-[#161f37] font-bold text-sm leading-tight mb-1 line-clamp-2">
          {video.title}
        </h3>
        <div className="flex items-center justify-between text-gray-500 text-[11px]">
          <span>{video.date}</span>
          <span className="text-[#3b60c9] font-medium">{video.views} views</span>
        </div>
      </div>
    </div>
  );
}
