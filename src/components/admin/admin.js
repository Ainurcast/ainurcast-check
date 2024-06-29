import React, { Component } from "react";
import {
    CustomTextInput,
    CustomDialog as Dialog,
    CustomButton,
} from "../customComponents";
import history from "../../utils/history";
import NativeTable from "../customComponents/nativeTable";
import Header from "../home/header";
import StatusDialog from "./statusDialog";
import CircularProgress from "@material-ui/core/CircularProgress";

const podcastNameMap = {
    GAANA: "gaana",
    JIO_SAAVN: "jioSaavn",
    AMAZON_MUSIC: "amazon",
    SPOTIFY: "spotify",
    APPLE_PODCASTS: "applePodcast",
    GOOGLE_PODCASTS: "googlePodcast",
};

const columns = [
    {
        headerName: "Podcast ID",
        field: "podcastId",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "Podcast Name",
        field: "podcastName",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "RSS Feed",
        field: "rssFeedUrl",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "User Email",
        field: "userEmail",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "Active Listners",
        field: "activeListeners",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "Is Published",
        field: "isPublished",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "Spotify",
        field: "spotify",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "Gaana",
        field: "gaana",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "AMAZON MUSIC",
        field: "amazon",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "Apple",
        field: "applePodcast",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "Google",
        field: "googlePodcast",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "jioSaavn",
        field: "jioSaavn",
        width: 200,
        disableClickEventBubbling: true,
    },
];

