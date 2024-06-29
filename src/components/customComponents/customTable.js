import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const CustomTable = (props) => {
    const { rows, columns } = props;
    return (
        <div>
            <DataGrid autoHeight rows={rows} columns={columns} />
        </div>
    );
};

export default CustomTable;
