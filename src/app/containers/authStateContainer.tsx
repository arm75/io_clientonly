import { useAuthMe } from "../auth/useAuthMe"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function AuthStateContainer({ children }: any) {
	if (RENDER_LOG === "true") console.log("<AuthStateContainer> rendered...")

	const content = <>{children}</>

	useAuthMe()

	return content
}
