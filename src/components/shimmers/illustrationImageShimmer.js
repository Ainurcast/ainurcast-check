import React from "react";
import GenericShimmer from "./genericShimmer";
export default function IllustrationImageShimmer() {
    return (
        <div className="gen-step-det-shimmer">
            <GenericShimmer
                shimmerStyle={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "50%",
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
                    width: "100%",
                    height: "40px",
                }}
            />
        </div>
    );
}
