export class HighResolutionTimer {
    
	private totalTicks = 0
	private timer: NodeJS.Timer | undefined
	private startTime: number | undefined
	private currentTime: number | undefined
	private realTick = true

	constructor(public duration: number, public callback: (timer: HighResolutionTimer) => void) {}

	public run() {
		this.currentTime = Date.now()

		if (this.startTime == undefined) {
			this.startTime = this.currentTime
		}

		if (this.realTick) {
			this.callback(this)
		}

		this.realTick = !this.realTick

		const nextTick = (this.duration / 2) -
			(this.currentTime - (this.startTime + (this.totalTicks * (this.duration / 2))))
		this.totalTicks++

		this.timer = setTimeout(() => { this.run() }, nextTick)
	}

	public stop() {
		if (this.timer !== undefined) {
			clearTimeout(this.timer)
			this.timer = undefined
		}
	}

	public set(duration: number) {
		if (duration != this.duration) {
			this.stop()
			this.startTime = undefined
			this.currentTime = undefined
			this.totalTicks = 0
			this.duration = duration
		}
	}
}