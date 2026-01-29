# Common Components

This directory contains reusable UI components used across the application.

## Components

### MessageDisplay
Displays status messages (success, error, info) to the user.

**Props:**
- `message` (object): { text: string, type: 'success' | 'error' | 'info' }

### PollSelector
Dropdown component for selecting polls.

**Props:**
- `polls` (array): Array of poll objects
- `selectedPollId` (string|number): Currently selected poll ID
- `onPollSelect` (function): Callback when poll is selected

### ResultsChart
Displays poll results with vote counts and percentage bars.

**Props:**
- `results` (object): Formatted poll results with question and results array
