import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type DataTableColumn, DataTable } from "~/components/molecule/data-table-updated";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { StatsSkeleton } from "~/components/skeletons/stats-skeleton";
import { TableSkeleton } from "~/components/skeletons/table-skeleton";
import { StatsCard } from "~/components/molecule/stats-card";
import { useMemo } from "react";
import type { UserWithRelation } from "~/zod/user.zod";
import type { LucideIcon } from "lucide-react";

export interface StatConfig {
	title: string;
	icon: LucideIcon;
	iconClass?: string;
	getValue: (users: UserWithRelation[]) => number;
	description: { subtitleText: string };
}

export interface UserManagementTemplateProps {
	// Page configuration
	pageTitle: string;
	pageDescription: string;

	// Data
	userData: { users: UserWithRelation[] } | undefined;
	isUserLoading: boolean;

	// Search
	searchTerm: string;
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

	// Table configuration
	columns: DataTableColumn<UserWithRelation>[];
	searchPlaceholder?: string;

	// Stats configuration
	statsConfig: StatConfig[];

	// Form configuration
	addButtonLabel: string;
	dialogTitle: string;
	dialogDescription: string;
	FormComponent: React.ComponentType<{
		onSubmit: (data: any) => void;
		onCancel: () => void;
	}>;

	// Navigation
	rowClickPath?: (userId: string) => string;

	// Mutation
	createMutation: any;
	createSuccessMessage?: string;
	createLoadingMessage?: string;
	createErrorMessage?: string;
}

export function UserManagementTemplate({
	pageTitle,
	pageDescription,
	userData,
	isUserLoading,
	searchTerm,
	onSearchChange,
	columns,
	searchPlaceholder = "Search...",
	statsConfig,
	addButtonLabel,
	dialogTitle,
	dialogDescription,
	FormComponent,
	rowClickPath,
	createMutation,
	createSuccessMessage = "User Created",
	createLoadingMessage = "Creating User...",
	createErrorMessage = "User Creation Failed",
}: UserManagementTemplateProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const action = searchParams.get("action");
	const isOpen = action === "create";

	const navigate = useNavigate();

	const handleRowClick = (row: UserWithRelation) => {
		if (rowClickPath) {
			navigate(rowClickPath(row.id));
		}
	};

	const handleFormSubmit = async (data: any) => {
		console.log("Submitting user data:", data);
		const mutationPromise = createMutation.mutateAsync(data);

		try {
			await toast.promise(mutationPromise, {
				loading: createLoadingMessage,
				success: () => ({
					message: createSuccessMessage,
				}),
				error: () => ({
					message: createErrorMessage,
				}),
			});
			setSearchParams({});
		} catch (error) {
			console.error(error);
		}
	};

	const handleCancel = () => {
		setSearchParams({});
	};

	const stats = useMemo(() => {
		const users = userData?.users || [];
		return statsConfig.map((config) => ({
			title: config.title,
			icon: config.icon,
			value: config.getValue(users),
			iconClass: config.iconClass,
			description: config.description,
		}));
	}, [userData, statsConfig]);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-semibold text-3xl text-balance">{pageTitle}</h1>
					<p className="text-muted-foreground">{pageDescription}</p>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				{isUserLoading
					? Array.from({ length: stats.length }).map((_, i) => (
							<StatsSkeleton key={`skeleton-${i}`} />
						))
					: stats.map((stat, index) => <StatsCard key={index} stat={stat} />)}
			</div>

			<Card>
				<CardHeader>
					<div className="flex justify-end gap-2 items-center w-full">
						<Input
							value={searchTerm}
							onChange={onSearchChange}
							placeholder={searchPlaceholder}
							className="w-[300px]"
						/>
						<Button onClick={() => setSearchParams({ action: "create" })}>
							<Plus className="mr-2 size-4" />
							{addButtonLabel}
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					{isUserLoading ? (
						<TableSkeleton
							rows={5}
							colWidths={["w-[15%]", "w-[25%]", "w-[20%]", "w-[25%]", "w-[15%]"]}
						/>
					) : (
						<DataTable
							columns={columns}
							data={userData?.users || []}
							onRowClick={handleRowClick}
						/>
					)}
				</CardContent>
			</Card>

			<Dialog
				open={isOpen}
				onOpenChange={(open) => {
					if (!open) {
						setSearchParams({});
					}
				}}>
				<DialogContent className="max-w-xl max-h-[90vh] flex flex-col">
					<DialogHeader>
						<DialogTitle>{dialogTitle}</DialogTitle>
						<DialogDescription>{dialogDescription}</DialogDescription>
					</DialogHeader>
					<FormComponent onSubmit={handleFormSubmit} onCancel={handleCancel} />
				</DialogContent>
			</Dialog>
		</div>
	);
}
