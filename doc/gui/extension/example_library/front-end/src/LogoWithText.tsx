import React from "react";
import { useDynamicProperty } from "taipy-gui";

interface CaptionProps {
    text: string;
    defaultText: string;
    logoPath: string;
}

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
    },
    logo: {
        width: "1em",
        height: "1em",
        marginRight: "10px",
    },
};

const LogoWithText = ({ text, defaultText, logoPath }: CaptionProps) => {
    const value = useDynamicProperty(text, defaultText, "");

    return (
        <div style={styles.container}>
            <img
                src={`data:image/png;base64,${logoPath}`}
                alt="LogoWithText Image"
                style={styles.logo}
            />
            <div>{value}</div>
        </div>
    );
};

export default LogoWithText;
