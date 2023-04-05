import React from "react";
import Card from 'react-bootstrap/Card';
import Icon from '@mdi/react';
import { mdiGlassTulip } from '@mdi/js';

function Recipe(props) {
    return (
       <Card>
           <Card.Body>
               <div>
                   <Icon path={mdiGlassTulip} size={1} color="red" />{" "}
                   {props.recipe.name} {props.recipe.description}
               </div>
           </Card.Body>
       </Card>
    );
}

export default Recipe;