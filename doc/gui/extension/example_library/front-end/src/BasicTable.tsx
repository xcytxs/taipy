import React, { useEffect, useMemo, useState } from "react";
import {
    createRequestDataUpdateAction,
    RowType,
    RowValue,
    useDispatch,
    useDispatchRequestUpdateOnFirstRender,
    useModule,
} from "taipy-gui";

interface BasicTableProps {
    id?: string;
    updateVarName?: string;
    updateVars?: string;
    data: Record<string, Record<string, unknown>>;
    rowsPerPage?: number;
}

const BasicTable = (props: BasicTableProps) => {
    const {
        data,
        rowsPerPage,
        updateVarName = "",
        updateVars = "",
        id
    } = props;
    const [value, setValue] = useState<Record<string, unknown>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const module = useModule();
    const refresh = data?.__taipy_refresh !== undefined;
    useDispatchRequestUpdateOnFirstRender(dispatch, id, module, updateVars, updateVarName);

    // Memoize column order
    const [colsOrder] = useMemo(() => {
        const colsOrder = Object.keys(value || {});
        return [colsOrder, value || {}];
    }, [value]);

    // Memoize rows
    const rows = useMemo(() => {
        const rows: RowType[] = [];
        if (value) {
            colsOrder.forEach(
                (col) =>
                    value[col] &&
                    (value[col] as RowValue[]).forEach(
                        (val, idx) => (rows[idx] = rows[idx] || {}) && (rows[idx][col] = val),
                    ),
            );
        }
        return rows;
    }, [value, colsOrder]);

    // Memoize paginated rows
    const paginatedRows = useMemo(() => {
        if (rowsPerPage === undefined) {
            return rows;
        }
        const startIndex = (currentPage - 1) * rowsPerPage;
        return rows.slice(startIndex, startIndex + rowsPerPage);
    }, [rows, currentPage, props.rowsPerPage]);

    useEffect(() => {
        if (refresh || !data) {
            dispatch(
                createRequestDataUpdateAction(
                    updateVarName,
                    id,
                    module,
                    colsOrder,
                    "",
                    {},
                    true,
                    "TabularLibrary",
                ),
            );
        } else {
            setValue(data);
        }
    }, [refresh, data, colsOrder, updateVarName, id, dispatch, module]);

    // Handle next page
    const handleNextPage = () => {
        if (rowsPerPage) {
            setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(rows.length / rowsPerPage)));
        }
    };

    // Handle previous page
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    {colsOrder.map((col, idx) => (
                        <th key={col + idx}>{col}</th>
                    ))}
                </thead>
                <tbody>
                    {paginatedRows.map((row, index) => (
                        <tr key={"row" + index}>
                            {colsOrder.map((col, cidx) => (
                                <td key={"val" + index + "-" + cidx}>{row[col]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {rowsPerPage !== undefined && (
                <div>
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {Math.ceil(rows.length / rowsPerPage)}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(rows.length / rowsPerPage)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default BasicTable;
