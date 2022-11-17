<div class="container">
	<div class="spinner"></div>
</div>

<style>
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(180deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.container {
		padding: 0.5rem;
		text-align: center;
	}

	.spinner {
		animation: 1.5s linear 0 spin;
		animation-iteration-count: infinite;
		border: 4px solid var(--highlight-color);
		border-left-color: transparent;
		border-radius: 50%;
		display: inline-block;

		width: 2rem;
		height: 2rem;
	}
</style>
