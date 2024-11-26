export default function addWithCeiling(a: number, b: number, max: number) {
	const sum = a + b
	const result = sum > max ? max : sum
	return result
}
