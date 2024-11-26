export default function pause(milliseconds: number) {
	const start = new Date().getTime()
	// eslint-disable-next-line no-constant-condition
	while (true) {
		if (new Date().getTime() - start > milliseconds) {
			break
		}
	}
}
