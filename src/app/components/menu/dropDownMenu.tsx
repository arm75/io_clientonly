import { LifeBuoy, LogOut, Settings, Shield, User } from 'lucide-react'
import { Button } from '../shadcn/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '../shadcn/ui/dropdown-menu'
import AvatarDemo from '../custom/avatar'
import { useAuthMe } from '../../auth/useAuthMe'
import { useAtom } from 'jotai'
import useAxios from '../../api/axios'
import { AxiosResponse } from 'axios'
import { showAdminGameControlsAtom, showAdminBlockNamesAtom, showGameTipsAtom } from '../../../features/play/state/atoms/oldAtoms'

export default function DropDownMenu({
    menuTitleColorTw = 'red-500', // like 'red-300', or 'amber-500', defaults to red so i know if its set
    menuTitleHoverColorTw = 'red-700', // like 'red-300', or 'amber-500', defaults to red so i know if its set
}: {
    menuTitleColorTw: string
    menuTitleHoverColorTw: string
}) {
    let content = <></>

    const authMeQueryData = useAuthMe()
    const api = useAxios()

    const [showAdminGameControls, setShowAdminGameControls] = useAtom(showAdminGameControlsAtom)
    const [showAdminBlockNames, setShowAdminBlockNames] = useAtom(showAdminBlockNamesAtom)
    const [showGameTips, setShowGameTips] = useAtom(showGameTipsAtom)

    function toggleShowAdminGameControls() {
        setShowAdminGameControls(!showAdminGameControls)
    }

    function toggleShowAdminBlockNames() {
        setShowAdminBlockNames(!showAdminBlockNames)
    }

    function toggleShowGameTips() {
        setShowGameTips(!showGameTips)
    }

    function logout() {
        api.get('/auth/logout', { withCredentials: true }).then(
            (res: AxiosResponse) => {
                if (res.data === 'success') {
                    window.location.href = '/'
                }
            },
            () => {
                console.log('Failure')
            }
        )
    }

    //if (authMeQueryData?.data) {
    content = (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="link"
                    className={`no-underline focus:hidden hover:no-underline text-lg text-${menuTitleColorTw} hover:text-${menuTitleHoverColorTw}`}
                >
                    <AvatarDemo />
                    <span className={`text-lg text-${menuTitleColorTw} hover:text-${menuTitleHoverColorTw} ml-3 mb-2`}>
                        {/* <span className={`text-lg text-red-500 ml-3 mb-2`}> */}
                        {authMeQueryData?.data?.username ? authMeQueryData?.data?.username : 'user'}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-8">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleShowAdminGameControls} className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleShowAdminBlockNames} className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Show Block Names</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleShowGameTips} className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Show Game Tips</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
    // } else {
    // 	content = <></>
    // }
    return content
}
