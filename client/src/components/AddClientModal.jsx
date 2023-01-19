import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddClientModal = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name: values.name,
      email: values.email,
      phone: values.phone,
    },
    update(cache, response) {
      const {
        data: { addClient },
      } = response;
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
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
    if (values.name === "" || values.email === "" || values.phone === "") {
      return alert("Please fill in all fields");
    }
    const { name, email, phone } = values;
    addClient(name, email, phone);
    setValues({
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addClientModalLabel">
                Add Client
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
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    value={values.email}
                    className="form-control"
                    onChange={handleInputChange}
                    name="email"
                    id="email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    value={values.phone}
                    className="form-control"
                    onChange={handleInputChange}
                    name="phone"
                    id="phone"
                  />
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClientModal;
