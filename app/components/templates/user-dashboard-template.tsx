import { TrendingUp, Clock, ShoppingCart, FileText, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function UserDashboardTemplate() {
	const stats = [
		{
			title: "Active Orders",
			icon: ShoppingCart,
			value: "25",
			description: {
				trend: "+5%",
				period: "from last month",
			},
		},
		{
			title: "Active Products",
			icon: FileText,
			value: "150",
			description: {
				trend: "+10%",
				period: "from last month",
			},
		},
		{
			title: "Pending Requests",
			icon: Clock,
			value: "8",
			description: {
				trend: "+3%",
				period: "from last month",
			},
			iconClass: "text-warning",
		},
		{
			title: "Orders to Receive",
			icon: TrendingUp,
			value: "5",
			description: {
				trend: "+1%",
				period: "from last month",
			},
			iconClass: "text-success",
		},
	];

	const activities = [
		{
			type: "Delivery Request Received",
			department: "Pharmacy",
			amount: "₱25,000",
			time: "2 hours ago",
		},
		{
			type: "Delivery Order Created",
			supplier: "HealthCare Supplies Ltd",
			amount: "₱15,000",
			time: "4 hours ago",
		},
		{
			type: "Delivery Receipt Created",
			department: "Radiology",
			amount: "₱30,000",
			time: "6 hours ago",
		},
		{
			type: "Added New Product",
			supplier: "Syringes (50 units)",
			amount: "1 product",
			time: "8 hours ago",
		},
		{
			type: "Added New Supplier",
			supplier: "Global Medical Inc",
			amount: "1 supplier",
			time: "10 hours ago",
		},
		{
			type: "Added New Department",
			department: "Laboratory",
			amount: "1 department",
			time: "12 hours ago",
		},
		{
			type: "Delivery Request Received",
			department: "Hemodialysis",
			amount: "₱20,000",
			time: "1 day ago",
		},
		{
			type: "Delivery Order Created",
			supplier: "MedSupply Co.",
			amount: "₱22,000",
			time: "1 day ago",
		},
	];

	const pendingTasks = [
		{
			title: "Delivery Request #DR-2025-001",
			description: "Pharmacy - Request for 50 syringes, due tomorrow",
			action: "Approve",
			href: "/delivery-requests/approve",
		},
		{
			title: "Delivery Order #DO-2025-003",
			description: "Radiology - No receipt generated yet (Margin: 25%)",
			action: "Review",
			href: "/delivery-orders/review",
		},
		{
			title: "Delivery Request #DR-2025-004",
			description: "Laboratory - Request for ventilator parts, urgent",
			action: "Approve",
			href: "/delivery-requests/approve",
		},
		{
			title: "Delivery Order #DO-2025-002",
			description: "Pharmacy - Pending receipt confirmation",
			action: "Review",
			href: "/delivery-orders/review",
		},
		{
			title: "Delivery Request #DR-2025-005",
			description: "Hemodialysis - Request for pediatric medications",
			action: "Approve",
			href: "/delivery-requests/approve",
		},
		{
			title: "Delivery Order #DO-2025-006",
			description: "Laboratory - Shipment arrived, receipt overdue",
			action: "Review",
			href: "/delivery-orders/review",
		},
		{
			title: "Delivery Request #DR-2025-007",
			description: "PPP Office - Request for imaging supplies",
			action: "Approve",
			href: "/delivery-requests/approve",
		},
		{
			title: "Delivery Order #DO-2025-001",
			description: "PPP Management - No receipt for last delivery",
			action: "Review",
			href: "/delivery-orders/review",
		},
	];

	const quickActions = [
		{
			icon: TrendingUp,
			text: "Manage Products",
			href: "/inventory/products",
		},
		{
			icon: ShoppingCart,
			text: "New Delivery Order",
			href: "/delivery-orders",
		},
		{
			icon: DollarSign,
			text: "New Delivery Receipt",
			href: "/delivery-receipt",
		},
	];

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="font-semibold text-3xl text-balance">Dashboard</h1>
				<Select defaultValue="today">
					<SelectTrigger className="w-[180px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="today">Today</SelectItem>
						<SelectItem value="week">This Week</SelectItem>
						<SelectItem value="month">This Month</SelectItem>
						<SelectItem value="quarter">This Quarter</SelectItem>
						<SelectItem value="year">This Year</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Stats Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat, i) => {
					const Icon = stat.icon;
					return (
						<Card key={i}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="font-medium text-sm">{stat.title}</CardTitle>
								<Icon
									className={`size-4 ${stat.iconClass || "text-muted-foreground"}`}
								/>
							</CardHeader>
							<CardContent>
								<div className="font-bold text-2xl">{stat.value}</div>
								<p className="text-muted-foreground text-xs">
									<span className="text-success">{stat.description.trend}</span>{" "}
									{stat.description.period}
								</p>
							</CardContent>
						</Card>
					);
				})}
			</div>

			<div className="grid gap-4 md:grid-cols-5 ">
				<Card className="md:col-span-3 h-76">
					<CardHeader>
						<CardTitle>
							Action Items{" "}
							<span className="font-normal text-gray-600">
								({pendingTasks.length})
							</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="max-h-full overflow-y-auto minimal-scrollbar mr-1">
						<div className="space-y-4">
							{pendingTasks.map((task, i) => (
								<div key={i} className="flex items-center justify-between">
									<div className="space-y-1">
										<p className="font-medium text-sm">{task.title}</p>
										<p className="text-muted-foreground text-xs">
											{task.description}
										</p>
									</div>
									<Button size="sm" variant="outline" asChild>
										<Link to={task.href}>{task.action}</Link>
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="md:col-span-2">
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 gap-4">
							{quickActions.map((action, i) => {
								const Icon = action.icon;
								return (
									<Button
										key={i}
										variant="outline"
										asChild
										className="justify-start">
										<Link to={action.href}>
											<Icon className="mr-2 size-4" />
											{action.text}
										</Link>
									</Button>
								);
							})}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Activities */}
			<Card className="h-54">
				<CardHeader>
					<CardTitle>
						Inventory Activities{" "}
						<span className="font-normal text-gray-600">({activities.length})</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="max-h-full overflow-y-auto minimal-scrollbar mr-1">
					<div className="space-y-3">
						{activities.map((activity, i) => (
							<div key={i} className="flex items-center justify-between">
								<div className="flex gap-4">
									<p className="font-medium text-sm w-54">{activity.type}</p>
									<p className="text-muted-foreground text-xs">
										{activity.supplier || activity.department} • {activity.time}
									</p>
								</div>
								<Badge variant="outline">{activity.amount}</Badge>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
