<template>
	<li>
		<NuxtLink :to="to">
			<slot/>
		</NuxtLink>
	</li>
</template>

<script setup lang="ts">
	defineProps<{ to: string }>()
</script>

<style scoped>
	li
	{
		display: inline-block;
		list-style: none;
		padding-right: 0.5ch;
		text-transform: uppercase;
		font-size: 5rem;
		font-weight: bold;
		line-height: 1;
		letter-spacing: -0.2em;
	}

	li::after
	{
		content: ",";
	}

	li:last-of-type::after
	{
		display: none;
	}

	li a, li::after
	{
		color: var(--accent);
		-webkit-text-stroke: 1.5px var(--foreground);
		text-decoration: none;
	}

	li a:hover,
	li a:focus
	{
		color: var(--background);
		outline: none;
	}
</style>