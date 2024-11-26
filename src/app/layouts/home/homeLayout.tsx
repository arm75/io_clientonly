import HomeLayoutHeader from "./homeLayoutHeader"
import HomeLayoutSidebar from "./homeLayoutSidebar"

export default function HomeLayout(props: any) {
	const { children } = props
	//console.log(import.meta.env.VITE_APP_API_KEY)
	//console.log(import.meta.env.VITE_APP_BASE_URL)
	return (
		<>
			<div className="min-h-screen grid grid-cols-12">
				<div className="bg-slate-700 col-span-2 p-8 h-screen overflow-auto">
					<HomeLayoutSidebar />
				</div>
				<div className="bg-slate-100 col-span-10 h-screen overflow-auto pt-0 px-8">
					<HomeLayoutHeader />
					{children}
				</div>
			</div>
		</>
	)
}
