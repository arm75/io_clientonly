import axios from "axios"

const useAxios = (baseURL: string = import.meta.env.VITE_APP_BASE_URL) => {
	const axiosInstance = axios.create({
		baseURL,
		withCredentials: true,
	})

	//const authMeQueryData = useAuthMe()

	// axiosInstance.interceptors.request.use(
	// 	(config) => {
	// 		console.log({ config })

	// 		// const isGameInProgress = authMeQueryData?.data?.inGame
	// 		// const isOnGamePlayPage = window.location.pathname === "/game/play"

	// 		// if (isGameInProgress && !isOnGamePlayPage) {
	// 		// 	window.location.href = "/game/play"
	// 		// }

	// 		return config
	// 	},
	// 	(error) => {
	// 		return Promise.reject(error)
	// 	}
	// )

	return axiosInstance
}

export default useAxios
