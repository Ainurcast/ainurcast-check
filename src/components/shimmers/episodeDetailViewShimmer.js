import React from "react";
import GenericShimmer from "./genericShimmer";
export default function EpisodeDetailViewShimmer() {
    return (
        <div className="episode-detail-view-shimmer">
            <div className="ep-det-shimmer-hd">
                <GenericShimmer
                    shimmerStyle={{
                        width: "100%",
                        height: "40px",
                    }}
                />
                <GenericShimmer
                    shimmerStyle={{
                        width: "100%",
                        height: "40px",
                    }}
                />
            </div>
            <div className="shimmer-cards">
                <div>
                    <GenericShimmer
                        shimmerStyle={{
                            width: "100%",
                            height: "120px",
                        }}
                    />
                    <GenericShimmer
                        shimmerStyle={{
                            width: "100%",
                            height: "40px",
                        }}
                    />
                    <GenericShimmer
                        shimmerStyle={{
                            width: "50%",
                            height: "40px",
                        }}
                    />
                </div>
                <div>
                    <GenericShimmer
                        shimmerStyle={{
                            width: "100%",
                            height: "120px",
                        }}
                    />
                    <GenericShimmer
                        shimmerStyle={{
                            width: "100%",
                            height: "40px",
                        }}
                    />
                    <GenericShimmer
                        shimmerStyle={{
                            width: "50%",
                            height: "40px",
                        }}
                    />
                </div>
                <div>
                    <GenericShimmer
                        shimmerStyle={{
                            width: "100%",
                            height: "120px",
                        }}
                    />
                    <GenericShimmer
                        shimmerStyle={{
                            width: "100%",
                            height: "40px",
                        }}
                    />
                    <GenericShimmer
                        shimmerStyle={{
                            width: "50%",
                            height: "40px",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
