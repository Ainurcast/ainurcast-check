import React from "react";

const PodCardDetailShimmer = () => {
  return (
    <div className="pod-card-detail-shimmer">
      <div className="pod-detail-shimmer pod-card-image"></div>
      <div className="pod-cast-description">
        {Array.from({ length: 23 })
          .map((u, i) => i)
          .map((u, i) => {
            return <div key={i} className={`pod-detail-shimmer description${i}`}></div>;
          })}
      </div>
    </div>
  );
};

export default PodCardDetailShimmer;
