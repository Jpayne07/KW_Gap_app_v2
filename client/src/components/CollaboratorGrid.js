import React, {useState} from "react";
import PatchCollaborator from "./PatchCollaborators";

function CollaboratorGrid({collaboratorsv2, toTitleCase, handleDelete, singularProject, allCollaborators}){
    const [isFormVisible, setIsFormVisible] = useState(false)
    const toggleFormVisibility = () => {
        console.log('test')
        setIsFormVisible(!isFormVisible);
    };
    return(
    <div className="collaborator_grid">
                    {collaboratorsv2.map(user=>{
                        return (
                        <div className="collaborator_item" key={user.id}>
                        <p>{toTitleCase(`${user.username}: `)}</p>
                        <p>{user.collaborators.filter((collaboration) => 
                            collaboration.project_id === singularProject.id)
                            .map((collaboration) => (toTitleCase((collaboration.role))))
                            .join(", ")}
                        </p>
                        <div className = "profileIcon" style={{ backgroundImage: `url(${user.profile_icon})` }}>
                        </div>
                        <button onClick={()=>handleDelete(user.collaborators)}>Delete Collaborator</button>  
                       
                       
                        <button onClick={toggleFormVisibility}>Edit Collaborator</button>   
                        {isFormVisible && (
                        <PatchCollaborator 
                        singularProject = {singularProject}  
                        collaboratorsv2 = {collaboratorsv2}
                        allCollaborators = {user.id}
                        user={user}
                        />)}
                        </div>)  
                    })}
                   
                </div>)
}

export default CollaboratorGrid