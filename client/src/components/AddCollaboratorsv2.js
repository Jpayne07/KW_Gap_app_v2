import React from "react";
import { Formik, Field, Form } from "formik";

function AddCollaboratorsv2({ collaborations, allCollaborations, id, setCollaborations }) {
  const currentUniqueUsers = new Set(collaborations.map((collab) => collab.user.id));

  // Find users not present in current collaborations
  const nonPresentUsers = allCollaborations.filter(
    (collab) => !currentUniqueUsers.has(collab.user.id)
  );
  console.log(collaborations)
  const nonPresentUsernames = [...new Set(nonPresentUsers.map((collab) => collab.user.username))];

  return (
    <div>
      <p>Add New Collaborator</p>
      <div className="form-wrapper">
        <Formik
          initialValues={{
            username: "",
            role: "",
          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));

            const selectedUser = nonPresentUsers.find(
              (user) => user.user.username === values.username
              
            );

            if (!selectedUser) {
              console.error("User not found");
              return;
            }
            const newUserId = selectedUser.user.id;

            fetch("/api/projects_collaborators", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: newUserId,
                project_id: id,
                role: values.role,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  console.error("Error response:", response.status, response.statusText);
                  throw new Error("Failed to add new collaborator");
                }
                // setCollaborations({})
                return response.json();
              })
              .then((newCollaboration) => {
                const newCollaborator = {
                  id: newCollaboration.id,
                  user: {
                    id: newUserId,
                    username: values.username,
                    profile_icon: selectedUser.user.profile_icon,
                  },
                  role: values.role,
                };

                // Update collaborations state
                setCollaborations((prev) => [...prev, newCollaborator]);
                console.log("Collaboration added:", newCollaboration);
              })
              .then((r) => {
                console.log("Collaboration added:", r);
              })
              .catch((error) => {
                console.error("Error adding collaboration:", error);
              });
          }}
        >
          <Form>
            <label htmlFor="username">Username</label>
            <Field as="select" id="username" name="username" className="input-field">
              <option value="">Select a user</option>
              {nonPresentUsernames.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Field>

            <label htmlFor="role">Role</label>
            <Field as="select" name="role" className="input-field">
              <option value="">Select a role</option>
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </Field>
            <br />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddCollaboratorsv2;
