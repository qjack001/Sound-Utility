<template>
	<template v-for="index in length" :key="index">
		<input
			type="radio"
			class="fret"
			:name="`fretboard-row-${name}`"
			:value="index - 1"
			:id="`fretboard-row-${name}-${index}`"
			:aria-label="`${name}, fret ${index}`" 
			:checked="(index - 1 + offset) == selected"
			@change="select(index - 1)"
		/>
		<label 
			:for="`fretboard-row-${name}-${index}`"
			:class="{
				'root': (isBase && isRoot(index - 1 + offset)),
				'in-key': isInScale(scale, (index - 1 + offset)),
				'out-of-reach': isOutOfReach(index - 1),
				'adjust-spacing': needsAdjustment(index - 1 + offset),
				'above': (above == index - 1),
				'below': (below == index - 1),
			}"
		>
		{{
			nameNote(index - 1 + offset)
		}}
		</label>
	</template>
</template>

<script setup lang="ts">
	import { Scale, Relation, isInScale, isRoot, chordNumber, toRomanNumeral, chordNumberIsMajor, relation, shortHand } from '@/scripts/music-theory'

	export type Choice = { note: number, index: number }

	const props = withDefaults(defineProps<{
		name: string,
		scale: Scale,
		length?: number,
		isBase: boolean,
		offset?: number,
		above?: number,
		below?: number,
		selected?: number,
		onChange: (selection: Choice) => void,
		rootNote?: number,
		rootIndex?: number,
	}>(), {
		offset: 0,
		length: 25,
	})

	const selected = ref<number | undefined>(props.selected)

	const select = (index: number) => {
		selected.value = index + props.offset
		props.onChange({
			note: index + props.offset,
			index: index
		})
	}

	const nameNote = (note: number) => {
		if (props.isBase) {
			return rootName(note)
		}
		else if (props.rootNote == undefined) {
			return '\u00A0' // non-breaking space
		}

		return shortHand(relation(props.rootNote, note))
	}

	const rootName = (note: number) => {
		if (!isInScale(props.scale, note)) {
			return '\u00A0' // non-breaking space
		}

		const chordNum = chordNumber(note, props.scale)
		const romanNumeral = toRomanNumeral(chordNum)

		return (chordNumberIsMajor(chordNum, props.scale))
			? romanNumeral.toUpperCase()
			: romanNumeral
	}

	const isOutOfReach = (fret: number) => {
		if (props.isBase || props.rootIndex == undefined) {
			return false
		}

		return (fret < props.rootIndex - 2) || (fret > props.rootIndex + 3)
	}

	const needsAdjustment = (note: number) => {
		if (props.rootNote == undefined || props.isBase) {
			return false
		}

		const interval = relation(props.rootNote, note)

		return (
			interval == Relation.MAJOR_SECOND ||
			interval == Relation.PERFECT_FOURTH ||
			interval == Relation.MINOR_SEVENTH
		)
	}
</script>

<style scoped>

	input.fret
	{
		display: inline-block;
		margin: 0;
		padding: 0;
		border: none;
		width: 0;
		height: 0;
		opacity: 0;
		-moz-appearance: none;
	}

	@supports (-moz-appearance: none) 
	{
		input.fret { display: none; } 
	}

	label
	{
		--default-fret-size: 50px;
		--text-adjust: 6px;

		width: var(--fret-size, var(--default-fret-size));
		height: var(--fret-size, var(--default-fret-size));

		display: inline-block;
		position: relative;
		margin: 0;
		padding: 0;
		background: var(--background);
		border: 1px solid var(--foreground);
		box-sizing: border-box;
		cursor: pointer;
		user-select: none;

		color: var(--foreground);
		font-size: 1.8rem;
		letter-spacing: -0.2em;
		line-height: var(--fret-size, var(--default-fret-size));
		text-align: center;
		padding-inline-end: var(--text-adjust);
	}

	label.adjust-spacing
	{
		--text-adjust: 1px;
		letter-spacing: -0.05em;
	}
	
	label.in-key
	{
		color: var(--accent);
	}

	label.out-of-reach
	{
		color: transparent;
	}

	label.root
	{
		background: var(--accent);
		color: var(--background);
	}

	input.fret:checked + label
	{
		color: var(--background);
		background: var(--foreground);
	}

	input.fret:checked + label.above
	{
		border-top: 1px solid var(--background);
	}

	input.fret:checked + label.below
	{
		border-bottom: 1px solid var(--background);
	}
</style>