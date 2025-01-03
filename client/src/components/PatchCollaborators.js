import React from "react";
import { Formik, Field, Form } from 'formik';

function PatchCollaborator({id,setCollaborations}){
    console.log(id)
    return(
        <div>
        <p>Edit Collaborator</p>
        <div className="form-wrapper">
        <Formik
        initialValues={{
            username: ''
        }}
        onSubmit={async (values) => {
            
            await new Promise((r) => setTimeout(r, 500));
            const newrole = values.role
            
            fetch(`/api/projects_collaborators/${id}`,{
                        method:'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ 
                            role: newrole
                            }),
                    })
                    .then(response => {
                        if (!response.ok) {
                            // If the response is not OK, log the status and throw an error
                            
                            console.error('Error response:', response.status, response.statusText);
                            throw new Error('Failed to update new collaborator');
                        }
                        setCollaborations((prevCollaborators) =>
                            prevCollaborators.map((collab) =>
                              collab.id === id ? { ...collab, role: newrole } : collab
                            )
                          );
                        return response.json();  // Only call .json() if the response is OK
                    })
                    .then(r => {
                        console.log('Collaboration updated:', r);
                    })
                    .catch(error => {
                        console.error('Error updating collaboration:', error);
                    });
        }}
        >
        
            <Form>
                <label htmlFor="role">Role</label>

                <Field as="select" name="role"className = "input-field" >
                                    <option value="">Select a role</option>
                                    <option value="owner">Owner</option>
                                    <option value="admin">Admin</option>
                                    <option value="editor">Editor</option>
                </Field>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
        </div>
    </div>)}

export default PatchCollaborator