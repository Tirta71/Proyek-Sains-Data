import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import AOS from "aos";
import "aos/dist/aos.css";

const GraphSection = () => {
  interface SentimentData {
    aspect: string;
    sentiment: "positive" | "negative";
  }

  interface SubAspectData {
    aspect: string;
    sentiment: "positive" | "negative";
    keyword: string;
    text_combination: string;
  }

  const [sentimentData, setSentimentData] = useState<SentimentData[]>([]);
  const [subAspectData, setSubAspectData] = useState<SubAspectData[]>([]);
  const [mainChart, setMainChart] = useState<Chart | null>(null);
  const [subAspectChart, setSubAspectChart] = useState<Chart | null>(null);
  const [selectedAspect, setSelectedAspect] = useState<string | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [comments, setComments] = useState<string[]>([]);

  const keywordConclusions: { [key: string]: string } = {
    nyaman:
      "Menggambarkan tempat kerja yang mendukung produktivitas dan kesejahteraan emosional.",
    fasilitas:
      "Merujuk pada sarana dan prasarana di tempat kerja yang memadai.",
    bersih: "Menunjukkan lingkungan fisik yang higienis dan terawat.",
    sehat: "Fokus pada kondisi yang mendukung kesehatan fisik dan mental.",
    kerja: "Umumnya menunjukkan pengorganisasian atau cara kerja yang efisien.",
    kolaborasi: "Mengacu pada hubungan kerja tim yang harmonis.",
    dukung: "Menggambarkan dukungan dari rekan kerja atau perusahaan.",
    buruk: "Secara umum menggambarkan kondisi kerja yang tidak ideal.",
    semangat: "Menggambarkan antusiasme atau motivasi kerja.",
    tanggung: "Mengacu pada tanggung jawab seseorang terhadap pekerjaannya.",
    malas: "Menggambarkan kurangnya inisiatif atau motivasi.",
    kurang: "Secara umum merujuk pada sikap yang tidak memadai.",
    sesuai: "Menunjukkan kesesuaian antara gaji dan tanggung jawab kerja.",
    bonus: "Merujuk pada insentif tambahan di luar gaji.",
    biaya: "Mengacu pada kemampuan untuk menutupi pengeluaran sehari-hari.",
    adil: "Menggambarkan keadilan dalam sistem pembayaran.",
    rendah: "Mengacu pada gaji yang tidak memadai.",
    kecil: "Serupa dengan rendah, menunjukkan pendapatan yang tidak cukup.",
    luang: "Mengacu pada adanya waktu luang untuk kegiatan di luar pekerjaan.",
    banyak: "Mengacu pada jumlah pekerjaan yang terlalu besar.",
  };

  useEffect(() => {
    // Fetch sentiment data
    fetch("/data/data_sentimen.json")
      .then((response) => response.json())
      .then((data: SentimentData[]) => setSentimentData(data))
      .catch((error) => console.error("Error fetching sentiment data:", error));

    // Fetch sub-aspect data
    fetch("/data/sub_aspek.json")
      .then((response) => response.json())
      .then((data: SubAspectData[]) => setSubAspectData(data))
      .catch((error) =>
        console.error("Error fetching sub-aspect data:", error)
      );
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
      once: true, // Animasi hanya berjalan sekali saat di-scroll
    });
  }, []);

  useEffect(() => {
    if (sentimentData.length > 0) {
      const groupedSentiment = sentimentData.reduce<{
        [key: string]: { positive: number; negative: number };
      }>((acc, item) => {
        const { aspect, sentiment } = item;
        if (!acc[aspect]) {
          acc[aspect] = { positive: 0, negative: 0 };
        }
        acc[aspect][sentiment] += 1;
        return acc;
      }, {});

      const labels = Object.keys(groupedSentiment);
      const positiveData = labels.map(
        (label) => groupedSentiment[label].positive
      );
      const negativeData = labels.map(
        (label) => groupedSentiment[label].negative
      );

      const ctx = document.getElementById(
        "sentiment-bar-chart"
      ) as HTMLCanvasElement;

      if (ctx) {
        if (mainChart) {
          mainChart.destroy();
        }

        const newMainChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: "Positif",
                data: positiveData,
                backgroundColor: "rgba(54, 162, 235, 0.8)",
              },
              {
                label: "Negatif",
                data: negativeData,
                backgroundColor: "rgba(255, 99, 132, 0.8)",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  font: {
                    size: 14, // Ukuran font untuk legend
                  },
                },
              },
            },
            onClick: (event, elements) => {
              if (elements.length > 0) {
                const index = elements[0].index;
                const selectedAspect = labels[index];
                setSelectedAspect(selectedAspect);
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Aspek Pekerjaan",
                  font: {
                    size: 20, // Ukuran font untuk label sumbu X
                  },
                },
                ticks: {
                  font: {
                    size: 16, // Ukuran font untuk tick pada sumbu X
                  },
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Jumlah Komentar",
                  font: {
                    size: 20, // Ukuran font untuk label sumbu Y
                  },
                },
                ticks: {
                  font: {
                    size: 16, // Ukuran font untuk tick pada sumbu Y
                  },
                },
              },
            },
          },
        });

        setMainChart(newMainChart);
      }
    }
  }, [sentimentData]);

  const selectedAspectSentiment =
    subAspectData.find((item) => item.keyword === selectedKeyword)?.sentiment ||
    "positive";

  useEffect(() => {
    if (selectedAspect) {
      const filteredData = subAspectData.filter(
        (item) => item.aspect === selectedAspect
      );

      if (filteredData.length > 0) {
        const positiveCounts = filteredData.reduce<{ [key: string]: number }>(
          (acc, item) => {
            if (item.sentiment === "positive") {
              acc[item.keyword] = (acc[item.keyword] || 0) + 1;
            }
            return acc;
          },
          {}
        );

        const negativeCounts = filteredData.reduce<{ [key: string]: number }>(
          (acc, item) => {
            if (item.sentiment === "negative") {
              acc[item.keyword] = (acc[item.keyword] || 0) + 1;
            }
            return acc;
          },
          {}
        );

        const labels = Array.from(
          new Set([
            ...Object.keys(positiveCounts),
            ...Object.keys(negativeCounts),
          ])
        );
        const positiveData = labels.map((label) => positiveCounts[label] || 0);
        const negativeData = labels.map((label) => negativeCounts[label] || 0);

        const ctx = document.getElementById(
          "sub-aspect-chart"
        ) as HTMLCanvasElement;

        if (ctx) {
          if (subAspectChart) {
            subAspectChart.destroy();
          }

          const newSubAspectChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels,
              datasets: [
                {
                  label: "Positif",
                  data: positiveData,
                  backgroundColor: "rgba(54, 162, 235, 0.8)",
                },
                {
                  label: "Negatif",
                  data: negativeData,
                  backgroundColor: "rgba(255, 99, 132, 0.8)",
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: `Sub-Aspek untuk ${selectedAspect}`,
                  font: {
                    size: 22, // Ukuran font untuk judul grafik
                  },
                },
              },
              onClick: (event, elements) => {
                if (elements.length > 0) {
                  const index = elements[0].index;
                  const selectedKeyword = labels[index];
                  setSelectedKeyword(selectedKeyword);

                  // Filter comments
                  const relatedComments = filteredData
                    .filter((item) => item.keyword === selectedKeyword)
                    .map((item) => item.text_combination);
                  setComments(relatedComments);
                }
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Keyword",
                    font: {
                      size: 20,
                    },
                  },
                  ticks: {
                    font: {
                      size: 16,
                    },
                  },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Jumlah Kemunculan",
                    font: {
                      size: 20,
                    },
                  },
                  ticks: {
                    font: {
                      size: 16,
                    },
                  },
                },
              },
            },
          });

          setSubAspectChart(newSubAspectChart);
        }
      }
    }
  }, [selectedAspect, subAspectData]);

  return (
    <>
      {/* Grafik Utama */}
      <div className="row mb-4" data-aos="fade-up">
        <h2 className="section-title mb-4 text-2xl font-bold text-gray-800 mb-4">
          Analisis Sentimen terhadap Aspek Pekerjaan
        </h2>
        <div className="col-md-12">
          <canvas id="sentiment-bar-chart"></canvas>
        </div>
      </div>

      {/* Grafik Sub-Aspek */}
      <div className="row mb-4" data-aos="fade-up">
        <div className="col-md-12">
          <canvas id="sub-aspect-chart"></canvas>
        </div>
      </div>

      {/* Komentar Terkait */}
      {selectedKeyword && (
        <section className="row mb-4" data-aos="fade-up">
          <div className="col-md-12">
            <div
              className={`bg-white shadow-lg rounded-lg overflow-hidden ${
                selectedAspectSentiment === "positive"
                  ? "border-l-4 border-blue-400"
                  : "border-l-4 border-red-400"
              }`}
            >
              {/* Header */}
              <div
                className={`${
                  selectedAspectSentiment === "positive"
                    ? "bg-gradient-to-r from-blue-400 to-blue-500"
                    : "bg-gradient-to-r from-red-400 to-red-500"
                } text-white p-5`}
              >
                <h4 className="text-xl font-bold">
                  Komentar Terkait Dan Hasil Analysis {selectedKeyword}
                </h4>
              </div>
              {/* Content */}
              <div
                className={`p-5 space-y-4 ${
                  comments.length > 10 ? "h-max overflow-y-scroll" : ""
                }`}
              >
                {/* Kesimpulan */}
                {keywordConclusions[selectedKeyword] && (
                  <div
                    className={`mb-4 p-4 rounded-lg ${
                      selectedAspectSentiment === "positive"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <h5
                      className={`text-lg font-semibold ${
                        selectedAspectSentiment === "positive"
                          ? "text-blue-600"
                          : "text-red-600"
                      }`}
                    >
                      Hasil Analysis
                    </h5>
                    <p className="text-gray-700 text-lg">
                      {keywordConclusions[selectedKeyword]}
                    </p>
                  </div>
                )}
                {/* Daftar Komentar */}
                <ul className="space-y-4">
                  {comments.map((comment, index) => (
                    <li
                      key={index}
                      className={`flex items-start transform transition duration-300 hover:scale-105 ${
                        selectedAspectSentiment === "positive"
                          ? "bg-blue-50 border-blue-200"
                          : "bg-red-50 border-red-200"
                      } p-4 rounded-lg shadow-sm border`}
                    >
                      <span
                        className={`${
                          selectedAspectSentiment === "positive"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-red-100 text-red-600"
                        } font-semibold py-1 px-4 rounded-full mr-4`}
                      >
                        {index + 1}
                      </span>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {comment}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default GraphSection;
