import React, { useMemo } from "react";
import {
    TaipyDynamicProps,
    useDynamicJsonProperty,
} from "taipy-gui";

import Plot from "react-plotly.js";
import { Data, Layout } from "plotly.js";

interface DashboardProps extends TaipyDynamicProps {
    data?: string;
    defaultData?: string;
    layout?: string;
    defaultLayout?: string;
}

const Dashboard = (props: DashboardProps) => {
    const value = useDynamicJsonProperty(props.data, props.defaultData || "", {} as Partial<Data>);
    const dashboardLayout = useDynamicJsonProperty(props.layout, props.defaultLayout || "", {} as Partial<Layout>);

    const data = useMemo(() => {
        if (Array.isArray(value)) {
            return value as Data[];
        }
        return [] as Data[];
    }, [value]);

    const baseLayout = useMemo(() => {
        const layout = {
            ...dashboardLayout,
        };
        return layout as Partial<Layout>;
    }, [dashboardLayout]);

    return (
        <div>
            <Plot data={data} layout={baseLayout} />
        </div>
    );
};

export default Dashboard;
