import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Banner() {
  const eventDate = new Date("2026-08-15T10:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <div className="bg-[#161f37] relative pb-20 md:pb-36">
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-[300px] md:h-[450px] lg:h-[550px] text-white flex mx-auto items-center"
      >
        <SwiperSlide
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('./banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex relative items-center justify-center px-4 sm:px-8 md:px-16 lg:px-35 py-6 md:py-10"
        >
          <div className="text-left max-w-2xl relative">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              We Are Proud
            </h2>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2 leading-snug">
              Students of{" "}
              <span className="text-[#ffe156]">
                Z. H. Sikder University of Science and Technology
              </span>
            </h3>
            <p className="text-sm md:text-base mt-4 leading-relaxed">
              Alumni Needs enables you to harness the power of your alumni
              network. Whatever may be the need (academic, relocation, career,
              projects, mentorship, etc. you can ask the community and get
              responses in three.
            </p>

            <div className="slider-btn flex flex-wrap gap-3 mt-4">
              <Link
                to="/about"
                className="text-white bg-blue-600 hover:bg-blue-700 
                focus:ring-4 focus:ring-blue-300 
                font-medium rounded-sm text-sm px-6 md:px-10 py-3 md:py-4"
              >
                Our Mission
              </Link>

              <Link
                to="/about"
                className="text-black bg-blue-100 hover:bg-blue-200 
                focus:ring-4 focus:ring-blue-300 
                font-medium rounded-sm text-sm px-6 md:px-10 py-3 md:py-4"
              >
                Our Story
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('./event/event-img-2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-35 py-6 md:py-10"
        >
          <div className="text-left max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Alumni Video Gallery
            </h2>
            <h3 className="text-lg sm:text-xl md:text-2xl text-[#ffe156] mt-2">
              Relive the Moments That Matter
            </h3>
            <p className="text-sm md:text-base mt-4 leading-relaxed">
              Explore our collection of alumni events, interviews, campus tours,
              and memorable highlights. Watch and reconnect with your alma mater.
            </p>
            <div className="slider-btn flex flex-wrap gap-3 mt-4">
              <Link
                to="/services"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-6 md:px-10 py-3 md:py-4"
              >
                Watch Now
              </Link>
              <Link
                to="/services"
                className="text-black bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-6 md:px-10 py-3 md:py-4"
              >
                Browse Gallery
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('./event/event-img-3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-35 py-6 md:py-10"
        >
          <div className="text-left max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Campus & Beyond
            </h2>
            <h3 className="text-lg sm:text-xl md:text-2xl text-[#ffe156] mt-2">
              Tours, Talks & Tributes
            </h3>
            <p className="text-sm md:text-base mt-4 leading-relaxed">
              From drone flyovers of our beautiful campus to inspiring talks
              by distinguished alumni — find it all in one place.
            </p>
            <div className="slider-btn flex flex-wrap gap-3 mt-4">
              <Link
                to="/services"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-6 md:px-10 py-3 md:py-4"
              >
                Explore Videos
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('./event/event-img-4.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-35 py-6 md:py-10"
        >
          <div className="text-left max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Share Your Story
            </h2>
            <h3 className="text-lg sm:text-xl md:text-2xl text-[#ffe156] mt-2">
              Become Part of Our Alumni Media
            </h3>
            <p className="text-sm md:text-base mt-4 leading-relaxed">
              Have a video to share? Submit your alumni stories, event coverage,
              or campus memories and get featured on our gallery.
            </p>
            <div className="slider-btn flex flex-wrap gap-3 mt-4">
              <Link
                to="/services"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-6 md:px-10 py-3 md:py-4"
              >
                Submit Video
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Event Countdown Card */}
      <div className="relative z-10 w-full max-w-[90%] sm:max-w-[450px] md:max-w-[500px] mx-auto -mt-12 md:-mt-20 bg-white rounded-xl shadow-2xl overflow-hidden">
        <img
          src="/event/event-img-1.jpg"
          alt="Upcoming Event"
          className="w-full h-28 md:h-36 object-cover"
        />
        <div className="p-4">
          <h4 className="text-[#161f37] font-bold text-sm md:text-base mb-3">
            Upcoming Alumni Meet
          </h4>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-[#161f37] text-white rounded-md py-2">
              <div className="text-lg md:text-xl font-bold">{timeLeft.days}</div>
              <div className="text-[10px] uppercase tracking-wide text-gray-300">
                Days
              </div>
            </div>

            <div className="bg-[#161f37] text-white rounded-md py-2">
              <div className="text-lg md:text-xl font-bold">{timeLeft.hours}</div>
              <div className="text-[10px] uppercase tracking-wide text-gray-300">
                Hours
              </div>
            </div>

            <div className="bg-[#161f37] text-white rounded-md py-2">
              <div className="text-lg md:text-xl font-bold">{timeLeft.minutes}</div>
              <div className="text-[10px] uppercase tracking-wide text-gray-300">
                Min
              </div>
            </div>

            <div className="bg-[#ffe156] text-[#161f37] rounded-md py-2">
              <div className="text-lg md:text-xl font-bold">{timeLeft.seconds}</div>
              <div className="text-[10px] uppercase tracking-wide text-[#161f37]/70">
                Sec
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
