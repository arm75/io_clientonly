// Define the possible types for command data
export type SocketIoCommandData = string | number | object | unknown[]

// Define the SocketIoCommand type as an object with string keys and any of the allowed values as the value type
export type SocketIoCommand = Record<string, SocketIoCommandData>
