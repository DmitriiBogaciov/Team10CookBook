import React, {useEffect, useState} from "react";
import styles from "../css/recipeList.module.css";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import Ingredient from "./Ingredient"

function RecipeIngredientList(props) {
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
                const filteredIngredientList = ingredientLoadCall.data
                    .filter((item) => {
                        return props.ingredientList.some((ingredient) => ingredient.id === item.id);
                    })
                    .map((item) => {
                        const ingredientInfo = props.ingredientList.find(
                            (ingredient) => ingredient.id === item.id
                        );
                        return {
                            ...item,
                            amount: ingredientInfo.amount,
                            unit: ingredientInfo.unit,
                        };
                    });
                return <ul>
                            <Ingredient ingredientList={filteredIngredientList} />
                        </ul>
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

    return <div className="App">{getChild()}</div>;
}

export default RecipeIngredientList;