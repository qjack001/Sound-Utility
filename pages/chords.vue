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
				Build a simple progression of simple chords. The three rows repersesent
				the top three strings of the guitar (G-B-E).
			</p>
		</section>
		<ChordProgressionBuilder/>
	</main>
</template>

<script setup lang="ts">
	import { MAJOR, Key, Scale, MINOR, SURFY } from '@/scripts/music-theory'


	const key = ref<Key>(Key.G)
	const scale = ref<Scale>(MAJOR)

	
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
