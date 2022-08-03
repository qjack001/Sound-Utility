<template>
	<main>
		<Head>
			<Title>Metronome | Sound Utility</Title>
		</Head>
		<p id="wordmark">
			<Wordmark/>
		</p>
		<section>
			<h1>Metronome</h1>
			<p>jndlijds sdvlndslkn</p>
		</section>
		<MetronomeCounter
			:beats="4"
			:bpm="bpm"
		/>
		<MetronomeSlider v-model:bpm="bpm"/>
	</main>
</template>

<script setup lang="ts">
	const bpm = ref<number>(120)
</script>

<style scoped>
	#wordmark
	{
		font-size: 3.5rem;
		margin: 0;
	}

	main
	{
		margin: 0 20px;
	}
</style>