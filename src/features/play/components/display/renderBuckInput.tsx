import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import './keyboardStyles.css'

type RenderBuckInputProps = {
    buckTile: string
    //setUsingBuck: (value: boolean) => void
    addToPickupQueue: (_id: string, letter: string) => void
}

const RenderBuckInput = ({ buckTile, addToPickupQueue }: RenderBuckInputProps) => {
    const onKeyPress = (keyPressed: string) => {
        console.log(`event: ${keyPressed}`)
        addToPickupQueue(buckTile, keyPressed)
        //setUsingBuck(false)
    }

    return (
        <div className={'text-slate-900 bg-slate-900 w-[600px]'}>
            <Keyboard
                onKeyPress={onKeyPress}
                layout={{
                    default: ['Q W E R T Y U I O P', 'A S D G H J K L', 'Z X C V B N M'],
                }}
                theme={'hg-theme-default myCustomKeyboardTheme'}
            />
        </div>
    )
}

export default RenderBuckInput
