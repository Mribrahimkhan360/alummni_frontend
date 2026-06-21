import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Banner() {
  // Set your event's target date/time here
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
    <div className="bg-[#161f37] h-50 md:h-100 relative"  data-aos="fade-top">
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-120 text-white flex mx-auto items-center"
      >
        <SwiperSlide
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('./banner.jpg')",
            height: "300px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex relative items-center justify-center px-35 py-10"
        >
          <div className="leading-10 text-left max-w-2xl relative">
            <h2 className="text-8xl font-bold">We Are Proud</h2>
            <h3 className="text-3xl">
              Students of{" "}
              <span className="text-[#ffe156]">
                Z. H. Sikder University of Science and Technology
              </span>
            </h3>
            <p className="text-xs mt-4">
              Alumni Needs enables you to harness the power of your alumni{" "}
              <br />
              network. Whatever may be the need (academic, relocation, career,{" "}
              <br />
              projects, mentorship, etc. you can ask the community and get{" "}
              <br />
              responses in three.
            </p>

            <div className="slider-btn flex gap-3 mt-4 text-xs">
              <Link
                to="/about"
                className="text-white bg-blue-600 hover:bg-blue-700 
                focus:ring-4 focus:ring-blue-300 
                font-medium rounded-sm text-sm px-10 py-4.5"
              >
                Our Mission
              </Link>

              <Link
                to="/about"
                className="text-black bg-blue-100 hover:bg-blue-200 
                focus:ring-4 focus:ring-blue-300 
                font-medium rounded-sm text-sm px-10 py-4.5"
              >
                Our Story
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
      {/* Event Countdown Card */}
      <div className="absolute top-80 left-1/2 -translate-x-1/2 z-10 w-full max-w-[500px] bg-white rounded-xl shadow-2xl overflow-hidden px-2">
        {" "}
        <img
          src="/event/event-img-1.jpg"
          alt="Upcoming Event"
          className="w-full h-36 object-cover"
        />
        <div className="p-4">
          <h4 className="text-[#161f37] font-bold text-base mb-3">
            Upcoming Alumni Meet
          </h4>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-[#161f37] text-white rounded-md py-2">
              <div className="text-xl font-bold">{timeLeft.days}</div>
              <div className="text-[10px] uppercase tracking-wide text-gray-300">
                Days
              </div>
            </div>

            <div className="bg-[#161f37] text-white rounded-md py-2">
              <div className="text-xl font-bold">{timeLeft.hours}</div>
              <div className="text-[10px] uppercase tracking-wide text-gray-300">
                Hours
              </div>
            </div>

            <div className="bg-[#161f37] text-white rounded-md py-2">
              <div className="text-xl font-bold">{timeLeft.minutes}</div>
              <div className="text-[10px] uppercase tracking-wide text-gray-300">
                Min
              </div>
            </div>

            <div className="bg-[#ffe156] text-[#161f37] rounded-md py-2">
              <div className="text-xl font-bold">{timeLeft.seconds}</div>
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
