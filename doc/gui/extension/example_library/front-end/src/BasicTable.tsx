import React, { useEffect, useMemo, useState, useCallback, ReactNode } from "react";
import {
    createRequestDataUpdateAction,
    RowType,
    RowValue,
    useDispatch,
    useDispatchRequestUpdateOnFirstRender,
    useDynamicProperty,
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
    const [value, setValue] = useState<Record<string, unknown>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const module = useModule();
    const refresh = props.data?.__taipy_refresh !== undefined;
    useDispatchRequestUpdateOnFirstRender(dispatch, props.id, module, props.updateVars, props.updateVarName);

    // Memoize column order and columns
    const [colsOrder, columns] = useMemo(() => {
        const colsOrder = Object.keys(value || {}).sort();
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
        if (props.rowsPerPage === undefined) {
            return rows; // Show all rows if itemsPerPage is undefined
        }
        const itemsPerPageValue = props.rowsPerPage ?? 10;
        const startIndex = (currentPage - 1) * itemsPerPageValue;
        return rows.slice(startIndex, startIndex + itemsPerPageValue);
    }, [rows, currentPage, props.rowsPerPage]);

    // Update data callback
    const updateData = useCallback(() => {
        if (refresh || !props.data) {
            dispatch(
                createRequestDataUpdateAction(
                    props.updateVarName,
                    props.id,
                    module,
                    colsOrder,
                    "",
                    {},
                    true,
                    "TabularLibrary",
                ),
            );
        } else {
            setValue(props.data);
        }
    }, [refresh, props.data, colsOrder, props.updateVarName, props.id, dispatch, module]);

    // Effect to update data on mount and when dependencies change
    useEffect(() => {
        updateData();
    }, [updateData]);

    // Render cell content
    const renderCell = useCallback((cellValue: unknown): ReactNode => {
        const isDateString =
            typeof cellValue === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(cellValue);
        const dateValue = isDateString && !isNaN(Date.parse(cellValue)) ? new Date(cellValue) : null;
        return dateValue
            ? dateValue.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
              })
            : (cellValue as ReactNode);
    }, []);

    // Handle next page
    const handleNextPage = () => {
        const itemsPerPageValue = props.rowsPerPage ?? 10;
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(rows.length / itemsPerPageValue)));
    };

    // Handle previous page
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <h2>Paginated table</h2>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    {colsOrder.map((col, idx) => (
                        <td key={col + idx}>{col}</td>
                    ))}
                </thead>
                <tbody>
                    {paginatedRows.map((row, index) => (
                        <tr key={"row" + index}>
                            {colsOrder.map((col, cidx) => (
                                <td key={"val" + index + "-" + cidx}>{renderCell(row[col])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {props.rowsPerPage !== undefined && (
                <div>
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>
                        {" "}
                        Page {currentPage} of {Math.ceil(rows.length / (props.rowsPerPage ?? 10))}{" "}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(rows.length / (props.rowsPerPage ?? 10))}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default BasicTable;
