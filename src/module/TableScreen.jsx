import React from 'react';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export function TableScreen(props) {
	const { t } = useTranslation();

	const columns = [
		{
			title: "Username",
			thStyle: {minWidth: "2rem"},
			render: ({ row }) =>
				<Link to={`/auth/session/${row._id}`}>
					{row._id}
				</Link>
		},
		{
			title: "Email",
			thStyle: {minWidth: "2rem"},
			render: ({ row }) =>
				<Link to={`/auth/credentials/${row.credentials_id}`}>
					{row.credentials_id}
				</Link>
		},
		{
			title: "Created at",
			thStyle: {minWidth: "4rem"},
			render: ({ row }) => <DateTime value={row._c}/>
		},
		{
			title: "Last signed in",
			thStyle: {minWidth: "4rem"},
			render: ({ row }) => <DateTime value={row.expiration}/>
		},
		{
			title: "Address",
			thStyle: {minWidth: "6rem"},
			render: ({ row }) => <DateTime value={row.expiration}/>
		},
		{
			thStyle: {width: "0px"},
			tdStyle: {padding: "0px", whiteSpace: "nowrap"},
			render: ({ row, column }) => (<>
				{/* TODO, redirect to the detailed page */}
				<button className="btn btn-primary me-1" onClick={() => onYClick(row)}><i className="bi bi-info-lg"></i></button>
			</>)
		}
	];

	const loader = async ({params}) => {
		let response = await axios.get("https://devtest.teskalabs.com/data", {params: params});
		const rows = response.data.data;
		const count = response.data.count;
		return { count, rows } ;
	}

	return (
		<Container className='h-100'>
			{t('Training|Hello, there is nothing here yet!')}
		</Container>
	);
}
