/* eslint-disable react/no-unescaped-entities */
// app/page.tsx
"use client";

import AboutSection from "@/components/about/AboutSection";
import GraphSection from "@/components/Graph/GraphSection";
import Masalah from "@/components/masalah/Masalah";
import VideoSection from "@/components/video/VideoSection";

export default function HomePage() {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">
        📊 SENTIMEN KOMENTAR YOUTUBE TERHADAP VIDEO 'BEGINI CARA BIKIN GEN Z
        KERJA KERAS'
      </h1>

      {/* About Section */}
      <AboutSection />

      {/* Video Section */}
      <VideoSection />

      {/* Masalah Section */}
      <Masalah />

      {/* Bar Chart */}
      <GraphSection />
    </div>
  );
}
