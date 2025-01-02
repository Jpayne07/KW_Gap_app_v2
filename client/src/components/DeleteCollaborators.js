import React from "react";

function DeleteCollaborators({deleteID}){
    console.log(deleteID)
    function handleDelete(){
        fetch(`api/project_collaborators/${deleteID}`)
        .then(r=>r.json())
        .then(d=>{
            console.log(deleteID)
        })
    }
    return <button  onClick={handleDelete}>Delete</button>
}

export default DeleteCollaborators