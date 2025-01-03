import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import ProjectItemComponentv2 from "../components/ProjectItemComponentv2";

function ProjectItemv2() {

    const [collaborations, setCollaborations] = useState([])
    const [loading, setLoading] = useState(true);
    const [allCollaborations, setAllCollaborations] = useState([])
    // const [activeProjectCollaborations, setActiveProjectCollaborations] = useState([])
    

    // function handleActiveProjectCollaborations (collabs) {
    //     setActiveProjectCollaborations(collabs)
    // }

    const {id} = useParams()
    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
      }

    useEffect(()=>{
        fetch(`/api/projects_collaborators`)
        .then(r=>r.json())
        .then(data=>{
            setCollaborations(data.filter(item=>item.project_id === parseInt(id)))
            setAllCollaborations(data)
            setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
        setLoading(false); // Stop loading on error
      });
    }, [id]);
      
    
      if (loading) {
        return <div>Loading...</div>; // Show a loading state while fetching data
      }
    
    //   if (!project) {
    //     return <div>No project found</div>; // Handle the case where the project is null or undefined
    //   }
        
        return(
        <div>
            {/* <ProjectItemComponent 
          singularProject = {project} 
          collaborationsFromParent =  {userCollaborations} 
          setCollaborations = {updateCollaborations}
          allCollaborators = {allCollaborators}
          toTitleCase = {toTitleCase}
          /> */}

          <ProjectItemComponentv2 
          collaborations={collaborations}  
          projectID={id}
          setCollaborations = {setCollaborations}
          allCollaborations = {allCollaborations}
          />
          </div>
        )
    
}

export default ProjectItemv2