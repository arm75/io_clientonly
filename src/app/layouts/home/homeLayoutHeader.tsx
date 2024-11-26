import DropDownMenu from '../../components/menu/dropDownMenu'

export default function HomeLayoutHeader(props: any) {
    // const {children, pageTitle} = props
    //const api = useAxios()

    //const queryClient = useQueryClient()

    //const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

    // const logout = () => {
    // 	api.get("/auth/logout", { withCredentials: true }).then(
    // 		(res: AxiosResponse) => {
    // 			if (res.data === "success") {
    // 				window.location.href = "/"
    // 			}
    // 		},
    // 		() => {
    // 			console.log("Failure")
    // 		}
    // 	)
    // }

    return (
        <>
            <header className="sticky top-0 z-10 -mx-8 mb-8">
                <div className="flex flex-row-reverse bg-white border-b border-gray-200 w-full py-5 px-4">
                    {/* ACCOUNT DropDown Menu */}
                    <DropDownMenu menuTitleColorTw={'sky-500'} menuTitleHoverColorTw={'amber-500'} />

                    {/* <!-- Vertical Divider --> */}
                    {/* <div className="flex flex-col justify-center">
						<div className="h-6 mx-4 border-l border-gray-200"></div>
					</div> */}
                    {/* <!-- Optional: Text Links --> */}
                    {/* <nav className="py-1 pt-2 text-sm"> */}
                    {/* 	<a className="mx-1 py-1 px-3 text-slate-600 font-light hover:py-1 hover:px-3 hover:rounded-full hover:bg-violet-700 hover:text-white">
							First Link
						</a>
						<a className="mx-1 py-1 px-3 text-slate-600 font-light hover:py-1 hover:px-3 hover:rounded-full hover:bg-violet-700 hover:text-white">
							Second Link
						</a>*/}
                    {/* <button
							onClick={logout}
							className="mx-1 py-1 px-3 text-slate-600 font-light hover:py-1 hover:px-3 hover:rounded-full hover:bg-emerald-500 hover:text-white"
						>
							Logout
						</button> */}
                    {/* </nav> */}
                    {/* <!-- Vertical Divider --> */}
                    {/* <div className="flex flex-col justify-center">
						<div className="h-6 mx-4 border-l border-gray-200"></div>
					</div> */}
                    {/* <!-- Icon Menu --> */}
                    {/* <span className="mx-1 inline-flex items-center justify-center w-10 h-10 bg-slate-100 relative hover:bg-violet-700 rounded-full">
						<svg
							className="w-6 h-6 text-slate-500 hover:text-white"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="-2 -2 24 24"
							fill="currentColor"
						>
							<path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"></path>
						</svg>
					</span>
					<span className="mx-1 inline-flex items-center justify-center w-10 h-10 bg-slate-100 relative hover:bg-violet-700 rounded-full">
						<svg
							className="w-6 h-6 text-slate-500 hover:text-white"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="-2 -2 24 24"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
								clipRule="evenodd"
							></path>
						</svg>
					</span>
					<span className="mx-1 inline-flex items-center justify-center w-10 h-10 bg-slate-100 relative hover:bg-violet-700 rounded-full">
						<svg
							className="w-6 h-6 text-slate-500 hover:text-white"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="-3 -3 26 26"
							fill="currentColor"
						>
							<path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z"></path>
							<path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z"></path>
						</svg> */}
                    {/* <!-- Green Badge Icon --> */}
                    {/* <div className="absolute inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-white bg-emerald-500 border-2 border-white rounded-full -top-0.5 -right-0.5 dark:border-white"></div> */}
                    {/* <!-- Yellow Badge Icon --> */}
                    {/* <!-- <div className="absolute inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-white bg-yellow-500 border-2 border-white rounded-full -top-0.5 -right-0.5 dark:border-white"></div> --> */}
                    {/* <!-- Red Badge Icon --> */}
                    {/* <!-- <div className="absolute inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0.5 -right-0.5 dark:border-white"></div> --> */}
                    {/* </span>
					<span className="mx-1 inline-flex items-center justify-center w-10 h-10 bg-slate-100 relative hover:bg-violet-700 rounded-full">
						<svg
							className="w-6 h-6 text-slate-500 hover:text-white"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="-3 -3 26 26"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
								clipRule="evenodd"
							></path>
						</svg>
					</span> */}
                </div>
            </header>
        </>
    )
}
