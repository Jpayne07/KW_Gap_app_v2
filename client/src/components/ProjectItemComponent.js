import React, { useState } from "react";
import "../index.css"
import DeleteCollaborators from "./DeleteCollaborators";


function SingleProjectComponent({singularProject, collaborations}){
    console.log(collaborations)
    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
      }
      function handleDelete(collaborations){
        const test = (collaborations.filter(collab =>{return collab.project_id===singularProject.id}))
        fetch(`/api/projects_collaborators/${test[0].id}`,{
            method:'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                // If the response is not OK, log the status and throw an error
                console.error('Error response:', response.status, response.statusText);
                throw new Error('Failed to delete collaboration');
            }
            return response;  // Only call .json() if the response is OK
        })
        .then(r => {
            console.log('Collaboration deleted:', r);
        })
        .catch(error => {
            console.error('Error deleting collaboration:', error);
        });
    }
    return (
        <div>
            <div className="main_wrapper">
                <h1  id="project_name">{singularProject.brand_name}</h1>
                <h3>Collaborators</h3>
                {/* Grid starts below */}
                <div className="collaborator_grid">
                    {singularProject.users.map(user=>{
                        return <div className="collaborator_item" key={user.username}>
                                    <p>{toTitleCase(`${user.username}: `)}</p>
                                        <p>{user.collaborations
                                        .filter((collaboration) => collaboration.project_id === singularProject.id)
                                        .map((collaboration) => (toTitleCase((collaboration.role))))
                                        .join(", ")}
                                    </p>
                                    <div className = "profileIcon"
                                    style={{ backgroundImage: `url(${user.profile_icon})` }}>
                                    </div>
                                    <button onClick={()=>handleDelete(user.collaborations)}>Delete Collaborator</button>
                                    
                                </div>  
                    })}
                   
                </div>
            </div>
        </div>
    )
    
}
export default SingleProjectComponent