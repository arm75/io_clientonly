import { useQuery } from "@tanstack/react-query"
import useAxios from "../api/axios"

export const useAuthMe = () => {
	const api = useAxios()

	async function getMe() {
		return await api.get("/auth/me").then((res: any) => res.data)
	}

	return useQuery(["auth-me"], getMe, { refetchOnWindowFocus: false })
}
