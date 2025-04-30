import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { DataTableCard2, DateTime, DataTableFilter2 } from 'asab_webui_components';
import { useNavigate } from 'react-router-dom';


export function TableScreen(props) {
	const { t } = useTranslation();
	const [ isHoverId, setHoverId ] = useState(null);
	const navigate = useNavigate();

	const columns = [
		{
			title: "Username",
			thStyle: {minWidth: "2rem"},
			render: ({ row }) => 
			<span 
			onMouseEnter={() => setHoverId(row.id)}
			onMouseLeave={() => setHoverId(null)}>
				{isHoverId === row.id ? row.id : row.username}
			</span>
		},
		{
			title: "Email",
			thStyle: {minWidth: "2rem"},
			render: ({ row }) => row.email
		},
		{
			title: "Created at",
			thStyle: {minWidth: "4rem"},
			render: ({ row }) => <DateTime value={row.created * 1000}/> // turn into miliseconds
		},
		{
			title: "Last signed in",
			thStyle: {minWidth: "4rem"},
			render: ({ row }) => <DateTime value={row.last_sign_in * 1000}/>
		},
		{
			title: "Address",
			thStyle: {minWidth: "6rem"},
			render: ({ row }) => row.address
		},
		{
			thStyle: {width: "0px"},
			tdStyle: {padding: "0px", whiteSpace: "nowrap"},
			render: ({ row }) => (<>
				<button className="btn btn-primary me-1" onClick={() => navigate(`/users/${row.id}`)}><i className="bi bi-info-lg"></i></button>
			</>)
		}
	];

	const loader = async ({params}) => {
		try {
			let response = await axios.get("https://devtest.teskalabs.com/data", {params: params});
			const rows = response.data.data;
			const count = response.data.count;
			return { count, rows };
		}
		catch (e) {
			console.error("Error during loading:", e);
			throw e
		}
	}

	const Header = () => {
		return	(<>
			<div className="flex-fill">
				<h3>
					<i className="bi bi-stopwatch pe-2"></i>
					{t("SessionListContainer|Sessions")}
				</h3>
			</div>
			<DataTableFilter2 />
			<button type="button" className="btn btn-danger">Terminate all</button>
		</>);
	}

	return (
		<Container className='h-100'>
			<DataTableCard2 
			columns={columns}
			loader={loader}
			header={<Header/>}
			initialLimit={10}
			/>
		</Container>
	);
}
