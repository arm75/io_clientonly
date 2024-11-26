// import { useQueryClient } from '@tanstack/react-query';
// import IUser from '../../../models/interfaces/user';

export default function HomeLayoutSidebar(props: any) {
	// const {children, pageTitle} = props

	// const queryClient = useQueryClient()

	// const authMeQueryData:IUser|undefined = queryClient.getQueryData("auth-me")

	return (
		<>
			{/* <!-- Logo Section --> */}
			<div className="pt-4 pl-2 mb-8">
				<a
					href="/"
					className="flex title-font font-medium items-center text-gray-100 mb-4 md:mb-0"
				>
					{/* <!-- LOGO SVG GOES INSIDE SPAN --> */}
					{/* <span className="w-12 h-12 mr-2 pt-1 bg-violet-700 relative rounded-full"></span> */}

					{/* <!-- Theme Title --> */}
					<img
						width="150"
						src="/images/io-logo.jpg"
					/>
					{/* <span className="text-3xl">
						<span className="text-emerald-400">InWord</span>OutWord
					</span> */}
				</a>
			</div>

			{/* <!-- "NAVIGATION" Label --> */}
			<div className="text-gray-500 self-center uppercase mb-4 flex justify-center">Navigation</div>
			<div>
				<a
					className="text-emerald-600 text-2xl hover:text-white"
					href="/"
				>
					Games
				</a>
			</div>
			<div>
				<a
					className="text-emerald-600 text-2xl hover:text-white"
					href="/admin/users"
				>
					Users
				</a>
			</div>
			<div>
				<a
					className="text-emerald-600 text-2xl hover:text-white"
					href="/game/play"
				>
					Play
				</a>
			</div>
		</>
	)
}
