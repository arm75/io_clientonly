type ArrayType = Array<any>
type ObjectType = Record<string, any>
type ArrayOrObject = ArrayType | ObjectType | any

function deepCopyArray(input: ArrayType): ArrayType {
	return input.map((item) => deepCopy(item)) as ArrayType
}

function deepCopyObject(input: ObjectType): ObjectType {
	const copiedObject: ObjectType = {}
	for (const key in input) {
		if (Object.prototype.hasOwnProperty.call(input, key)) {
			copiedObject[key] = deepCopy(input[key])
		}
	}
	return copiedObject
}

function deepCopy(input: ArrayOrObject): ArrayOrObject {
	const startTime = performance.now()
	let returnType = ""
	let toReturn: any = null
	if (Array.isArray(input)) {
		returnType = "ARRAY"
		toReturn = deepCopyArray(input)
	} else if (typeof input === "object" && input !== null) {
		returnType = "OBJECT"
		toReturn = deepCopyObject(input)
	} else {
		returnType = "PRIMITIVE"
		toReturn = input
	}
	const endTime = performance.now()
	console.log(`deepCopy Function for ${returnType} took ${endTime - startTime} milliseconds.`)
	return toReturn
}

export default deepCopy
