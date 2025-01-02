import React, { useEffect, useState } from "react";
// import App from "../components/App";
import ProjectListComponent from "../components/ProjectListComponent";

function ProjectList(){
    
    const [projects, setProjects] = useState([])

    useEffect(()=>{
        fetch('/api/projects')
        .then(r=>r.json())
        .then(data=>{
            const projectMap = data.map((project)=> {
                return project
            })
            setProjects(projectMap)
            
        })
    },[])
    console.log(projects)
    

    return<div><ProjectListComponent fullProjectList = {projects}/></div>
}

export default ProjectList