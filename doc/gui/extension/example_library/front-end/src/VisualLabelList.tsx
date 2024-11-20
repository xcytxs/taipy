import React, { useMemo } from "react";
import { LoV, useLovListMemo } from "taipy-gui";

interface VisualLabelListProps {
    lov?: LoV;
    defaultLov?: string;
    sort?: "asc" | "desc";
}

const styles = {
    listItem: {
        display: "flex",
        alignItems: "center",
    },
    image: {
        marginRight: "8px",
        width: "1em",
        height: "1em",
    },
};

const VisualLabelList: React.FC<VisualLabelListProps> = ({ lov, defaultLov = "", sort }) => {
    const lovList = useLovListMemo(lov, defaultLov);

    const sortedLovList = useMemo(() => {
        if (sort) {
            return lovList.slice().sort((a, b) => {
                return sort === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
            });
        }
        return lovList;
    }, [lovList, sort]);

    return (
        <div>
            <ul>
                {sortedLovList.map((item, index) => (
                    <li key={index} style={styles.listItem}>
                        {typeof item.item === "string" ? null : (
                            <img src={item.item.path} alt={item.item.text} style={styles.image} />
                        )}
                        {item.id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VisualLabelList;
