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
        width: "4em",
        height: "4em",
        marginRight: "10px",
    },
};

const LogoWithText = ({ text, defaultText, logoPath }: CaptionProps) => {
    const value = useDynamicProperty(text, defaultText, "");

    return (
        <div style={styles.container}>
            <img
                src={`data:image/png;base64,${logoPath}`}
                alt="LogoWithText"
                style={styles.logo}
            />
            <div>{value}</div>
        </div>
    );
};

export default LogoWithText;
