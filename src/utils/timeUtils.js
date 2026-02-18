/**
 * Time utility functions for poll voting and result viewing
 */

/**
 * Get the current Unix timestamp in seconds
 * @returns {number} Current timestamp
 */
export const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);

/**
 * Check if voting period has ended for a poll
 * @param {string|number} endTime - Poll end time timestamp
 * @returns {boolean} True if voting has ended
 */
export const hasVotingEnded = (endTime) => {
	return getCurrentTimestamp() >= parseInt(endTime);
};

/**
 * Format time remaining until poll ends
 * @param {string|number} endTime - Poll end time timestamp
 * @returns {string} Formatted time remaining string
 */
export const formatTimeRemaining = (endTime) => {
	const now = getCurrentTimestamp();
	const timeLeft = parseInt(endTime) - now;
	
	if (timeLeft <= 0) return 'Voting ended';
	
	const minutes = Math.floor(timeLeft / 60);
	const hours = Math.floor(timeLeft / 3600);
	const days = Math.floor(hours / 24);
	
	if (days > 0) {
		return `${days} day${days > 1 ? 's' : ''} remaining`;
	}
	if (hours > 0) {
		return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
	}
	if (minutes > 0) {
		return `${minutes} minute${minutes > 1 ? 's' : ''} remaining`;
	}
	return 'Less than 1 minute remaining';
};

/**
 * Get human-readable time until results are available
 * @param {string|number} endTime - Poll end time timestamp
 * @returns {string} Formatted string for display
 */
export const getTimeUntilResults = (endTime) => {
	const now = getCurrentTimestamp();
	const timeLeft = parseInt(endTime) - now;
	
	if (timeLeft <= 0) return 'Results available now';
	
	const hours = Math.ceil(timeLeft / 3600);
	const days = Math.floor(hours / 24);
	
	if (days > 0) {
		return `${days} day${days > 1 ? 's' : ''}`;
	}
	return `${hours} hour${hours > 1 ? 's' : ''}`;
};

/**
 * Convert hours to human-readable format
 * @param {number} hours - Number of hours
 * @returns {string} Formatted duration string
 */
export const formatDuration = (hours) => {
	if (hours < 24) {
		return `${hours} hour${hours > 1 ? 's' : ''}`;
	}
	const days = Math.floor(hours / 24);
	const remainingHours = hours % 24;
	
	if (remainingHours === 0) {
		return `${days} day${days > 1 ? 's' : ''}`;
	}
	return `${days} day${days > 1 ? 's' : ''} and ${remainingHours} hour${remainingHours > 1 ? 's' : ''}`;
};
