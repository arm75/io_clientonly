export type User = {
	_id: string
	username: string
	password?: string
	firstname?: string
	lastname?: string
	email?: string
	age?: number
	active?: boolean
	role?: string
	inGame?: boolean
	currentGameId?: string
}
