import React from "react";
import GenericShimmer from "./genericShimmer";
export default function CreatePodcastShimmer() {
    return (
        <div className="create-podcast-shimmer">
            <GenericShimmer
                shimmerStyle={{
                    width: "100%",
                    height: "60px",
                }}
            />
            <GenericShimmer
                shimmerStyle={{
                    width: "80%",
                    height: "60px",
                }}
            />
            <div className="podcast-media-shimmer">
                <GenericShimmer
                    shimmerStyle={{
                        width: "100%",
                        height: "100%",
                    }}
                />
                <div className="img-desc-shimmer">
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
                    <GenericShimmer
                        shimmerStyle={{
                            width: "100%",
                            height: "50px",
                        }}
                    />
                </div>
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
            <GenericShimmer
                shimmerStyle={{
                    width: "100%",
                    height: "60px",
                }}
            />
        </div>
    );
}
