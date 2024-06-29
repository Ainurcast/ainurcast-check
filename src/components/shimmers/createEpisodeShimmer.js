import React from "react";
import GenericShimmer from "./genericShimmer";
export default function CreateEpisodeShimmer() {
    return (
        <div className="create-episode-shimmer">
            <GenericShimmer
                shimmerStyle={{
                    width: "100%",
                    height: "120px",
                    border: "1px dashed #212121",
                }}
            />
            <GenericShimmer
                shimmerStyle={{
                    width: "100%",
                    height: "60px",
                }}
            />
            <GenericShimmer
                shimmerStyle={{
                    width: "100%",
                    height: "112px",
                }}
            />
            <div className="season-ep-num-shimmer">
                <GenericShimmer
                    shimmerStyle={{
                        width: "100%",
                        height: "50px",
                    }}
                />
                <GenericShimmer
                    shimmerStyle={{
                        width: "100%",
                        height: "50px",
                    }}
                />
            </div>
            <GenericShimmer
                shimmerStyle={{
                    width: "100%",
                    height: "60px",
                }}
            />
            <GenericShimmer
                shimmerStyle={{
                    width: "100%",
                    height: "60px",
                }}
            />
        </div>
    );
}
