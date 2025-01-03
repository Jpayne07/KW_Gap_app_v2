import React from "react";
import { Formik, Field, Form } from 'formik';

function AddCollaborator({collaboratorsv2, allCollaborators, setCollaboratorsv2, singularProject}){
    console.log(singularProject.id)
    console.log('test', collaboratorsv2)
    const thisProjectCollaborators = allCollaborators.filter(item=>item.project_id!==singularProject.id)
    const thisitem = new Set(thisProjectCollaborators.map(collaborator=>(collaborator.user.username)))
    const thisitemID = thisProjectCollaborators.map(collaborator=>(collaborator.user))
    
    

    return(
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
            const new_user_id = thisitemID.filter(item=>{return item.username === values.username})
            
            const  new_user_idd = new_user_id.map(user=>{return user.id})
            const userIdToAdd = ([...new Set(new_user_idd)][0])
            
            const findUserCollaborations = collaboratorsv2.filter(item=>item.id = new_user_idd)
            
            fetch(`http://localhost:5555/api/projects_collaborators`,{
                        method:'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ 
                            'user_id': userIdToAdd,
                            'project_id': singularProject.id,
                            'role': values.role
                            }),
                    })
                    .then(response => {
                        if (!response.ok) {
                            // If the response is not OK, log the status and throw an error
                            
                            console.error('Error response:', response.status, response.statusText);
                            throw new Error('Failed to add new collaborator');
                        }
                        return response.json();  // Only call .json() if the response is OK
                    })
                    .then(r => {
                        const newUser = { id: userIdToAdd, username: values.username, profile_icon: findUserCollaborations[0].profile_icon, collaborators: [r] };
                        setCollaboratorsv2(prevCollaborators => [...prevCollaborators, newUser]);
                        console.log('Collaboration added:', r);
                    })
                    .catch(error => {
                        console.error('Error deleting collaboration:', error);
                    });
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

export default AddCollaborator