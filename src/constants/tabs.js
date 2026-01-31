import EditNoteIcon from '@mui/icons-material/EditNote';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import BarChartIcon from '@mui/icons-material/BarChart';

export const TABS = {
	CREATE: 'create',
	VOTE: 'vote',
	RESULTS: 'results',
};

export const TAB_CONFIG = [
	{
		id: TABS.CREATE,
		label: 'Create Poll',
		icon: EditNoteIcon,
	},
	{
		id: TABS.VOTE,
		label: 'Vote in Poll',
		icon: HowToVoteIcon,
	},
	{
		id: TABS.RESULTS,
		label: 'View Results',
		icon: BarChartIcon,
	},
];
