/* eslint-disable react/no-unescaped-entities */
// app/page.tsx
"use client";

import { useEffect } from "react";
import AboutSection from "@/components/about/AboutSection";
import GraphSection from "@/components/Graph/GraphSection";
import Masalah from "@/components/masalah/Masalah";
import VideoSection from "@/components/video/VideoSection";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi (dalam milidetik)
      once: true, // Animasi hanya terjadi sekali saat scroll
    });
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5" data-aos="fade-up">
        📊 SENTIMEN KOMENTAR YOUTUBE TERHADAP VIDEO 'BEGINI CARA BIKIN GEN Z
        KERJA KERAS'
      </h1>

      {/* About Section */}
      <div data-aos="fade-up">
        <AboutSection />
      </div>

      {/* Video Section */}
      <div data-aos="fade-up">
        <VideoSection />
      </div>

      {/* Masalah Section */}
      <div data-aos="zoom-in">
        <Masalah />
      </div>

      {/* Bar Chart */}
      <div data-aos="fade-up">
        <GraphSection />
      </div>
    </div>
  );
}
