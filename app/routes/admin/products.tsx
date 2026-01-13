import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Package, LayoutGrid, List, Search, Filter } from "lucide-react";
import { DataTable, type DataTableColumn } from "~/components/molecule/data-table-updated";
import { ProductGrid } from "~/components/organism/product-grid";
import { ProductCreateDialog } from "~/components/organism/product-create-dialog";
import { MOCK_PRODUCTS, type Product } from "~/data/mock-admin-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminProductsPage() {
	const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

	const handleProductCreate = (newProduct: Product) => {
		setProducts([newProduct, ...products]);
	};

	const columns: DataTableColumn<Product>[] = [
		{
			key: "name",
			label: "Product Name",
			sortable: true,
			searchable: true,
			render: (value, row) => (
				<div className="flex items-center gap-3">
					<div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
						{row.image ? (
							<img
								src={row.image}
								alt={row.name}
								className="h-full w-full object-cover"
							/>
						) : (
							<Package className="h-5 w-5 text-muted-foreground" />
						)}
					</div>
					{row.name}
				</div>
			),
		},
		{
			key: "category",
			label: "Category",
			sortable: true,
			filterable: true,
			filterOptions: [
				{ label: "Electronics", value: "Electronics" },
				{ label: "Furniture", value: "Furniture" },
			],
		},
		{
			key: "vendor",
			label: "Vendor",
			sortable: true,
		},
		{
			key: "price",
			label: "Price",
			sortable: true,
			render: (value) => `$${Number(value).toLocaleString()}`,
		},
		{
			key: "stock",
			label: "Stock",
			sortable: true,
		},
		{
			key: "status",
			label: "Status",
			sortable: true,
			filterable: true,
			filterOptions: [
				{ label: "Active", value: "active" },
				{ label: "Draft", value: "draft" },
				{ label: "Archived", value: "archived" },
			],
			render: (value) => (
				<Badge
					variant={value === "active" ? "default" : "secondary"}
					className="capitalize">
					{value}
				</Badge>
			),
		},
		{
			key: "id", // Using ID as key for actions column
			label: "Actions",
			className: "text-right",
			render: (_, row) => (
				<div className="text-right">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem>Edit Details</DropdownMenuItem>
							<DropdownMenuItem>Update Stock</DropdownMenuItem>
							<DropdownMenuItem className="text-red-600">
								Archive Product
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			),
		},
	];

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Products</h1>
					<p className="text-muted-foreground">
						Manage your product catalog and listings.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Tabs
						value={viewMode}
						onValueChange={(v) => setViewMode(v as "grid" | "table")}>
						<TabsList>
							<TabsTrigger value="grid">
								<LayoutGrid className="h-4 w-4 mr-2" />
								Grid
							</TabsTrigger>
							<TabsTrigger value="table">
								<List className="h-4 w-4 mr-2" />
								Table
							</TabsTrigger>
						</TabsList>
					</Tabs>
					<Button onClick={() => setIsModalOpen(true)}>
						<Plus className="mr-2 h-4 w-4" />
						Add Product
					</Button>
				</div>
			</div>

			<ProductCreateDialog
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				onProductCreate={handleProductCreate}
			/>

			<div className="space-y-4">
				{/* 
					Note: The DataTable has its own built-in search/filter. 
					For Grid view, we arguably need separate controls or shared controls.
					For now, DataTable handles its own state. 
					If we want shared state, we'd lift search/filter state up.
					Given the scope, I will rely on DataTable for Table View 
					and maybe just show all in Grid View or add basic search 
					if I had time, but "DataTable" implies it encapsulates that logic.
					
					However, to make Grid view useful with many products, we might want search.
					For this refactor, I'll stick to displaying the list.
				*/}

				{viewMode === "grid" ? (
					<ProductGrid products={products} />
				) : (
					<div className="rounded-md border bg-card">
						<DataTable columns={columns} data={products} />
					</div>
				)}
			</div>
		</div>
	);
}
