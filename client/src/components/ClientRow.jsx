import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // re-fetch clients array after execution
    // refetchQueries: [
    //   {
    //     query: GET_CLIENTS,
    //   },
    // ],

    // update cache with latest clients data after execution
    // update(cache, response) {
    //   const {
    //     data: { deleteClient },
    //   } = response;
    //   const { clients } = cache.readQuery({
    //     query: GET_CLIENTS,
    //   });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },

    // refetch queries after deleting client
    refetchQueries: [
      {
        query: GET_CLIENTS,
      },
      { query: GET_PROJECTS },
    ],
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          onClick={deleteClient}
          className="btn btn-outline-danger btn-sm"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
