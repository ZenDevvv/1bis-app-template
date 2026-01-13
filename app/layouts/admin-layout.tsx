import { Outlet, NavLink, useLocation } from "react-router";
import {
	LayoutDashboard,
	Users,
	FileCheck,
	PieChart,
	Settings,
	LogOut,
	Menu,
	X,
	Package,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const location = useLocation();

	const navItems = [
		{ href: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
		{ href: "/admin/approvals", icon: FileCheck, label: "Approvals" },
		{ href: "/admin/products", icon: Package, label: "Products" },
		{ href: "/admin/employees", icon: Users, label: "Employees" },
		{ href: "/admin/reports", icon: PieChart, label: "Reports" },
		{ href: "/admin/settings", icon: Settings, label: "Settings" },
	];

	return (
		<div className="flex min-h-screen bg-muted/40 dark:bg-muted/10">
			{/* Mobile Sidebar Overlay */}
			<div
				className={cn(
					"fixed inset-0 z-40 bg-black/50 lg:hidden",
					isSidebarOpen ? "block" : "hidden",
				)}
				onClick={() => setIsSidebarOpen(false)}
			/>

			{/* Sidebar */}
			<aside
				className={cn(
					"fixed inset-y-0 left-0 z-50 bg-card border-r transition-all duration-300 ease-in-out",
					"lg:static lg:translate-x-0",
					isSidebarOpen
						? "w-64 translate-x-0"
						: "w-64 -translate-x-full lg:w-0 lg:overflow-hidden lg:border-r-0",
				)}>
				<div className="flex h-16 items-center border-b px-6 min-w-[16rem]">
					<div className="flex items-center gap-2 font-bold text-xl text-primary">
						<div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
							A
						</div>
						<span>Admin</span>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="ml-auto lg:hidden"
						onClick={() => setIsSidebarOpen(false)}>
						<X className="h-5 w-5" />
					</Button>
				</div>

				<div className="flex flex-col gap-1 p-4 min-w-[16rem]">
					{navItems.map((item) => (
						<NavLink
							key={item.href}
							to={item.href}
							end={item.end}
							className={({ isActive }) =>
								cn(
									"flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
									isActive
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:bg-muted hover:text-foreground",
								)
							}>
							<item.icon className="h-4 w-4" />
							{item.label}
						</NavLink>
					))}
				</div>

				<div className="absolute bottom-4 left-4 right-4 min-w-[14rem]">
					<Button variant="outline" className="w-full justify-start gap-3" asChild>
						<a href="/auth/login">
							<LogOut className="h-4 w-4" />
							Sign Out
						</a>
					</Button>
				</div>
			</aside>

			{/* Main Content */}
			<div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
				<header className="flex h-16 items-center gap-4 border-b bg-background pl-3 pr-6">
					<Button
						variant="ghost"
						size="icon"
						className="cursor-pointer"
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
						<Menu className="h-6 w-6" />
					</Button>
					<div className="ml-auto flex items-center gap-4">
						<div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
							JD
						</div>
					</div>
				</header>
				<main className="flex-1 p-6 overflow-y-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
