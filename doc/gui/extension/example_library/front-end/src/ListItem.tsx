import React, { useMemo } from "react";
import { LoV, useLovListMemo } from "taipy-gui";

interface ToDoListProps {
    lov?: LoV;
    defaultLov?: string;
    sort?: "asc" | "desc";
}

const styles = {
    listItem: {
        display: "flex",
        alignItems: "center",
    },
    listItemImage: {
        marginRight: "8px",
        width: "1em",
        height: "1em",
    },
};

const ListItem: React.FC<ToDoListProps> = ({ lov, defaultLov = "", sort }) => {
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
                {sortedLovList.map((todo, index) => (
                    <li key={index} style={styles.listItem}>
                        {typeof todo.item === "string" ? null : (
                            <img src={todo.item.path} alt={todo.item.text} style={styles.listItemImage} />
                        )}
                        {todo.id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListItem;
