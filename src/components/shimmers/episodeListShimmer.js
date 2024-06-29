import React from "react";
import GenericShimmer from "./genericShimmer";
export default function EpisodeListShimmer() {
    return (
        <div className="episode-list-shimmer">
            <GenericShimmer
                shimmerStyle={{
                    width: "50%",
                    height: "40px",
                }}
            />
            <GenericShimmer
                shimmerStyle={{
                    width: "100%",
                    height: "112px",
                }}
            />
            <GenericShimmer
                shimmerStyle={{
                    width: "100%",
                    height: "112px",
                }}
            />
            <GenericShimmer
                shimmerStyle={{
                    width: "100%",
                    height: "112px",
                }}
            />
        </div>
    );
}
