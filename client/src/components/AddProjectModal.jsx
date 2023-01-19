import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddProjectModal = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    clientId: "",
    status: "new",
  });

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name: values.name,
      description: values.description,
      clientId: values.clientId,
      status: values.status,
    },
    update(cache, response) {
      const {
        data: { addProject },
      } = response;
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  // GET clients data for select option
  const { data, loading, error } = useQuery(GET_CLIENTS);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      values.name === "" ||
      values.description === "" ||
      values.status === ""
    ) {
      return alert("Please fill in all fields");
    }
    const { name, clientId, description, status } = values;

    addProject(name, description, status, clientId);
    setValues({
      name: "",
      description: "",
      status: "new",
      clientId: "",
    });
  };

  if (loading) return null;
  if (error) return "Something went wrong";

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModalLabel">
                    New Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit} action="">
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
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        value={values.clientId}
                        onChange={handleInputChange}
                        className="form-select"
                        id="clientId"
                        name="clientId"
                      >
                        <option value="">Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddProjectModal;
