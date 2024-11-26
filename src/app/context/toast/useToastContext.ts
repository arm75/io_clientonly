import { useContext } from "react"
import ToastContext from "./toastContext"

export default function useToastContext() {
	return useContext(ToastContext)
}
