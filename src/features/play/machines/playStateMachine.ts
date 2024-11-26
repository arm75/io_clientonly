// import { createMachine } from 'xstate'

// export const playStateMachine = createMachine(
//     {
//         id: 'PLAY_STATE_MACHINE',
//         initial: 'NOT_TURN',
//         states: {
//             NOT_TURN: {
//                 initial: 'IDLE',
//                 states: {
//                     IDLE: {
//                         entry: () => console.log('NOT_TURN.IDLE entry'),
//                         exit: () => console.log('NOT_TURN.IDLE exit'),
//                         on: {
//                             take_turn: {
//                                 target: '#PLAY_STATE_MACHINE.TURN',
//                                 actions: 'notTurnToTurn',
//                             },
//                         },
//                     },
//                 },
//             },
//             TURN: {
//                 initial: 'IDLE',
//                 states: {
//                     IDLE: {
//                         entry: () => console.log('TURN.IDLE entry'),
//                         exit: () => console.log('TURN.IDLE exit'),
//                         on: {
//                             play: {
//                                 target: 'PLAYING',
//                                 actions: 'turnIdleToTurnPlaying',
//                             },
//                             pass: {
//                                 target: '#PLAY_STATE_MACHINE.NOT_TURN',
//                                 //actions: 'turnIdleToChoosingStartingWord',
//                             },
//                         },
//                     },
//                     PLAYING: {
//                         initial: 'PICKING_UP_TILES',
//                         //entry: () => console.log('TURN.PLAYING entry'),
//                         entry: 'someAction',
//                         //exit: () => console.log('TURN.PLAYING exit'),
//                         exit: 'someOtherAction',
//                         //on: { },
//                         states: {
//                             PICKING_UP_TILES: {
//                                 entry: () => console.log('TURN.PLAYING.PICKING_UP_TILES entry'),
//                                 exit: () => console.log('TURN.PLAYING.PICKING_UP_TILES exit'),
//                                 on: {
//                                     pickup: {
//                                         target: 'PLAYING_TILES',
//                                         //actions: 'choosingPlayPositionToReadyToPlay',
//                                     },
//                                     use_buck: {
//                                         target: 'USING_BUCK',
//                                         //actions: 'letterTileInputToChoosingStartingWord',
//                                     },
//                                     cancel: {
//                                         target: '#PLAY_STATE_MACHINE.TURN',
//                                         // actions:
//                                     },
//                                 },
//                             },
//                             USING_BUCK: {
//                                 entry: () => console.log('TURN.PLAYING.USING_BUCK entry'),
//                                 exit: () => console.log('TURN.PLAYING.USING_BUCK exit'),
//                                 on: {
//                                     use_buck: {
//                                         target: 'PICKING_UP_TILES',
//                                         //actions: 'choosingPlayPositionToReadyToPlay',
//                                     },
//                                     cancel: {
//                                         target: 'PICKING_UP_TILES',
//                                         // actions: 'letterTileInputToChoosingStartingWord',
//                                     },
//                                 },
//                             },
//                             PLAYING_TILES: {
//                                 entry: () => console.log('TURN.PLAYING.PLAYING_TILES entry'),
//                                 exit: () => console.log('TURN.PLAYING.PLAYING_TILES exit'),
//                                 // on: {
//                                 //     drop: {
//                                 //         target: 'PICKUP_TILES',
//                                 //         //actions: "transitionTurnChoosingPlayPositionToTurnReadyToPlay",
//                                 //     },
//                                 //     play: {
//                                 //         target: 'LETTER_TILE_INPUT',
//                                 //         actions: 'buckSubInputToLetterTileInput',
//                                 //     },
//                                 // },
//                             },
//                         },
//                     },
//                     // READY_TO_PLAY: {
//                     //     on: {
//                     //         advance: {
//                     //             target: '#TURN_MACHINE.NOT_TURN',
//                     //         },
//                     //         cancel: {
//                     //             target: 'BUILDING_PLAY.LETTER_TILE_INPUT',
//                     //             actions: 'readyToPlayToLetterTileInput',
//                     //         },
//                     //         pass: {
//                     //             target: '#TURN_MACHINE.NOT_TURN',
//                     //         },
//                     //     },
//                     // },
//                 },
//             },
//         },
//         types: {
//             events: {} as
//                 | { type: 'advance' }
//                 | { type: 'pickup' }
//                 | { type: 'play' }
//                 | { type: 'take_turn' }
//                 | { type: 'use_buck' }
//                 | { type: 'buck_tile_play' }
//                 | { type: 'cancel' }
//                 | { type: 'pass' },
//         },
//     },
//     {
//         // actions: {
//         // 	// These are just empty functions, so that the actions can be defined above.
//         // 	// On the PlayPage, I replace these with the actual action functions. The
//         // 	// lint rules being disabled, is so TypeScript will shutup.
//         // 	//
//         // 	// eslint-disable-next-line @typescript-eslint/no-empty-function
//         // 	transitionToTurnIdle: () => {},
//         // 	// eslint-disable-next-line @typescript-eslint/no-empty-function
//         // 	transitionTurnIdleToTurnChoosingStartingWord: () => {},
//         // 	// eslint-disable-next-line @typescript-eslint/no-empty-function
//         // 	transitionTurnChoosingStartingWordToTurnIdle: () => {},
//         // 	// eslint-disable-next-line @typescript-eslint/no-empty-function
//         // 	transitionTurnChoosingStartingWordToTurnChoosingPlayPosition: () => {},
//         // 	// eslint-disable-next-line @typescript-eslint/no-empty-function
//         // 	transitionTurnChoosingStartingWordToTurnChoosingPlayPosition2: () => {},
//         // 	// eslint-disable-next-line @typescript-eslint/no-empty-function
//         // 	transitionTurnChoosingPlayPositionToTurnChoosingStartingWord: () => {},
//         // 	// eslint-disable-next-line @typescript-eslint/no-empty-function
//         // 	transitionTurnChoosingPlayPositionToTurnReadyToPlay: () => {},
//         // 	// eslint-disable-next-line @typescript-eslint/no-empty-function
//         // 	transitionTurnReadyToPlayToTurnChoosingPlayPosition: () => {},
//         // 	// eslint-disable-next-line @typescript-eslint/no-empty-function
//         // 	transitionToPassTurn: () => {},
//         // },
//         // actors: {},
//         // guards: {},
//         // delays: {},
//     }
// )

// export default playStateMachine
