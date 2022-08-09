<template>
	<section id="chord-tabs">
		<ChordButton
			v-for="(chord, index) in chords"
			:id="`chord-btn-${index}`"
			:key="index"
			:chord="chord"
			:scale="scale"
			:selected="index == currentChord"
			:select="() => select(index)"
		/>
		<button 
			class="chord-action delete"
			@click="deleteChord()"
		>
			DEL
		</button>
		<button 
			class="chord-action"
			@click="addChord()"
		>
			ADD
		</button>
	</section>
	<section id="progression">
		<ChordFretboard
			:scale="scale"
			:length="25"
			:base-offset="12 - getOffset(tonic)"

			:chord="current()"
			:on-change="updateChord"
		/>
	</section>
	<section id="controls">
		<h3>Key:</h3>
		<select name="key" :value="tonic" @change="setTonic($event.target as HTMLInputElement)">
			<option v-for="option in KEYS" :key="option" :value="option">
				{{ Key[option].replaceAll('_FLAT', '♭').replaceAll('_SHARP', '♯') }}
			</option>
		</select>
		<select name="scale" :value="scale" @change="setScale($event.target as HTMLInputElement)">
			<option v-for="option in SCALES" :key="option.name" :value="option.value">
				{{ option.name }}
			</option>
		</select>
	</section>
</template>

<script setup lang="ts">
	import { Key, Scale, MAJOR, MINOR, SURFY, Chord, Inversion } from '@/scripts/music-theory'

	const props = defineProps<{
		chords: Chord[]
		tonic: Key
		scale: Scale

		setTonic: (e: HTMLInputElement) => void
		setScale: (e: HTMLInputElement) => void
		setChords: (newChords: Chord[]) => void
	}>()

	const { chords } = toRefs(props)

	const currentChord = ref<number>(0)

	const select = (index: number) => {
		currentChord.value = index
	}

	const addChord = () => {
		const lastChord: Chord = {
			notes: [ ...chords.value[currentChord.value].notes ],
			inversion: chords.value[currentChord.value].inversion,
		}
		chords.value.splice(currentChord.value, 0, reactive(lastChord))
		select(currentChord.value + 1)
		props.setChords(chords.value)
	}

	const deleteChord = () => {
		chords.value.splice(currentChord.value, 1)
		currentChord.value = Math.max(0, currentChord.value - 1)
		if (chords.value.length <= 0) {
			chords.value.push(reactive({
				notes: [ undefined, undefined, undefined ],
				inversion: Inversion.ROOT,
			}))
		}
		props.setChords(chords.value)
	}

	const updateChord = (chord: Chord) => {
		chords.value[currentChord.value] = chord
		props.setChords(chords.value)
	}

	const current = () => {
		return chords.value[currentChord.value]
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

	const KEYS = [
		Key.A_FLAT, Key.A, Key.A_SHARP, Key.B_FLAT, Key.B, Key.C, Key.C_SHARP,
		Key.D_FLAT, Key.D, Key.D_SHARP, Key.E_FLAT, Key.E, Key.F, Key.F_SHARP,
		Key.G_FLAT, Key.G, Key.G_SHARP,
	]

	const SCALES = [
		{ value: MAJOR, name: 'Major' },
		{ value: MINOR, name: 'Minor' },
		{ value: SURFY, name: 'Surfy' },
	]
</script>

<style scoped>
	#chord-tabs
	{
		margin: 40px 40px 20px;
	}

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
		user-select: none;
		cursor: pointer;
	}

	.chord-action
	{
		font-family: inherit;
		font-size: 0.9rem;
		
		cursor: pointer;
		user-select: none;
		display: inline-block;
		background: var(--white-70);
		border: none;

		padding: 0;
		border-radius: 100%;
		line-height: 34px;
		width: 36px;
		transform: translateY(-2px);
		text-align: center;

		margin-right: 1ch;
	}

	.chord-action.delete
	{
		border-radius: 0;
		clip-path: polygon(100% 0, 0 50%, 100% 100%);
		padding-left: 1.5ch;
	}

	.chord-action:hover
	{
		background: var(--accent);
		color: var(--white-70)
	}
</style>
