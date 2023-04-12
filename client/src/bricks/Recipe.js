import React from "react";
import Card from 'react-bootstrap/Card';
import Icon from '@mdi/react';
import { mdiGlassTulip, mdiReceiptTextEditOutline } from '@mdi/js';
import IngredientList from "./IngredientList";

function Recipe(props) {
    return (
       <Card>
           <Card.Body>
               <div>
                   <Icon path={mdiGlassTulip} size={1} color="red" />{" "}
                   {props.recipe.name}
               </div>
               <div>
                   <Icon path={mdiReceiptTextEditOutline} size={1} />
                   {props.recipe.description}
               </div>

               <div>
                   Category: {props.recipe.categoryIdList}
               </div>
               <div>
                   Ingredients: <IngredientList ingredientList={props.recipe.ingredientList.map(ingredient => ingredient.id)} />
               </div>
           </Card.Body>
       </Card>
    );
}

export default Recipe;