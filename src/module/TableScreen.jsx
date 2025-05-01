import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { DataTableCard2, DateTime, DataTableFilter2, DataTableSort2 } from 'asab_webui_components';
import { useNavigate, useSearchParams } from 'react-router-dom';


export function TableScreen(props) {
	const { t } = useTranslation();
	const [ isHoverId, setHoverId ] = useState(null);
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const columns = [
		{
			title: t("General|Username"),
			thStyle: {minWidth: "2rem"},
			sort: "username",
			render: ({ row }) => 
			<span 
			onMouseEnter={() => setHoverId(row.id)}
			onMouseLeave={() => setHoverId(null)}>
				{isHoverId === row.id ? row.id : row.username}
			</span>
		},
		{
			title: t("Genera|Email"),
			thStyle: {minWidth: "2rem"},
			render: ({ row }) => row.email
		},
		{
			title: t("General|Created at"),
			thStyle: {minWidth: "4rem"},
			sort: "created",
			render: ({ row }) => <DateTime value={row.created * 1000}/> // turn into miliseconds
		},
		{
			title: t("General|Last signed in"),
			thStyle: {minWidth: "4rem"},
			sort: "last_sign_in",
			render: ({ row }) => <DateTime value={row.last_sign_in * 1000}/>
		},
		{
			title: t("General|Address"),
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
			const count = response.data.count;
			let rows = response.data.data;

			// would be better to sort on backend though
			const sortFields = Object.entries(params)
			.filter(([key, val]) => key.startsWith('s') && (val === 'a' || val === 'd'))
			.map(([key, val]) => [key.slice(1), val])

			for (const [col, dir] of sortFields) {
				rows = rows.slice().sort((a, b) => {
					const aVal = a[col], bVal = b[col];
					if (aVal < bVal) return dir === 'a' ? -1 : 1;
					if (aVal > bVal) return dir === 'a' ? 1 : -1;
					return 0;
				});
			}

			return { count, rows };
		}
		catch (e) {
			throw e
		}
	}

	const clearAllFilters = () => {
	  const limit = searchParams.get('i') || '10';
	  const newParams = new URLSearchParams();
	  newParams.set('p', '1');
	  newParams.set('i', limit);
	  setSearchParams(newParams, { replace: true });
	};

	const Header = () => {
		return	(<>
			<div className="flex-fill">
				<h3>
					<i className="bi bi-people-fill pe-2"></i>
					{t("General|Users")}
				</h3>
			</div>
			<button onClick={clearAllFilters} type="button" className="btn btn-danger">{t("General|Reset filters")}</button>
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
