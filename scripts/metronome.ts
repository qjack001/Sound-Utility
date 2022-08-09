export class Metronome {
	private audioContext: AudioContext

	private tempo: number
	private barLength: number

	private nextNoteTime: number
	private isRunning: boolean
	private intervalID: NodeJS.Timer | undefined

	private currentQuarterNote: number

	private readonly lookahead = 25
	private readonly scheduleAheadTime = 0.1

	public constructor(audioContext: AudioContext, tempo: number, beats: number) {
		this.audioContext = audioContext

		this.tempo = tempo
		this.barLength = beats
		
		this.nextNoteTime = 0.0
		this.isRunning = false
		this.intervalID = undefined
		this.currentQuarterNote = 0
	}

	public set(tempo: number, beats: number) {
		this.tempo = tempo
		this.barLength = beats

		this.nextNoteTime = 0.0
		this.isRunning = false
		this.intervalID = undefined
		this.currentQuarterNote = 0
	}

	private nextNote() {
		const secondsPerBeat = 60.0 / this.tempo
		this.nextNoteTime += secondsPerBeat
		this.currentQuarterNote = (this.currentQuarterNote + 1) % this.barLength
	}

	private scheduleNote(time: number) {
		const osc = this.audioContext.createOscillator()
		const envelope = this.audioContext.createGain()

		osc.frequency.value = (this.currentQuarterNote == 0)
			? 2000
			: 800
		
		envelope.gain.value = 1
		envelope.gain.exponentialRampToValueAtTime(1, time + 0.001)
		envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02)

		osc.connect(envelope)
		envelope.connect(this.audioContext.destination)

		osc.start(time)
		osc.stop(time + 0.03)
	}

	private scheduler() {
		while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
			this.scheduleNote(this.nextNoteTime)
			this.nextNote()
		}
	}

	public run() {
		if (this.isRunning) {
			return // get outta here!
		}

		this.isRunning = true
		this.currentQuarterNote = 0
		this.nextNoteTime = this.audioContext.currentTime + 0.05
		this.intervalID = setInterval(() => { this.scheduler() }, this.lookahead)
	}

	public stop() {
		this.isRunning = false
		clearInterval(this.intervalID)
	}

	public toggle() {
		if (this.isRunning) {
			this.stop()
		}
		else {
			this.run()
		}
	}
}