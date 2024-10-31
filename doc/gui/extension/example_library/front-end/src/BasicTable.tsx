import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    createRequestDataUpdateAction,
    useDispatch,
    useDispatchRequestUpdateOnFirstRender,
    useModule,
    TaipyDynamicProps,
    TableValueType,
    RowType,
    RowValue,
} from "taipy-gui";

interface BasicTableProps extends TaipyDynamicProps {
    data: TableValueType;
}

const BasicTable = (props: BasicTableProps) => {
    const { data, updateVarName = "", updateVars = "", id } = props;
    const [value, setValue] = useState<TableValueType>({});
    const pageKey = useRef("no-page-key");
    const dispatch = useDispatch();
    const module = useModule();
    const refresh = data?.__taipy_refresh !== undefined;
    useDispatchRequestUpdateOnFirstRender(dispatch, id, module, updateVars);

    const [colsOrder] = useMemo(() => {
        const colsOrder = Object.keys(value || {});
        return [colsOrder, value || {}];
    }, [value]);

    const rows = useMemo(() => {
        const rows: RowType[] = [];
        if (value) {
            colsOrder.forEach((col) => {
                if (value[col]) {
                    value[col].forEach((val: RowValue, idx: number) => {
                        rows[idx] = rows[idx] || {};
                        rows[idx][col] = val;
                    });
                }
            });
        }
        return rows;
    }, [value, colsOrder]);

    useEffect(() => {
        if (refresh || !data) {
            dispatch(
                createRequestDataUpdateAction(updateVarName, id, module, colsOrder, pageKey.current, {}, true, "ExampleLibrary")
            );
        } else {
            setValue(data[pageKey.current]);
        }
    }, [refresh, data, colsOrder, updateVarName, id, dispatch, module]);

    return (
        <div>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    {colsOrder.map((col, idx) => (
                        <th key={col + idx}>{col}</th>
                    ))}
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={"row" + index}>
                            {colsOrder.map((col, cidx) => (
                                <td key={"val" + index + "-" + cidx}>{row[col]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BasicTable;
