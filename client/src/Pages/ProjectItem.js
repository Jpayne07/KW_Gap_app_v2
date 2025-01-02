import React,{ useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectItemComponent from "../components/ProjectItemComponent";

function ProjectItem(){
    const {id} = useParams()
    const [project, setProject] = useState(null); // Initialize as null to represent "no data" state
    const [loading, setLoading] = useState(true); // Add a loading state
    const [userCollaborations, setUserCollaborations] = useState([])
    const [allCollaborators,  setAllCollaborators]=useState([])
    

    function updateCollaborations(updatedCollaborations) {
      setUserCollaborations(updatedCollaborations);
  }

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }

    useEffect(()=>{
        fetch(`/api/projects/${id}`)
        .then(r=>r.json())
        .then(data=>{
            setProject(data)
            setLoading(false); // Stop loading once data is fetched
          const collabs = data.users.map(user=>{
          return user.collaborations.filter(item=>item.project_id ===parseInt(id))
        })

          setUserCollaborations(collabs.flat())
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
        setLoading(false); // Stop loading on error
      });
  }, [id]);

  useEffect(()=>{
    fetch(`/api/projects_collaborators`)
    .then(r=>r.json())
    .then(data=>{
      setAllCollaborators(data)
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

  if (!project) {
    return <div>No project found</div>; // Handle the case where the project is null or undefined
  }

    return(<div><ProjectItemComponent 
      singularProject = {project} 
      collaborationsFromParent =  {userCollaborations} 
      setCollaborations = {updateCollaborations}
      allCollaborators = {allCollaborators}
      toTitleCase = {toTitleCase}
      /></div>)
}

export default ProjectItem