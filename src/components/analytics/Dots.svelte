<div class="container">
	<div></div>
	<div></div>
	<div></div>
</div>

<style>
	@keyframes dot {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	.container {
		margin: 1em 0;
		width: 100%;

		display: flex;
		justify-content: center;
		gap: 8px;
	}

	.container > div {
		animation: dot 2s infinite;
		background-color: var(--text-color-3);
		border-radius: 50%;
		height: 8px;
		width: 8px;
	}

	.container > div:nth-child(2) {
		animation-delay: 0.5s;
	}

	.container > div:nth-child(3) {
		animation-delay: 1s;
	}
</style>
