import React, { useState, useMemo } from "react";
import RecipeGridList from "./RecipeGridList"
import RecipeTableList from "./RecipeTableList"
import CreateRecipeForm from "./CreateRecipeForm"

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"

import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline, mdiMagnify } from "@mdi/js";

function RecipeList(props) {
    const [viewType, setViewType] = useState("grid");
    const isGrid = viewType === "grid";
    const [searchBy, setSearchBy] = useState("");

    const filteredRecipeList = useMemo(() =>{
        return props.recipeList.filter((item) => {
            return (
                item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
                item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            );
        });
    }, [searchBy, props.recipeList]);

    function handleSearch(event) {
        event.preventDefault();
        setSearchBy(event.target["searchInput"].value);
    }

    function handleSearchDelete(event) {
        if (!event.target.value) setSearchBy("");
    }

    return (
        <div>
            <Navbar bg="light">
                <div className="container-fluid">
                    <Navbar.Brand>Recipes list</Navbar.Brand>
                    <div>
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <CreateRecipeForm/>
                            <Form.Control
                                id={"searchInput"}
                                style={{ maxWidth: "150px" }}
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={handleSearchDelete}
                            />
                            <Button
                                style={{ marginRight: "8px" }}
                                variant="outline-success"
                                type="submit"
                            >
                                <Icon size={1} path={mdiMagnify} />
                            </Button>
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
                        </Form>
                    </div>
                </div>
            </Navbar>
            {isGrid ? (
                <RecipeGridList recipeList={filteredRecipeList} />
            ) : (
                <RecipeTableList recipeList={filteredRecipeList} />
            )}
        </div>
    )
}

export default RecipeList