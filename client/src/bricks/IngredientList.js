import React, {useEffect, useState} from "react";
import styles from "../css/recipeList.module.css";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";

function IngredientList() {
    const [ingredientLoadCall, setIngredientLoadCall] = useState({
        state: "pending",
    });

    useEffect(() => {
        fetch(`http://localhost:3000/ingredient/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setIngredientLoadCall({ state: "error", error: responseJson });
            } else {
                setIngredientLoadCall({ state: "success", data: responseJson });
            }
        });
    }, []);

    function getChild() {
        switch (ingredientLoadCall.state) {
            case "pending":
                return (
                    <div className={styles.loading}>
                        <Icon size={2} path={mdiLoading} spin={true} />
                    </div>
                );
            case "success":
                const sortedIngredientList = ingredientLoadCall.data.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });

                return sortedIngredientList.map((ingredient) => {
                    return <option key={ingredient.id}>{ingredient.name}</option>
                })
            case "error":
                return (
                    <div className={styles.error}>
                        <div>Failed to load recipe data.</div>
                        <br />
                        <pre>{JSON.stringify(ingredientLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }

    return <>{getChild()}</>
}

export default IngredientList;