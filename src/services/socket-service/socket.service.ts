// services/MessageService.ts
import { io, Socket } from 'socket.io-client'

class SocketService {
	private socket: Socket

	constructor() {
		this.socket = io(process.env.NEST_PUBLIC_API_URL as string)
	}

	public on(event: string, callback: (data: any) => void): void {
		this.socket.on(event, callback)
	}

	public emit(event: string, data: any): void {
		this.socket.emit(event, data)
	}

	public off(event: string): void {
		this.socket.off(event)
	}
}

export default new SocketService()
