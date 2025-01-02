import React from "react";


function ProjectListComponent({fullProjectList}){
        const projectList = fullProjectList.map((project)=> {
        return <p key={project.id}>{project.brand_name}</p>
    })

    return projectList
    
}
export default ProjectListComponent