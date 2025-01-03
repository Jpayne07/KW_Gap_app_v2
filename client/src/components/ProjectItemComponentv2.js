import React, { useEffect, useState } from "react";
import PatchCollaborator from "./PatchCollaborators";
import AddCollaboratorsv2 from "./AddCollaboratorsv2";


function ProjectItemComponentv2({ collaborations, projectID, setCollaborations, allCollaborations }) {
    const [isFormVisible, setIsFormVisible] = useState(false)
        const toggleFormVisibility = () => {
            console.log('test')
            setIsFormVisible(!isFormVisible);
        };

    function handleDelete(collaborationID){
          fetch(`/api/projects_collaborators/${collaborationID}`,{
              method:'DELETE',
          })
          .then(response => {
              if (!response.ok) {
                  // If the response is not OK, log the status and throw an error
                  console.error('Error response:', response.status, response.statusText);
                  throw new Error('Failed to delete collaboration');
              }
              setCollaborations(collaborations.filter(item=>item.id !== collaborationID))
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
    <div className="collaborator_grid">
        {collaborations.map(collab => (
            <div className="collaborator_item" key={collab.id}>
                <h3 key={collab.id}>{collab.user.username}</h3>
                <p>{collab.role}</p>
                <div className = "profileIcon" style={{ backgroundImage: `url(${collab.user.profile_icon})` }}></div>
                <button onClick={()=>handleDelete(collab.id)}>Delete Collaborator</button>
                <button onClick={toggleFormVisibility}>Edit Collaborator</button>
                {isFormVisible && (<PatchCollaborator id = {collab.id} setCollaborations={setCollaborations}/>)}  
            </div>
      ))}
    </div>
    <button onClick={toggleFormVisibility}>Add Collaborator</button>   
    {isFormVisible&& (<AddCollaboratorsv2 collaborations={collaborations} allCollaborations={allCollaborations} id = {projectID} setCollaborations = {setCollaborations}/>)}
    </div>
    
    
  );
}

export default ProjectItemComponentv2;
