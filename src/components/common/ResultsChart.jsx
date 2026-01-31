/**
 * Results visualization component
 * Displays poll results with percentage bars and vote counts
 */
export default function ResultsChart({ results }) {
	return (
		<div className="poll-card">
			<h3>{results.question}</h3>
			<p className="results-summary">
				<strong>Total Votes:</strong> {results.totalVotes}
			</p>
			<div className="poll-options">
				{results.results.map((result, index) => (
					<div key={index} className="result-item">
						<div className="result-header">
							<strong>{result.option}</strong>
							<span className="result-badge">
								{result.votes} {result.votes === 1 ? 'vote' : 'votes'} ({result.percentage}%)
							</span>
						</div>
						<div className="result-bar">
							<div
								className="result-bar-fill"
								style={{ width: `${result.percentage}%` }}
								role="progressbar"
								aria-valuenow={result.percentage}
								aria-valuemin="0"
								aria-valuemax="100"
								aria-label={`${result.option}: ${result.percentage}%`}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
