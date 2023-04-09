import './App.css';
import RecipeList from "./bricks/RecipeList"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "./css/recipeList.module.css";

function App() {
  const [recipeLoadCall, setRecipeLoadCall] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/recipe/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeLoadCall({ state: "error", error: responseJson });
      } else {
        setRecipeLoadCall({ state: "success", data: responseJson });
      }
    });
  }, []);

  function getChild() {
    switch (recipeLoadCall.state) {
      case "pending":
        return (
            <div className={styles.loading}>
              <Icon size={2} path={mdiLoading} spin={true} />
            </div>
        );
      case "success":
        return (
            <>
              <RecipeList recipeList={recipeLoadCall.data} />
            </>
        );
      case "error":
        return (
            <div className={styles.error}>
              <div>Failed to load recipe data.</div>
              <br />
              <pre>{JSON.stringify(recipeLoadCall.error, null, 2)}</pre>
            </div>
        );
      default:
        return null;
    }
  }

  return <div className="App">{getChild()}</div>;
}


export default App;
