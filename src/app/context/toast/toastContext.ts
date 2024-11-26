import { createContext } from "react"

type ToastContextProps = {
	showToast: (variant: string, message: string, title?: string) => void
}

const ToastContext = createContext<ToastContextProps>({
	showToast: () => {
		return
	},
})

export default ToastContext
