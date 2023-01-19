import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: id },
  });

  if (loading) return <Spinner />;

  if (error) return <p>Something went wrong!</p>;

  const { project } = data && data;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto card w-75 p-5">
          <Link
            to="/"
            className="btn btn-outline-info btn-sm w-25 d-inline ms-auto"
          >
            Back
          </Link>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{project.status}</p>

          <ClientInfo client={project.client} />

          <EditProjectForm project={project} />
          <DeleteProjectButton projectId={id} />
        </div>
      )}
    </>
  );
};

export default Project;
