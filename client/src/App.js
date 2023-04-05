import './App.css';
import RecipeList from "./bricks/RecipeList"

const recipeList = [
  {"id": "1",
   "name": "Stress killer",
   "description": "abc"
  },
  {"id": "2",
    "name": "Immunity",
    "description": "abc"
  },
  {"id": "3",
    "name": "Me2ed",
    "description": "abc"
  },
  {"id": "4",
    "name": "Pretty woman",
    "description": "abc"
  },
]

function App() {
  return (
    <div className="App">
      <RecipeList recipeList={recipeList}/>
    </div>
  );
}


export default App;
