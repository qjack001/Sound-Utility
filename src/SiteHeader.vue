<template>
	<header>
		<router-link to='/' :class="{ 'inverted': inverted }">
			<span id="logo" aria-label="logo"></span>
			<span id="wordmark">Sound Utility</span>
		</router-link>
	</header>	
</template>

<script>
	export default
	{
		name: 'SiteHeader',
		props: [ 'inverted' ]
	}
</script>

<style scoped>
	header
	{
		position: relative;
		z-index: 99;
		width: max-content;
	}

	a
	{
		text-decoration: none;
		outline: none;
		color: inherit;
	}

	#logo
	{
		color: transparent;
		background: var(--accent);
		border: 1px solid var(--accent);

		display: inline-block;
		width: 30px;
		height: 15px;
		border-radius: 15px 15px 0 0;

		margin: 15px 30px;
	}

	.inverted #logo
	{
		background: var(--background);
		border-color: var(--foreground);
	}

	#wordmark
	{
		display: inline-block;
		transform: translateY(-17px);

		font-weight: bold;
		line-height: 1;

		background-image: linear-gradient(var(--accent), var(--accent));
		background-repeat: no-repeat;
		background-size: 0% 1px;
		background-position: bottom left;
		transition: background-size 0.3s ease;
	}

	a:hover #logo
	{
		border-color: var(--foreground);
	}

	a:hover #wordmark
	{
		background-size: 100% 1px;
	}

	a:focus #logo
	{
		border-color: var(--foreground);
		box-shadow: 0 0 0 4px var(--background), 0 0 0 6px var(--accent);
	}

	a:focus #wordmark
	{
		box-shadow: 0 0 0 4px var(--background), 0 0 0 6px var(--accent);
	}
</style>