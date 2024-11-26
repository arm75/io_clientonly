// import TokenBlue1 from "../tokens/bonusCookies/full/blue/tokenBlue1"
// import TokenBlue10 from "../tokens/bonusCookies/full/blue/tokenBlue10"
// import TokenBlue3 from "../tokens/bonusCookies/full/blue/tokenBlue3"
// import TokenBlue5 from "../tokens/bonusCookies/full/blue/tokenBlue5"
// import TokenBlueArrow from "../tokens/bonusCookies/full/blue/tokenBlueArrow"
// import TokenBlueSpinner from "../tokens/bonusCookies/full/blue/tokenBlueSpinner"
// import TokenGold1 from "../tokens/bonusCookies/full/gold/tokenGold1"
// import TokenGold10 from "../tokens/bonusCookies/full/gold/tokenGold10"
// import TokenGold3 from "../tokens/bonusCookies/full/gold/tokenGold3"
// import TokenGold5 from "../tokens/bonusCookies/full/gold/tokenGold5"
// import TokenGoldArrow from "../tokens/bonusCookies/full/gold/tokenGoldArrow"
// import TokenGoldSpinner from "../tokens/bonusCookies/full/gold/tokenGoldSpinner"
// import TokenRed1 from "../tokens/bonusCookies/full/red/tokenRed1"
// import TokenRed10 from "../tokens/bonusCookies/full/red/tokenRed10"
// import TokenRed3 from "../tokens/bonusCookies/full/red/tokenRed3"
// import TokenRed5 from "../tokens/bonusCookies/full/red/tokenRed5"
// import TokenRedArrow from "../tokens/bonusCookies/full/red/tokenRedArrow"
// import TokenRedSpinner from "../tokens/bonusCookies/full/red/tokenRedSpinner"

// type BonusCookieToRenderProps = {
// 	color: string
// 	cookie: string
// }

// const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

// export default function BonusCookieToRender({ color, cookie }: BonusCookieToRenderProps) {
// 	//if (RENDER_LOG === "true") console.log("<BonusCookieToRender> rendered...")

// 	let returnElement = <></>

// 	switch (color) {
// 		case "gold":
// 			switch (cookie) {
// 				case "arrow":
// 					returnElement = <TokenGoldArrow />
// 					break
// 				case "spinner":
// 					returnElement = <TokenGoldSpinner />
// 					break
// 				case "ten":
// 					returnElement = <TokenGold10 />
// 					break
// 				case "five":
// 					returnElement = <TokenGold5 />
// 					break
// 				case "three":
// 					returnElement = <TokenGold3 />
// 					break
// 				case "one":
// 					returnElement = <TokenGold1 />
// 					break
// 				default:
// 					returnElement = <></>
// 			}
// 			break
// 		case "red":
// 			switch (cookie) {
// 				case "arrow":
// 					returnElement = <TokenRedArrow />
// 					break
// 				case "spinner":
// 					returnElement = <TokenRedSpinner />
// 					break
// 				case "ten":
// 					returnElement = <TokenRed10 />
// 					break
// 				case "five":
// 					returnElement = <TokenRed5 />
// 					break
// 				case "three":
// 					returnElement = <TokenRed3 />
// 					break
// 				case "one":
// 					returnElement = <TokenRed1 />
// 					break
// 				default:
// 					returnElement = <></>
// 			}
// 			break
// 		case "blue":
// 			switch (cookie) {
// 				case "arrow":
// 					returnElement = <TokenBlueArrow />
// 					break
// 				case "spinner":
// 					returnElement = <TokenBlueSpinner />
// 					break
// 				case "ten":
// 					returnElement = <TokenBlue10 />
// 					break
// 				case "five":
// 					returnElement = <TokenBlue5 />
// 					break
// 				case "three":
// 					returnElement = <TokenBlue3 />
// 					break
// 				case "one":
// 					returnElement = <TokenBlue1 />
// 					break
// 				default:
// 					returnElement = <></>
// 			}
// 			break
// 	}
// 	return returnElement
// }
