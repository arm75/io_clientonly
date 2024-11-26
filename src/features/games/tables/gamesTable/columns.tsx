import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../../app/components/shadcn/ui/button'
import { Badge } from '../../../../app/components/shadcn/ui/badge'
import { Game } from '../../../play/types/entity/game'

export const columns: ColumnDef<Game>[] = [
    // {
    // 	id: "select",
    // 	header: ({ table }) => (
    // 		<Checkbox
    // 			checked={table.getIsAllPageRowsSelected()}
    // 			onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    // 			aria-label="Select all"
    // 		/>
    // 	),
    // 	cell: ({ row }) => (
    // 		<Checkbox
    // 			checked={row.getIsSelected()}
    // 			onCheckedChange={(value) => row.toggleSelected(!!value)}
    // 			aria-label="Select row"
    // 		/>
    // 	),
    // 	enableSorting: false,
    // 	enableHiding: false,
    // },
    {
        accessorKey: '_id',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Id
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Game Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'description',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'players',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Players
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: (value) => {
            const playersArray = value.getValue() as any
            const namesArray = playersArray.map((player: any) => player?.username)

            return namesArray.map((name: any, index: any) => (
                <Badge key={`badge-${index}-${10 * index}`} className="mr-1 bg-emerald-500">
                    <span className="mr-1">{name}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-thumbs-up"
                    >
                        <path d="M7 10v12" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-thumbs-down"
                    >
                        <path d="M17 14V2" />
                        <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </Badge>
            ))
            // for (let x = 1; x < 4; x++) {
            // 	namesArray.push("admin")
            // }

            // return namesArray.join(", ")
        },
    },
    // {
    // 	accessorKey: "active",
    // 	header: ({ column }) => {
    // 		return (
    // 			<Button
    // 				variant="ghost"
    // 				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    // 			>
    // 				Active
    // 				<ArrowUpDown className="ml-2 h-4 w-4" />
    // 			</Button>
    // 		)
    // 	},
    // },
]