const notPublishedColumns = [
    {
        headerName: "User ID",
        field: "userId",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "User Email",
        field: "userEmail",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "Name",
        field: "userName",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "Podcast ID",
        field: "podcastId",
        width: 200,
        disableClickEventBubbling: true,
    },
    {
        headerName: "Podcast Name",
        field: "podcastName",
        width: 200,
        disableClickEventBubbling: true,
    },
];
export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            activeChip: 0,
            data: [],
            originalData: [],
            originalNotPUblishedData: [],
            notPublishedData: [],
            tableColumns: columns,
            searchString: "",
            openDialog: false,
            selectedData: {
                ottId: "",
                status: "",
                podcastLink: "",
            },
        };
    }

    componentDidMount() {
        if (!localStorage.getItem("USER-CODE")) {
            history.push("/auth");
          } else {
        this.props.getAdminUser();
        this.props.getUserDetails(true);
          }
    }

    componentWillReceiveProps(nextProps) {
        if (
            JSON.stringify(this.props.adminUserData) !==
            JSON.stringify(nextProps.adminUserData)
        ) {
            const { tableData, notPublishedData } = this.formatTableData(
                nextProps.adminUserData
            );
            this.setState({
                data: tableData,
                notPublishedData: notPublishedData,
                originalData: tableData,
                originalNotPUblishedData: notPublishedData,
            });
        }
    }

    formatTableData = (adminUserData = []) => {
        let tableData = [];
        let notPublishedData = [];
        let i, j;
        i = j = 0;
        for (let row of adminUserData) {
            const rowData = {};
            const notPublishedRowData = {};
            const {
                podcast_id = "-",
                name = "-",
                rss_feed_url = "-",
                unique_listeners = "-",
                user_info: {
                    user_id = "",
                    email = "-",
                    first_name = "",
                    last_name = "",
                } = {},
                otts_info = [],
                is_published = false,
            } = row;
            if (is_published) {
                rowData["podcastId"] = podcast_id;
                rowData["podcastName"] = name;
                rowData["rssFeedUrl"] = rss_feed_url;
                rowData["userEmail"] = email;
                rowData["activeListeners"] = unique_listeners;
                rowData["isPublished"] = is_published.toString();
                for (let ottInfo of otts_info) {
                    const {
                        ott_name = "",
                        status = "-",
                        ott_id = "",
                        url = "",
                    } = ottInfo;
                    rowData[podcastNameMap[ott_name]] = status;
                    rowData["ottIdMap"] = {
                        ...rowData["ottIdMap"],
                        [podcastNameMap[ott_name]]: {
                            ...[podcastNameMap[ott_name]],
                            url: url,
                            ott_id: ott_id,
                        },
                    };
                }
                tableData.push(rowData);
            } else {
                // notPublishedRowData["id"] = ++j;
                notPublishedRowData["podcastId"] = podcast_id;
                notPublishedRowData["podcastName"] = name;
                notPublishedRowData["userEmail"] = email;
                notPublishedRowData["userName"] = `${first_name} ${last_name}`;
                notPublishedRowData["userId"] = user_id;
                notPublishedData.push(notPublishedRowData);
            }
        }
        return { tableData, notPublishedData };
    };

    handleChipChange = (activeChip) => {
        const { notPublishedData, originalData } = this.state;
        if (activeChip !== this.state.activeChip) {
            this.setState({
                activeChip,
                data: activeChip === 0 ? originalData : notPublishedData,
                tableColumns: activeChip === 0 ? columns : notPublishedColumns,
                searchString: "",
            });
        }
    };

    handleSearch = ({ target: { value } }) => {
        const { originalData, activeChip, originalNotPUblishedData } =
            this.state;
        const publishTypeData =
            activeChip === 0 ? originalData : originalNotPUblishedData;
        const filtered = publishTypeData.filter((row) => {
            for (let key in row) {
                if (
                    row[key]
                        .toString()
                        .toLowerCase()
                        .includes(value.toLowerCase())
                ) {
                    return true;
                }
            }
            return false;
        });
        this.setState({
            searchString: value,
            data: filtered,
        });
    };

    renderChips = () => {
        const { activeChip, searchString } = this.state;
        return (
            <div className="chip-wrapper">
                <div className="chips">
                    <div
                        onClick={() => this.handleChipChange(0)}
                        className={
                            activeChip === 0
                                ? "active-chip content-type-chip"
                                : "content-type-chip"
                        }
                    >
                        Published
                    </div>
                    <div
                        onClick={() => this.handleChipChange(1)}
                        className={
                            activeChip === 1
                                ? "active-chip content-type-chip"
                                : "content-type-chip"
                        }
                    >
                        Not Published
                    </div>
                </div>
                <div className="input">
                    <CustomTextInput
                        name="search"
                        placeholder="Search..."
                        value={searchString}
                        onChange={(e, value) => this.handleSearch(e, value)}
                    />
                </div>
            </div>
        );
    };

    onCellClick = (row, status, selectedData, headerName) => {
        const { ott_id: ottId = "", url: podcastLink = "" } =
            selectedData || {};
        this.setState((prevState) => ({
            openDialog: true,
            selectedData: {
                ...prevState.selectedData,
                ottId,
                status,
                podcastLink,
            },
        }));
    };

    closeDialog = () => {
        this.child.current.setInitialState();
        this.setState({
            openDialog: false,
        });
    };

    updateSelectedData = (status) => {
        this.setState((prevState) => ({
            openDialog: true,
            selectedData: {
                ...prevState.selectedData,
                status,
            },
        }));
    };

    saveUpdatedTable = () => {
        const {
            selectedData: { ottId: ott_id, status },
        } = this.state;
        const query = { ott_id, status };
        if (status === "DISTRIBUTED") {
            query["url"] = this.child.current.getPodcastLink();
        }
        this.props.updateTableData(query);
        this.closeDialog();
    };

    render() {
        const { userDetails, showLoader } = this.props;
        const { data, activeChip, openDialog, selectedData } = this.state;
        const tableColumns = activeChip === 0 ? columns : notPublishedColumns;
        return (
            <div className="home-container">
                <Header userDetails={userDetails} />
                <div className="admin-container">
                    {this.renderChips()}
                    <NativeTable
                        columns={tableColumns}
                        headerName="Podcast User Data"
                        rows={data}
                        onCellClick={this.onCellClick}
                    />
                </div>
                <Dialog
                    open={openDialog}
                    title="Status Update"
                    bodyStyle={{ padding: "0 40px 10px 40px" }}
                    onClose={this.closeDialog}
                    actions={[
                        <CustomButton
                            key={0}
                            label="Save Changes"
                            primary
                            customButtonStyle={{ width: "100%" }}
                            onClick={this.saveUpdatedTable}
                        />,
                    ]}
                >
                    <StatusDialog
                        ref={this.child}
                        selectedData={selectedData}
                        updateSelectedData={this.updateSelectedData}
                    />
                </Dialog>
                {showLoader && (
                    <div className="circularProgress">
                        <CircularProgress
                            color="inherit"
                            size={80}
                            thickness={3}
                        />
                    </div>
                )}
            </div>
        );
    }
}
