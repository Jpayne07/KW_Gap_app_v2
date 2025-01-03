import React from "react";
import PatchCollaborator from "./PatchCollaborators";

function CollaboratorGrid({collaboratorsv2, toTitleCase, handleDelete, singularProject}){
    return(
    <div className="collaborator_grid">
                    {collaboratorsv2.map(user=>{
                        return (
                        <div className="collaborator_item" key={user.username}>
                        <p>{toTitleCase(`${user.username}: `)}</p>
                        <p>{user.collaborators.filter((collaboration) => 
                            collaboration.project_id === singularProject.id)
                            .map((collaboration) => (toTitleCase((collaboration.role))))
                            .join(", ")}
                        </p>
                        <div className = "profileIcon" style={{ backgroundImage: `url(${user.profile_icon})` }}>
                        </div>
                        <button onClick={()=>handleDelete(user.collaborators)}>Delete Collaborator</button>  
                        {/* <button >Edit Collaborator</button>    */}
                        {/* {isFormVisible&& (<PatchCollaborator allCollaborators = {allCollaborators} singularProject = {singularProject}  collaboratorsv2 = {collaboratorsv2} setCollaboratorsv2 = {setCollaboratorsv2}/>)} */}
                        </div>)  
                    })}
                   
                </div>)
}

export default CollaboratorGrid