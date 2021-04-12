<template>
	<site-header :inverted="true"/>
	<main v-focus-visible>
		<p>Sound Utility is a collection of tools for creating music, but that do not create music themselves.</p>
		<h2>Tools:</h2>
		<ul>
			<li><router-link to='lcr'>Left Center Random</router-link></li>
			<li><router-link to='chords'>Simple Progression</router-link></li>
		</ul>
	</main>
</template>

<script>
	import SiteHeader from '../SiteHeader'
	export default 
	{
		components:
		{
			SiteHeader
		},
		created()
		{
			const url = new URL(window.location.href);
			url.searchParams.delete('key');
			url.searchParams.delete('prog');
			window.history.replaceState(null, null, url);
		}
	}
</script>

<style scoped>
	main
	{
		background: var(--accent);

		position: fixed;
		overflow: scroll;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		padding-top: 80px;
	}

	p
	{
		max-width: 60ch;
		margin: 0 auto;
		padding: 0 40px;
	}

	::selection
	{
		background: var(--foreground);
		color: var(--background);
	}

	h2
	{
		font-size: 1.6rem;
		letter-spacing: 0.01em;
		line-height: 5ch;
		width: 10ch;
		border: solid 1px var(--foreground);
		border-radius: 100%;

		margin: 0 auto;
		transform: translateX(-20vw) translateY(35%);
		text-align: center;
	}

	ul
	{
		padding: 0;
		max-width: max-content;
		margin: auto;
		text-align: center;
	}

	li
	{
		display: inline-block;
		list-style: none;
		padding-right: 0.5ch;

		text-transform: uppercase;
		font-size: 5rem;
		font-weight: bold;
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
	[v-focus-visible=true] li a:focus
	{
		color: var(--background);
		outline: none;
	}
</style>