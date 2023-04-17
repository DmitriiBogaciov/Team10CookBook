import React, {useEffect, useState} from "react";
import styles from "../css/recipeList.module.css";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";

function CategoryList() {
    const [categoryLoadCall, setCategoryLoadCall] = useState({
        state: "pending",
    });

    useEffect(() => {
        fetch(`http://localhost:3000/category/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setCategoryLoadCall({ state: "error", error: responseJson });
            } else {
                setCategoryLoadCall({ state: "success", data: responseJson });
            }
        });
    }, []);

    function getChild() {
        switch (categoryLoadCall.state) {
            case "pending":
                return (
                    <div className={styles.loading}>
                        <Icon size={2} path={mdiLoading} spin={true} />
                    </div>
                );
            case "success":
                const sortedCategoryList = categoryLoadCall.data.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });

                return sortedCategoryList.map((ingredient) => {
                    return <option key={ingredient.id}>{ingredient.name}</option>
                })
            case "error":
                return (
                    <div className={styles.error}>
                        <div>Failed to load recipe data.</div>
                        <br />
                        <pre>{JSON.stringify(categoryLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }

    return <>{getChild()}</>
}

export default CategoryList;