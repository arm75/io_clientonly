import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Button } from '../../../../app/components/shadcn/ui/button'
import { Input } from '../../../../app/components/shadcn/ui/input'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../../../../app/components/shadcn/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../app/components/shadcn/ui/table'
import React from 'react'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import { useAtomValue } from 'jotai'
import { socketAtom } from '../../../../app/state/socketAtom'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    startGameFn: (_id: any) => void
    joinGameFn: (_id: any) => void
    updateGameFn: (_id: any) => void
    cancelGameFn: (_id: any) => void
    deleteGameFn: (_id: any) => void
}

export function DataTable<TData, TValue>({ columns, data, startGameFn, joinGameFn, updateGameFn, cancelGameFn, deleteGameFn }: DataTableProps<TData, TValue>) {
    const socket = useAtomValue(socketAtom)

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    // socket.on("connection", () => {
    // 	console.log(`I'm connected with the back-end`)
    // })

    // const [message, setMessage] = useState("")
    // const [messages, setMessages] = useState<string[]>([])

    // useEffect(() => {
    // 	console.log("useEffect ran")
    // 	socket.on("chat message", (message: string) => {
    // 		setMessages([...messages, message])
    // 	})
    // }, [messages])

    const handleStartGameClick = (row: any) => {
        // console.log("StartGame Clicked with ID: ", id)
        // socket.emit("startGame", id)
        const rowIdClicked = row
        startGameFn(rowIdClicked)
    }

    const handleJoinGameClick = (row: any): void => {
        const rowIdClicked = row
        joinGameFn(rowIdClicked)
        //console.log(rowIdClicked)
    }

    const handleUpdateGameClick = (row: any): void => {
        const rowIdClicked = row
        updateGameFn(rowIdClicked)
        //console.log(rowIdClicked)
    }

    const handleCancelGameClick = (row: any): void => {
        const rowIdClicked = row
        cancelGameFn(rowIdClicked)
        //console.log(rowIdClicked)
    }

    const handleDeleteGameClick = (row: any): void => {
        const rowIdClicked = row
        deleteGameFn(rowIdClicked)
        //console.log(rowIdClicked)
    }

    return (
        <>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by Name..."
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="border">
                <Table className="bg-white">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                    <TableCell className="text-right">
                                        <Button
                                            onClick={() => handleStartGameClick(row.getValue('_id'))}
                                            className="text-white align-top bg-emerald-500 border border-emerald-900 hover:bg-emerald-800 mx-1"
                                            size="sm"
                                        >
                                            START GAME
                                        </Button>
                                        <Button
                                            onClick={() => handleJoinGameClick(row.getValue('_id'))}
                                            className="text-white align-top bg-emerald-500 border border-emerald-900 hover:bg-emerald-800 mx-1"
                                            size="sm"
                                        >
                                            JOIN GAME
                                        </Button>
                                        <Button
                                            onClick={() => handleUpdateGameClick(row.getValue('_id'))}
                                            className="text-white bg-emerald-500 border border-emerald-900 hover:bg-emerald-800 mx-1"
                                            size="sm"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            onClick={() => handleCancelGameClick(row.getValue('_id'))}
                                            className="text-white align-top bg-red-500 border border-red-900 hover:bg-red-800 mx-1"
                                            size="sm"
                                        >
                                            CANCEL
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteGameClick(row.getValue('_id'))}
                                            className="text-white bg-red-500 border border-red-900 hover:bg-red-800 mx-1"
                                            size="sm"
                                        >
                                            <Trash2Icon className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between">
                <div className="text-left p-4 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="text-right p-4">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </>
    )
}
