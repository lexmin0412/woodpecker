'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "./calendar-date-range-picker";
// import { CalendarDateRangePicker } from "@/app/(app)/examples/dashboard/components/date-range-picker"
// import { MainNav } from "@/app/(app)/examples/dashboard/components/main-nav"
import { Overview } from "./overview"
import { RecentSales } from "./recent-sales"
// import { Search } from "@/app/(app)/examples/dashboard/components/search"
// import TeamSwitcher from "@/app/(app)/examples/dashboard/components/team-switcher"
// import { UserNav } from "@/app/(app)/examples/dashboard/components/user-nav"

export default function DashboardMain() {
	return (
		<div className="flex-1 space-y-4 p-8 pt-6">
		<div className="flex items-center justify-between space-y-2">
			<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
			<div className="flex items-center space-x-2 text-black">
				<CalendarDateRangePicker />
				<Button>Download</Button>
			</div>
		</div>
		<Tabs defaultValue="overview" className="space-y-4">
			<TabsList	>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="analytics" disabled>
					Analytics
				</TabsTrigger>
				<TabsTrigger value="reports" disabled>
					Reports
				</TabsTrigger>
				<TabsTrigger value="notifications" disabled>
					Notifications
				</TabsTrigger>
			</TabsList>
			<TabsContent value="overview" className="space-y-4">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								总健康度
							</CardTitle>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="h-4 w-4 text-muted-foreground"
							>
								<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
							</svg>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">85.77</div>
							<p className="text-xs text-muted-foreground">
								比昨天 +0.3%
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								错误数
							</CardTitle>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="h-4 w-4 text-muted-foreground"
							>
								<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
								<circle cx="9" cy="7" r="4" />
								<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
							</svg>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">+162</div>
							<p className="text-xs text-muted-foreground">
								比昨天 +49
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">警告数</CardTitle>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="h-4 w-4 text-muted-foreground"
							>
								<rect width="20" height="14" x="2" y="5" rx="2" />
								<path d="M2 10h20" />
							</svg>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">+683</div>
							<p className="text-xs text-muted-foreground">
								比昨天 +19%
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								应用数
							</CardTitle>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="h-4 w-4 text-muted-foreground"
							>
								<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
							</svg>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">+305</div>
							<p className="text-xs text-muted-foreground">
								比昨天 +3
							</p>
						</CardContent>
					</Card>
				</div>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
					<Card className="col-span-4">
						<CardHeader>
							<CardTitle>Overview</CardTitle>
						</CardHeader>
						<CardContent className="pl-2">
							<Overview />
						</CardContent>
					</Card>
					<Card className="col-span-3">
						<CardHeader>
							<CardTitle>错误/警告数排行</CardTitle>
							<CardDescription>
								共 94 个错误， 817 个警告。
							</CardDescription>
						</CardHeader>
						<CardContent>
							<RecentSales />
						</CardContent>
					</Card>
				</div>
			</TabsContent>
		</Tabs>
	</div>);
}
