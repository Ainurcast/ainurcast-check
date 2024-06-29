import React from "react";
const PodCardShimmer = () => {
  return (
    <div className="pod-card-shimmer">
      <div className="pod-cards">
        {Array.from({ length: 4 })
          .map((u, i) => i)
          .map((u, i) => {
            return (
              <div key={i} className={`pod-card pod-card${i}`}>
                <div className="card-in"></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PodCardShimmer;
