import React, { Component } from "react";
import { Checkbox, CustomTextInput } from "../customComponents/";

const statusMap = {
    NOT_INITIATED: "notStarted",
    PROCESSING: "processing",
    DISTRIBUTED: "live",
    REJECTED: "rejected",
    DISABLED: "disabled",
};

const stateCBMap = {
    "Not-Initiated": "notStarted",
    Processing: "processing",
    Live: "live",
    Rejected: "rejected",
    Disabled: "disabled",
};

const cbStatus = {
    notStarted: false,
    processing: false,
    live: false,
    rejected: false,
    disabled: false,
};
export default class StatusDialog extends Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState = () => {
        return {
            cbStatus: { ...cbStatus },
            podcastLink: "",
        };
    };

    setInitialState = () => {
        this.setState(this.initState());
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedData) {
            const { status, podcastLink } = nextProps.selectedData;
            const statusStateName = statusMap[status];
            this.setState((prevState) => ({
                podcastLink: podcastLink,
                cbStatus: {
                    ...cbStatus,
                    [statusStateName]: !prevState.cbStatus.statusStateName,
                },
            }));
        }
    }

    handleChange = (statusStateName) => {
        statusStateName = Object.keys(statusMap).filter(
            (key) => statusMap[key] === statusStateName
        )[0];
        this.props.updateSelectedData(statusStateName);
    };

    renderStatusDialog = () => {
        const { cbStatus } = this.state;
        return [
            "Not-Initiated",
            "Processing",
            "Live",
            "Rejected",
            "Disabled",
        ].map((label) => {
            const statusStateName = stateCBMap[label];
            return (
                <Checkbox
                    checked={cbStatus[statusStateName]}
                    onChange={() => this.handleChange(statusStateName)}
                    label={label}
                />
            );
        });
    };

    handleChangeInput = (e, value) => {
        this.setState({
            podcastLink: value,
        });
    };

    getPodcastLink = () => {
        return this.state.podcastLink;
    };

    renderLiveUI = () => {
        const { selectedData: { status = "" } = {} } = this.props;
        const { podcastLink } = this.state;
        if (status === "DISTRIBUTED") {
            return (
                <div className="podcast-link">
                    <CustomTextInput
                        label="Podcast Link"
                        required
                        placeholder="e.g. John speaks"
                        value={podcastLink}
                        onChange={(e, value) =>
                            this.handleChangeInput(e, value)
                        }
                    />
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                {this.renderStatusDialog()}
                {this.renderLiveUI()}
            </div>
        );
    }
}
