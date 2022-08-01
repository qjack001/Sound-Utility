<template>
	<NuxtLink to="/">
		Sound Utility
	</NuxtLink>
</template>

<style scoped>
	a
	{
		text-transform: uppercase;
		font-weight: bold;
		line-height: 1;
		letter-spacing: -0.2em;
		padding: 0 0.5ch;

		color: var(--accent);
		-webkit-text-stroke: 0.02em var(--foreground);
		text-decoration: none;
		user-select: none;
	}

	a:hover,
	a:focus
	{
		color: var(--background);
		outline: none;
	}
</style>