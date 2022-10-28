import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "core/types/post";
import agent from "core/api/agent";
import {
	Column,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
	Table as ReactTable,
	getFilteredRowModel,
	PaginationState,
} from "@tanstack/react-table";
import { useMemo, useReducer, useState } from "react";
import { PaginatedData } from "core/types/paginatedData";

const columnHelper = createColumnHelper<Post>();

const columns = [
	columnHelper.accessor("title", {
		cell: (info) => info.getValue(),
		// footer: (info) => info.column.id,
	}),
	columnHelper.accessor((row) => row.body, {
		id: "body",
		cell: (info) => <i>{info.getValue()}</i>,
		header: () => <span>Body</span>,
		// footer: (info) => info.column.id,
	}),
	// columnHelper.accessor('age', {
	//   header: () => 'Age',
	//   cell: info => info.renderValue(),
	//   footer: info => info.column.id,
	// }),
];
export default function Home() {
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const fetchDataOptions = {
		pageIndex,
		pageSize,
	};

	const { isLoading, error, data } = useQuery<PaginatedData<Post>, Error>(
		["feedData", fetchDataOptions],
		async () => await agent.Feed.list(fetchDataOptions),
		{ keepPreviousData: true }
	);

	const defaultData = useMemo(() => [], []);

	const pagination = useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize]
	);

	const rerender = useReducer(() => ({}), {})[1];

	const table = useReactTable({
		data: (data?.data as Post[]) ?? defaultData,
		pageCount: data?.pageCount ?? -1,
		state: {
			pagination,
		},
		columns,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		manualPagination: true,
		debugTable: true,
	});

	if (isLoading) return <div>{"Loading..."}</div>;

	if (error) return <div>{"An error has occurred: " + error.message}</div>;
	console.log(table.getState().pagination);
	return (
		<div className="overflow-x-auto bg-base-100">
			<table className="table w-fit z-0">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<th
										key={header.id}
										colSpan={header.colSpan}
									>
										{header.isPlaceholder ? null : (
											<div>
												{flexRender(
													header.column.columnDef
														.header,
													header.getContext()
												)}
											</div>
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => {
						return (
							<tr  className="hover" key={row.id}>
								{row.getVisibleCells().map((cell) => {
									return (
										<td key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="h-2" />
			<div className="flex items-center gap-2">
				<button
					className="border rounded p-1"
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					{"<<"}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{"<"}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{">"}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					{">>"}
				</button>
				<span className="flex items-center gap-1">
					<div>Page</div>
					<strong>
						{table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
					</strong>
				</span>
				<span className="flex items-center gap-1">
					| Go to page:
					<input
						type="number"
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value
								? Number(e.target.value) - 1
								: 0;
							table.setPageIndex(page);
						}}
						className="border p-1 rounded w-16"
					/>
				</span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
				{isLoading ? "Loading..." : null}
			</div>
			<div>{table.getRowModel().rows.length} Rows</div>
			<div>
				<button onClick={() => rerender()}>Force Rerender</button>
			</div>
			<pre>{JSON.stringify(pagination, null, 2)}</pre>
		</div>
	);
}
