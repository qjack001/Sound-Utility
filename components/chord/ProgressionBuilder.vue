<template>
	<!-- <section>
		<ChordButton v-for="(chord, index) in chords"
			:chord="chord"
			:selected="index == currentChord"
			:select="() => select(index)"
		/>
		<button v-on:click="addChord()">ADD</button>
	</section> -->
	<section id="progression">
		<ChordFretboard
			:scale="scale"
			:length="25"
			:base-offset="12 - getOffset(key)"

			:chord="chords[currentChord]"
			:onChange="(chord) => chords[currentChord] = chord"
		/>
	</section>
	<section id="controls">
		<h3>Key:</h3>
		<select name="key" v-model="key">
			<option v-for="option in keys" :value="option" @change="key = option">
				{{ Key[option].replaceAll('_FLAT', '♭').replaceAll('_SHARP', '♯') }}
			</option>
		</select>
		<select name="scale" v-model="scale">
			<option v-for="option in scales" :value="option.value" @change="scale = option.value">
				{{ option.name }}
			</option>
		</select>
	</section>
</template>

<script setup lang="ts">
	import { MAJOR, Key, Scale, MINOR, SURFY, Chord, Inversion } from '@/scripts/music-theory'


	const chords = ref<Chord[]>([{ notes: [undefined, undefined, undefined], inversion: Inversion.ROOT }])
	const key = ref<Key>(Key.G)
	const scale = ref<Scale>(MAJOR)

	const currentChord = ref<number>(0)

	const select = (index: number) => {
		currentChord.value = index
	}

	const addChord = () => {
		const blankChord: Chord = {
			notes: [undefined, undefined, undefined],
			inversion: Inversion.ROOT
		}

		chords.value.push(blankChord)
		select(chords.value.length - 1)

		console.log(chords.value)
	}

	const getOffset = (key: Key): number => {
		switch (key) {
			case Key.G:
				return 0
			case Key.G_SHARP:
			case Key.A_FLAT:
				return 1
			case Key.A:
				return 2
			case Key.A_SHARP:
			case Key.B_FLAT:
				return 3
			case Key.B:
				return 4
			case Key.C:
				return 5
			case Key.C_SHARP:
			case Key.D_FLAT:
				return 6
			case Key.D:
				return 7
			case Key.D_SHARP:
			case Key.E_FLAT:
				return 8
			case Key.E:
				return 9
			case Key.F:
				return 10
			case Key.F_SHARP:
			case Key.G_FLAT:
				return 11
		}
	}

	const keys = [
		Key.A_FLAT, Key.A, Key.A_SHARP, Key.B_FLAT, Key.B, Key.C, Key.C_SHARP,
		Key.D_FLAT, Key.D, Key.D_SHARP, Key.E_FLAT, Key.E, Key.F, Key.F_SHARP,
		Key.G_FLAT, Key.G, Key.G_SHARP,
	]

	const scales = [
		{ value: MAJOR, name: 'Major' },
		{ value: MINOR, name: 'Minor' },
		{ value: SURFY, name: 'Surfy' },
	]
</script>

<style scoped>
	#controls
	{
		margin: 20px 40px;
	}

	#controls h3
	{
		display: inline;
		margin-right: 1ch;
	}

	#controls select
	{
		background: none;
		-webkit-appearance: none;
		appearance: none;

		color: var(--foreground);
		font-family: inherit;
		font-size: 1rem;
		text-transform: uppercase;
		text-align: center;
		line-height: 2rem;
		padding: 0 1ch;

		border: 2px solid var(--foreground);
		border-radius: 0;

		outline: none;
		cursor: pointer;
	}
</style>
