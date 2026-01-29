export default function PollSelector({ polls, selectedPollId, onPollSelect }) {
	return (
		<div className="form-group">
			<label htmlFor="poll-select">Select Poll:</label>
			<select
				id="poll-select"
				value={selectedPollId}
				onChange={(e) => onPollSelect(e.target.value)}
			>
				<option value="">-- Select a Poll --</option>
				{polls.map((poll) => (
					<option key={poll.id} value={poll.id}>
						Poll #{poll.id}: {poll.question}
					</option>
				))}
			</select>
		</div>
	);
}
