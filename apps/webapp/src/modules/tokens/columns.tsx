"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CoinData } from "@/src/types/token"
import Image from "next/image"

const formatPrice = (price: number) => `$${price.toFixed(2)}`
const formatLargeNumber = (num: number) => num.toLocaleString()

const CoinImage = ({ imageUrl, name }: { imageUrl: string; name: string }) => (
	<div className="w-8 h-8 relative">
		<Image
			src={`https://www.cryptocompare.com${imageUrl}`}
			alt={name || "Token"}
			width={32}
			height={32}
			className="rounded-full"
		/>
	</div>
)

const ActionMenu = ({ coinId }: { coinId: string }) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" className="h-8 w-8 p-0">
				<span className="sr-only">Open menu</span>
				<MoreHorizontal className="h-4 w-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuLabel>Actions</DropdownMenuLabel>
			<DropdownMenuItem onClick={() => navigator.clipboard.writeText(coinId)}>
				Copy coin ID
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem>View details</DropdownMenuItem>
			<DropdownMenuItem>View on explorer</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
)

export const columns: ColumnDef<CoinData>[] = [
	{
		accessorKey: "CoinInfo.Name",
		header: "Symbol",
		id: "symbol",
	},
	{
		accessorKey: "CoinInfo.FullName",
		header: "Name",
		id: "name",
	},
	{
		id: "image",
		header: "Logo",
		cell: ({ row }) => {
			const imageUrl = row.original.CoinInfo?.ImageUrl
			return imageUrl ? (
				<CoinImage
					imageUrl={imageUrl}
					name={row.original.CoinInfo?.Name || ""}
				/>
			) : null
		},
	},
	{
		accessorFn: (row) => {
			const price = row.ConversionInfo?.RAW?.[0]?.split('~')?.[6]
			return price ? parseFloat(price) : 0
		},
		header: "Price (USD)",
		id: "price",
		cell: ({ getValue }) => {
			const value = getValue() as number
			return <div>{formatPrice(value)}</div>
		},
	},
	{
		accessorFn: (row) => {
			const volume = row.ConversionInfo?.TotalVolume24H
			return volume ? parseFloat(volume.toString()) : 0
		},
		header: "24h Volume",
		id: "volume",
		cell: ({ getValue }) => {
			const value = getValue() as number
			return <div>${formatLargeNumber(value)}</div>
		},
	},
	{
		accessorFn: (row) => {
			const supply = row.ConversionInfo?.Supply
			return supply && supply > 0 ? parseFloat(supply.toString()) : 0
		},
		header: "Supply",
		id: "supply",
		cell: ({ getValue }) => {
			const value = getValue() as number
			return <div>{formatLargeNumber(value)}</div>
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <ActionMenu coinId={row.original.CoinInfo.Id} />,
	},
] 