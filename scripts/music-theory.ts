export type Chord =
{
	notes: [number | undefined, number | undefined, number | undefined],
	inversion: Inversion,
}

export enum Inversion
{
	ROOT,
	FIRST,
	SECOND,
}

export enum Key
{
	A, A_SHARP, A_FLAT,
	B, B_FLAT,
	C, C_SHARP,
	D, D_SHARP, D_FLAT,
	E, E_FLAT,
	F, F_SHARP,
	G, G_SHARP, G_FLAT,
}

/**
 * Interval from the root note.
 */
export type ScaleDegree = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

/**
 * 7 numbers, between 0 and 11 (inclusive). Defines the notes in the octave
 * that are within the scale. Expects 0 to be the root.
 */
export type Scale =
[
	ScaleDegree,
	ScaleDegree,
	ScaleDegree,
	ScaleDegree,
	ScaleDegree,
	ScaleDegree,
	ScaleDegree,
]

export const MAJOR: Scale = [0, 2, 4, 5, 7, 9, 11]
export const MINOR: Scale = [0, 2, 3, 5, 7, 8, 10]
export const SURFY: Scale = [0, 1, 4, 5, 7, 8, 11]

export enum Relation
{
	UNISON,
	MINOR_SECOND,
	MAJOR_SECOND,
	MINOR_THIRD,
	MAJOR_THIRD,
	PERFECT_FOURTH,
	TRITONE,
	PERFECT_FIFTH,
	MINOR_SIXTH,
	MAJOR_SIXTH,
	MINOR_SEVENTH,
	MAJOR_SEVENTH,
	OCTAVE,
	MINOR_NINTH,
	NINTH,
	MAJOR_NINTH,
	FLAT_ELEVENTH,
	ELEVENTH,
	SHARP_ELEVENTH,
	TWELFTH,
	FLAT_THIRTEENTH,
	THIRTEENTH,
	SHARP_THIRTEENTH,
	FLAT_FIFTEENTH,
	FIFTEENTH,
}

export function isRoot(note: number): boolean
{
	return (note % 12) == 0
}

export function isInScale(scale: Scale, note: number): boolean
{
	const degree = toScaleDegree(note)
	return scale.includes(degree)
}

export function toScaleDegree(note: number): ScaleDegree
{
	return (note % 12) as ScaleDegree
}

export function relation(root: number, note: number): Relation
{
	if (note < root)
	{
		note += 12
	}

	// semitones apart
	const distance = note - root
	
	switch (distance)
	{
		case  0: return Relation.UNISON
		case  1: return Relation.MINOR_SECOND
		case  2: return Relation.MAJOR_SECOND
		case  3: return Relation.MINOR_THIRD
		case  4: return Relation.MAJOR_THIRD
		case  5: return Relation.PERFECT_FOURTH
		case  6: return Relation.TRITONE
		case  7: return Relation.PERFECT_FIFTH
		case  8: return Relation.MINOR_SIXTH
		case  9: return Relation.MAJOR_SIXTH
		case 10: return Relation.MINOR_SEVENTH
		case 11: return Relation.MAJOR_SEVENTH
		case 12: return Relation.OCTAVE
		case 13: return Relation.MINOR_NINTH
		case 14: return Relation.NINTH
		case 15: return Relation.MAJOR_NINTH
		case 16: return Relation.FLAT_ELEVENTH
		case 17: return Relation.ELEVENTH
		case 18: return Relation.SHARP_ELEVENTH
		case 19: return Relation.TWELFTH
		case 20: return Relation.FLAT_THIRTEENTH
		case 21: return Relation.THIRTEENTH
		case 22: return Relation.SHARP_THIRTEENTH
		case 23: return Relation.FLAT_FIFTEENTH
		case 24: return Relation.FIFTEENTH
		// unknown, treat as nothing
		default: return Relation.UNISON
	}
}

export function shortHand(relation: Relation): string
{
	switch (relation)
	{
		case Relation.UNISON:           return '0'
		case Relation.MINOR_SECOND:     return '♭2'
		case Relation.MAJOR_SECOND:     return 's2'
		case Relation.MINOR_THIRD:      return 'm'
		case Relation.MAJOR_THIRD:      return 'M'
		case Relation.PERFECT_FOURTH:   return 's4'
		case Relation.TRITONE:          return 'ᵒ'
		case Relation.PERFECT_FIFTH:    return '5'
		case Relation.MINOR_SIXTH:      return '+'
		case Relation.MAJOR_SIXTH:      return '6'
		case Relation.MINOR_SEVENTH:    return 'm7'
		case Relation.MAJOR_SEVENTH:    return '7'
		case Relation.OCTAVE:           return '8'
		case Relation.MINOR_NINTH:      return '♭9'
		case Relation.NINTH:            return '9'
		case Relation.MAJOR_NINTH:      return '♯9'
		case Relation.FLAT_ELEVENTH:    return '♭11'
		case Relation.ELEVENTH:         return '11'
		case Relation.SHARP_ELEVENTH:   return '♯11'
		case Relation.TWELFTH:          return '12'
		case Relation.FLAT_THIRTEENTH:  return '♭13'
		case Relation.THIRTEENTH:       return '13'
		case Relation.SHARP_THIRTEENTH: return '♯13'
		case Relation.FLAT_FIFTEENTH:   return '♭15'
		case Relation.FIFTEENTH:        return '15'
	}
}

export function chordNumber(baseNote: number, scale: Scale): number
{
	const degree = toScaleDegree(baseNote)
	const chordNum = scale.indexOf(degree)

	return (chordNum >= 0)
		? chordNum + 1
		: chordNumber(baseNote + 1, scale)
}

export function toRomanNumeral(num: number): string
{
	switch (num)
	{
		case 1: return 'i'
		case 2: return 'ii'
		case 3: return 'iii'
		case 4: return 'iv'
		case 5: return 'v'
		case 6: return 'vi'
		case 7: return 'vii'
		default: return ''
	}
}

export function chordNumberIsMajor(chordNum: number, scale: Scale): boolean
{
	const baseNote = scale[chordNum - 1]

	if (baseNote == undefined)
	{
		return false
	}

	return isInScale(scale, baseNote + 4)
}

export function nameChord(chord: Chord, scale: Scale): string
{
	return 'Im7(add9)'
}

export function inversionToText(inversion: Inversion): string
{
	switch (inversion)
	{
		case Inversion.FIRST: return '1'
		case Inversion.SECOND: return '2'
		default: return ''
	}
}
