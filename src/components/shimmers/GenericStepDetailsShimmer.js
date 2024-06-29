import React from "react";
import GenericShimmer from "./genericShimmer";
export default function GenericStepDetailsShimmer() {
    return (
        <div className="gen-step-det-shimmer">
            <GenericShimmer
                shimmerStyle={{
                    width: "50%",
                    height: "40px",
                }}
            />
            <GenericShimmer
                shimmerStyle={{
                    width: "100%",
                    height: "206px",
                }}
            />
            <GenericShimmer
                shimmerStyle={{
                    width: "100%",
                    height: "70px",
                }}
            />
            <div className="category-list">
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
        </div>
    );
}
