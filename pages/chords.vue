<template>
	<main>
		<Head>
			<Title>Simple Chord Progression | Sound Utility</Title>
		</Head>
		<p id="wordmark">
			<Wordmark/>
		</p>
		<section id=info>
			<h1>Simple Progression</h1>
			<p>
				Build a simple progression of simple chords. The three rows represent
				the top three strings of the guitar (G-B-E).
			</p>
		</section>
		<ChordProgressionBuilder
			:tonic="key"     :set-tonic="setTonic"
			:scale="scale"   :set-scale="setScale"
			:chords="chords" :set-chords="setChords"
		/>
	</main>
</template>

<script setup lang="ts">
	import { MAJOR, Key, Scale, Chord, Inversion } from '@/scripts/music-theory'
	import * as convert from '@/scripts/conversions'

	const key = ref<Key>(Key.G)
	const scale = ref<Scale>(MAJOR)
	const chords = ref<Chord[]>([{
		notes: [undefined, undefined, undefined],
		inversion: Inversion.ROOT,
	}])

	
	const setTonic = (e: HTMLInputElement) => {
		const newKey = Number.parseInt(e.value) as Key
		key.value = newKey
	}

	const setScale = (e: HTMLInputElement) => {
		const newScale = e.value.split(',')
			.map(i => Number.parseInt(i)) as Scale

		scale.value = newScale
	}
	
	const setChords = (newChords: Chord[]) => {
		chords.value = newChords
	}
</script>

<style scoped>
	#wordmark
	{
		font-size: 3.5rem;
		margin: 0px 20px;
	}

	#info
	{
		max-width: 65ch;
		margin: 60px 40px 20px;
	}
</style>
