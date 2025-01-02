import React, { useState, useEffect } from "react";
import "../index.css"
import DeleteCollaborators from "./DeleteCollaborators";
import { Formik, Field, Form } from 'formik';



function SingleProjectComponent({singularProject, collaborationsFromParent, allCollaborators, toTitleCase}){
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [collaboratorsv2, setCollaboratorsv2] = useState([])
    const[projectUsers, setProjectUsers] = useState(singularProject.users)
    const[newCollabUsername, setNewCollabUsername] = useState('')
    const[newCollabRole, setNewCollabRole] = useState('')

   

    const existingUserIds = singularProject.collaborations.map(item => item.user_id);
    const nonPresentCollaborators = allCollaborators.filter(item => !existingUserIds.includes(item.user_id));
    const thisProjectCollaborators = allCollaborators.filter(item=>item.project_id!==singularProject.id)
    const thisitem = new Set(thisProjectCollaborators.map(collaborator=>(collaborator.user.username)))
    console.log(thisitem)
    useEffect(() => {
        const collabHolder = singularProject.collaborations.map(collaborator => collaborator.user);
        setCollaboratorsv2(collabHolder);
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
        console.log(isFormVisible)
    };

    // function handleAdd(collaborations){
    //     fetch(`/api/projects_collaborators/${test[0].id}`,{
    //         method:'POST',
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             // If the response is not OK, log the status and throw an error
    //             console.error('Error response:', response.status, response.statusText);
    //             throw new Error('Failed to add new collaborator');
    //         }
    //         return response.json();  // Only call .json() if the response is OK
    //     })
    //     .then(r => {
    //         console.log('Collaboration deleted:', r);
    //     })
    //     .catch(error => {
    //         console.error('Error deleting collaboration:', error);
    //     });
    // }
    return (
        <div>
            <div className="main_wrapper">
                <h1  id="project_name">{singularProject.brand_name}</h1>
                <h3>Collaborators</h3>
                {/* Grid starts below */}
                <div className="collaborator_grid">
                    {collaboratorsv2.map(user=>{
                        return <div className="collaborator_item" key={user.username}>
                                <p>{toTitleCase(`${user.username}: `)}</p>
                                <p>{user.collaborators.filter((collaboration) => 
                                    collaboration.project_id === singularProject.id)
                                    .map((collaboration) => (toTitleCase((collaboration.role))))
                                    .join(", ")}
                                </p>
                                <div className = "profileIcon" style={{ backgroundImage: `url(${user.profile_icon})` }}>
                                </div>
                                <button onClick={()=>handleDelete(user.collaborators)}>Delete Collaborator</button>  
                                </div>  
                    })}
                   
                </div>
                <button onClick={toggleFormVisibility}>Add Collaborator</button>   
                {isFormVisible&&(
                                    <div>
                                        <p>Add New Collaborator</p>
                                        <div className="form-wrapper">
                                        <Formik
                                        initialValues={{
                                            username: '',
                                            role: '',
                                        }}
                                        onSubmit={async (values) => {
                                            await new Promise((r) => setTimeout(r, 500));
                                            alert(JSON.stringify(values, null, 2));
                                        }}
                                        >
                                        
                                            <Form>
                                                <label htmlFor="username">Username</label>
                                                <Field as="select" id="username" name="username" className = "input-field" >
                                                    {['select a user',...thisitem].map(item=><option label={item}>{item}</option>)}
                                                </Field>

                                                <label htmlFor="role">Role</label>
                                                <br/>
                                                <Field as="select" name="role"className = "input-field" >
                                                    <option value="">Select a role</option>
                                                    <option value="owner">Owner</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="editor">Editor</option>
                                                </Field>
                                                <br/>
                                                <button type="submit">Submit</button>
                                            </Form>
                                        
                                        </Formik>
                                        </div>
                                    </div>)}
            </div>
        </div>
    )
    
}
export default SingleProjectComponent