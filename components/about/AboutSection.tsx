/* eslint-disable react/no-unescaped-entities */
import React from "react";

const AboutSection = () => {
  return (
    <div className="row mb-4">
      <div className="col-md-12">
        <h2 className="section-title text-2xl font-bold text-gray-800 mb-4">
          About Page
        </h2>
        <p className="description text-lg">
          Dashboard ini menampilkan analisis sentimen komentar dari video
          YouTube "Begini Cara Gen Z Kerja Keras". Tujuan utama adalah memahami
          opini publik terkait pekerjaan Generasi Z terhadap aspek pekerjaan
          dengan sub aspek yang sudah di tentukan, baik dari sisi sentimen
          positif maupun negatif.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
