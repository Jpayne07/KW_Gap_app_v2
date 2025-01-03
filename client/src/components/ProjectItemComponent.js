import React, { useState, useEffect } from "react";
import "../index.css"
import CollaboratorGrid from "./CollaboratorGrid";

import AddCollaborator from "./AddCollaborator";



function SingleProjectComponent({singularProject, collaborationsFromParent, allCollaborators, toTitleCase}){
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [collaboratorsv2, setCollaboratorsv2] = useState([])
    

    useEffect(() => {
        const collabHolder = singularProject.collaborations.map(collaborator => collaborator.user);
        setCollaboratorsv2(collabHolder)
    }, [singularProject.collaborations]);
    
      function handleDelete(collaborations){
        const collaborationToDelete = (collaborations.filter(collab =>{return collab.project_id===singularProject.id}))
        fetch(`/api/projects_collaborators/${collaborationToDelete[0].id}`,{
            method:'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                // If the response is not OK, log the status and throw an error
                console.error('Error response:', response.status, response.statusText);
                throw new Error('Failed to delete collaboration');
            }
            setCollaboratorsv2(collaboratorsv2.filter(user=>user.id !== collaborationToDelete[0].user_id))
            return response;  // Only call .json() if the response is OK
        })
        .then(r => {
            console.log('Collaboration deleted:', r);
        })
        .catch(error => {
            console.error('Error deleting collaboration:', error);
        });
    }

    

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };
    return (
        <div>
            <div className="main_wrapper">
                <h1  id="project_name">{singularProject.brand_name}</h1>
                <h3>Collaborators</h3>
                <CollaboratorGrid 
                collaboratorsv2 = {collaboratorsv2}
                toTitleCase = {toTitleCase}
                singularProject = {singularProject}
                handleDelete = {handleDelete}
                allCollaborators = {allCollaborators} 
                />
                <button onClick={toggleFormVisibility}>Add Collaborator</button>   
                {isFormVisible&& (<AddCollaborator allCollaborators = {allCollaborators} singularProject = {singularProject}  collaboratorsv2 = {collaboratorsv2} setCollaboratorsv2 = {setCollaboratorsv2}/>)}
               
            </div>
        </div>
    )
    
}
export default SingleProjectComponent