import { Key, Scale, MAJOR, MINOR, SURFY, Chord, Inversion } from './music-theory'

export function stringToKey(input: string | null): Key | undefined {
	const keys = Object.entries(Key)
		.filter(key => key[0] == input)
	
	if (keys.length <= 0) {
		return undefined
	}

	return keys[0][1] as Key
}

export function keyToString(key: Key): string {
	return Key[key]
}

export function stringToScale(input: string | null): Scale | undefined {
	switch (input) {
		case 'MAJOR': return MAJOR
		case 'MINOR': return MINOR
		case 'SURFY': return SURFY
		default: return undefined
	}
}

export function scaleToString(scale: Scale): string {
	if (JSON.stringify(scale) == JSON.stringify(MAJOR)) return 'MAJOR'
	if (JSON.stringify(scale) == JSON.stringify(MINOR)) return 'MINOR'
	if (JSON.stringify(scale) == JSON.stringify(SURFY)) return 'SURFY'
	return ''
}

export function stringToChords(input: string | null): Chord[] | undefined {
	if (input == null) {
		return undefined
	}

	return input.split('--')
		.map(stringToChord)
}

export function chordsToString(chords: Chord[]): string {
	return chords.map(chordToString).join('--')
}

export function stringToChord(input: string): Chord {
	const values = input.split('-')
		.map((i) => (i == '_')
			? undefined
			: Number.parseInt(i))
	
	return {
		notes: [ values[0], values[1], values[2] ],
		inversion: values[3] as Inversion,
	}
}

export function chordToString(chord: Chord): string {
	const inversion = chord.inversion as number
	const notes = chord.notes.map((note) => note != undefined
		? `${note}`
		: '_')
		.join('-')

	return `${notes}-${inversion}`
}
