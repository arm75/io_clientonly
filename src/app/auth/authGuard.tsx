import { Navigate, useLocation } from "react-router-dom"
import { useAuthMe } from "./useAuthMe"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function AuthGuard({ children }: { children: JSX.Element }) {
	if (RENDER_LOG === "true") console.log("<AuthGuard> rendered...")

	let content = <>{children}</>

	const location = useLocation()

	const authMeQueryData = useAuthMe()

	if (authMeQueryData?.data === "") {
		content = (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		)
	}

	return content
}
