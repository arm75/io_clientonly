#!/bin/bash

# Loop through the English alphabet
for letter in {A..Z}; do
# Create a .tsx file with the desired name
touch "LetterTile${letter}.tsx"
# Use a here document to write a block of text to the file
cat <<EOF > "LetterTile${letter}.tsx"
export default function LeterTile${letter}() {
	return (
		<div className="select-none text-slate-700 hover:text-red-600 text-3xl font-bold bg-slate-200 border border-slate-800 hover:border-yellow-500 flex justify-center items-center w-[42px] h-[42px]">
			${letter}
		</div>
	)
}

EOF
done
