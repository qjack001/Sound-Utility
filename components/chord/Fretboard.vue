<template>
	<div class="fretboard">
		<section>
			<input type="radio" name="inversion" class="select-inversion"
				id="first-inversion"
				value="first-inversion"
				:checked="inversion == Inversion.FIRST"
				@change="selectInversion(Inversion.FIRST)"
			/>
			<label 
				for="first-inversion"
				class="select-inversion"
			>
				1st
			</label>
			<ChordFretboardRow name="e-string"
				:scale="scale"
				:length="length"
				:isBase="inversion == Inversion.FIRST"
				:root-note="rootNote().value?.note"
				:root-index="rootNote().value?.index"

				:selected="top?.note"
				:onChange="(selection) => { top = selection; emitChord() }"

				:offset="offset.top + baseOffset"
				:below="middle?.index"
			/>
		</section>
		<section>
			<input type="radio" name="inversion" class="select-inversion"
				id="second-inversion"
				value="second-inversion"
				:checked="inversion == Inversion.SECOND"
				@change="selectInversion(Inversion.SECOND)"
			/>
			<label 
				for="second-inversion"
				class="select-inversion"
			>
				2nd
			</label>
			<ChordFretboardRow name="b-string"
				:scale="scale"
				:length="length"
				:isBase="inversion == Inversion.SECOND"
				:root-note="rootNote().value?.note"
				:root-index="rootNote().value?.index"

				:selected="middle?.note"
				:onChange="(selection) => { middle = selection; emitChord() }"

				:offset="offset.middle + baseOffset"
				:above="top?.index"
				:below="bottom?.index"
			/>
		</section>
		<section>
			<input type="radio" name="inversion" class="select-inversion"
				id="root-inversion"
				value="root-inversion"
				:checked="inversion == Inversion.ROOT"
				@change="selectInversion(Inversion.ROOT)"
			/>
			<label 
				for="root-inversion"
				class="select-inversion"
			>
				Root
			</label>
			<ChordFretboardRow name="g-string"
				:scale="scale"
				:length="length"
				:isBase="inversion == Inversion.ROOT"
				:root-note="rootNote().value?.note"
				:root-index="rootNote().value?.index"

				:selected="bottom?.note"
				:onChange="(selection) => { bottom = selection; emitChord() }"

				:offset="offset.bottom + baseOffset"
				:above="middle?.index"
			/>
		</section>
		<section>
			<div v-for="fret in length" :key="fret" class="fret-marker">
				{{fret - 1}}
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	import { Inversion, Scale, Chord } from '@/scripts/music-theory'
	import { Choice } from './FretboardRow.vue';

	const props = withDefaults(defineProps<{
		scale: Scale,
		length: number,
		baseOffset?: number,
		chord?: Chord,
		onChange: (selection: Chord) => void
	}>(), {
		baseOffset: 0
	})

	const offset = {
		bottom: 0,
		middle: 4,
		top: (4 + 5),
	}

	const rootNote = () => {
		switch (inversion.value) {
			case Inversion.ROOT: return bottom
			case Inversion.FIRST: return top
			case Inversion.SECOND: return middle
		}
	}

	const selectInversion = (selection: Inversion) => {
		inversion.value = selection
		emitChord()
	}

	const emitChord = () => {
		props.onChange({
			notes: [bottom.value?.note, middle.value?.note, top.value?.note],
			inversion: inversion.value,
		})
	}

	const convertToChoice = (note: number | undefined, offset: number) => {
		if (note == undefined) {
			return undefined
		}

		return {
			note: note,
			index: note - offset
		}
	}

	const inversion = ref<Inversion>(props.chord?.inversion ?? Inversion.ROOT)
	const top = ref<Choice | undefined>(convertToChoice(props.chord?.notes[2], offset.top + props.baseOffset))
	const middle = ref<Choice | undefined>(convertToChoice(props.chord?.notes[1], offset.middle + props.baseOffset))
	const bottom = ref<Choice | undefined>(convertToChoice(props.chord?.notes[0], offset.bottom + props.baseOffset))
</script>

<style scoped>
	.fretboard
	{
		--fret-size: 50px;

		width: calc(100% - 80px);
		max-width: calc(25 * var(--fret-size));
		height: calc(3.5 * var(--fret-size));
		position: relative;

		overflow-x: scroll;
		overflow-y: hidden;

		border: 1px solid var(--foreground);
		background: var(--foreground);

		margin: 10px 40px;
		padding-left: calc(var(--fret-size) / 2);
	}

	section
	{
		width: calc(25 * var(--fret-size));
		height: var(--fret-size);
	}

	input.select-inversion
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
		input.select-inversion { display: none; } 
	}

	label.select-inversion
	{
		width: calc(var(--fret-size) / 2);
		height: var(--fret-size);

		display: inline-block;
		position: absolute;
		margin: 0;
		padding: 0;
		z-index: 99;
		background: var(--background);
		border: 1px solid var(--foreground);
		box-shadow: -1px 0 0 0 var(--foreground);
		box-sizing: border-box;
		cursor: pointer;
		user-select: none;

		writing-mode: vertical-rl;
		text-orientation: mixed;
		transform: rotate(180deg) translateX(calc(var(--fret-size) / 2));

		color: var(--accent);
		font-size: 1rem;
		letter-spacing: 0em;
		line-height: calc(var(--fret-size) / 2);
		text-align: center;
		text-transform: uppercase;
	}

	input.select-inversion:checked + label.select-inversion
	{
		background: var(--accent);
		color: var(--background);
	}

	.fret-marker
	{
		display: inline-block;
		width: var(--fret-size);
		height: calc(var(--fret-size) / 2);

		background: var(--background);
		border: 1px solid var(--foreground);
		box-sizing: border-box;

		color: var(--accent);
		font-size: 1rem;
		line-height: calc(var(--fret-size) / 2);
		text-align: center;
		user-select: none;
	}

	.fretboard::before
	{
		content: "";
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 99;
		width: calc(var(--fret-size) / 2);
		height: calc(var(--fret-size) / 2);

		background: radial-gradient(var(--background) 65%, var(--foreground) 70%);
	}
</style>