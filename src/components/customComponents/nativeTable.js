import React, { Component } from "react";
import PropTypes from "prop-types";
export default class NativeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkRefs: {},
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rows.length !== this.props.rows.length) {
            this.createRefs();
        }
    }
    createRefs = () => {
        const linkRefs = this.props.rows.reduce((acc, el, i) => {
            acc[i] = React.createRef();
            return acc;
        }, {});
        this.setState({
            linkRefs,
        });
    };

    renderHeader = () => {
        const { columns } = this.props;
        return columns.map((col) => {
            const { headerName } = col;
            return <div className="tb-header-name">{headerName}</div>;
        });
    };

    copyToClipboard = (e, i) => {
        const textData = this.state.linkRefs[i].current.textContent;
        const copyToClipboardListener = (e) => {
            e.clipboardData.setData("text/plain", textData);
            e.preventDefault();
        };
        document.addEventListener("copy", copyToClipboardListener);
        document.execCommand("copy");
        document.removeEventListener("copy", copyToClipboardListener);
        alert(`Copied Rss Feed URL successfully ${textData}`);
    };

    handleRowChange = (e, row, columnData, i) => {
        const { field, headerName } = columnData;
        const { onCellClick } = this.props;
        if (
            [
                "Spotify",
                "Gaana",
                "AMAZON MUSIC",
                "Apple",
                "Google",
                "jioSaavn",
            ].includes(headerName)
        ) {
            onCellClick(row, row[field], row["ottIdMap"][field], headerName);
        } else if (headerName === "RSS Feed") {
            this.copyToClipboard(e, i);
        }
    };

    renderParticularRow = (row, rowIndex) => {
        const { columns } = this.props;
        let ui = [];
        for (let i = 0; i < columns.length; i++) {
            const { field } = columns[i];
            const ref =
                field === "rssFeedUrl" ? this.state.linkRefs?.[rowIndex] : null;
            ui.push(
                <div
                    className="tb-cell"
                    ref={ref}
                    onClick={(e) =>
                        this.handleRowChange(e, row, columns[i], rowIndex)
                    }
                >
                    {row[field]}
                </div>
            );
        }
        return ui;
    };

    renderRows = () => {
        const { rows } = this.props;
        return rows.map((row, i) => {
            return (
                <div className="tb-rows">
                    {this.renderParticularRow(row, i)}
                </div>
            );
        });
    };

    render() {
        return (
            <div className="custom-table">
                <div className="cust-table-header">{this.renderHeader()}</div>
                <div className="cust-table-rows">{this.renderRows()}</div>
            </div>
        );
    }
}

NativeTable.propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
    onCellClick: PropTypes.func,
};

NativeTable.defaultProps = {
    columns: [],
    row: PropTypes.array,
    onCellClick: () => {},
};
