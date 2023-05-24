import React, { useState} from "react";
import RecipeGridList from "./RecipeGridList"
import RecipeTableList from "./RecipeTableList"

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline} from "@mdi/js";

function RecipeList(props) {
    const [viewType, setViewType] = useState("grid");
    const isGrid = viewType === "grid";

    return (
        <div>
            <Navbar>
                <div className="container-fluid">
                    <div>
                            <Button
                                variant="outline-primary"
                                onClick={() =>
                                    setViewType((currentState) => {
                                        if (currentState === "grid") return "table";
                                        else return "grid";
                                    })
                                }
                            >
                                <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
                                {isGrid ? "Table" : "Grid"}
                            </Button>
                    </div>
                </div>
            </Navbar>
            {isGrid ? (
                <RecipeGridList recipeList={props.recipeList} />
            ) : (
                <RecipeTableList recipeList={props.recipeList} />
            )}
        </div>
    )
}

export default RecipeList