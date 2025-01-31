import DataTable from "react-data-table-component";
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const UsersTable = ({ users }) => {

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Created At",
            selector: (row) => row.created_at,
            sortable: true,
        },
        {
            name: "Updated At",
            selector: (row) => row.updated_at,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <Link to={"/users/" + row.id}>
                    <svg
                        fill="none"
                        className="block w-6 h-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        ></path>
                    </svg>
                </Link>
            ),
        },
    ];

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <DataTable
                columns={columns}
                data={users|| []}
                pagination
                highlightOnHover
                theme="dark"
            />
        </div>
    );
};

export default UsersTable;