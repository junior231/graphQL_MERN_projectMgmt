import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

const EditProjectForm = ({ project }) => {
  const [values, setValues] = useState({
    name: project.name,
    description: project.description,
    status: "",
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name: values.name,
      description: values.description,
      status: values.status,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.name || !values.description || !values.status) {
      return alert("Please fill out all the fields");
    }
    const { name, description, status } = values;
    updateProject(name, description, status);
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={values.name}
            className="form-control"
            onChange={handleInputChange}
            name="name"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            value={values.description}
            className="form-control"
            onChange={handleInputChange}
            name="description"
            id="description"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={values.status}
            onChange={handleInputChange}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
