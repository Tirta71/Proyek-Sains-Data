/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

const VideoSection = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const API_KEY = "AIzaSyCo6zKGlUjq28BS2n4GcsbQFaEXFqMFPaA";
      const VIDEO_ID = "8dDx0Tkhb1w";

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${VIDEO_ID}&key=${API_KEY}`
        );
        const data = await response.json();

        // Parsing komentar dari API
        const fetchedComments = data.items.map(
          (item: {
            snippet: { topLevelComment: { snippet: { textDisplay: any } } };
          }) => item.snippet.topLevelComment.snippet.textDisplay
        );
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="row mb-5">
      <h2 className="section-title text-2xl font-bold text-gray-800 mb-4">
        Video dan Komentar
      </h2>
      <div className="col-md-8 ">
        <iframe
          width="100%"
          height="450"
          src="https://www.youtube.com/embed/8dDx0Tkhb1w"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ borderRadius: "12px" }}
        ></iframe>
      </div>
      <div className="col-md-4">
        <div className="comments-section">
          {/* Wrapper scrollable */}

          <div
            className=" overflow-y-scroll  rounded-lg p-2"
            style={{ backgroundColor: "inherit", height: "450px" }}
          >
            <h5 className="mb-3" style={{ fontWeight: "bold" }}>
              Komentar
            </h5>
            <ul className="list-group">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <li key={index} className="list-group-item">
                    {comment}
                  </li>
                ))
              ) : (
                <li className="list-group-item">Memuat komentar...</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
