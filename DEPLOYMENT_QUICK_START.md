# Quick Deployment Guide

## What Was Changed

### ✅ Smart Contract
- Added time-based voting with `endTime` and `durationInHours`
- Added modifiers and constants for better code quality
- Restricts voting and results viewing based on time

### ✅ Frontend
- Added duration input in CreatePoll component
- Shows time remaining in VotePoll component
- Restricts results viewing in ViewResults component
- Created time utility functions for consistency

## Steps to Deploy

### 1️⃣ Compile Contract
```bash
cd contract
npx truffle compile
```

### 2️⃣ Deploy to Ganache
```bash
# Make sure Ganache is running first!
npx truffle migrate --reset
```

### 3️⃣ Update Contract Address
Copy the deployed contract address from the output, then:

```bash
# Update .env file in project root
VITE_CONTRACT_ADDRESS=0xYourNewContractAddressHere
```

### 4️⃣ Restart Dev Server
```bash
# In project root directory
npm run dev
```

### 5️⃣ Reset MetaMask
**Important:** Reset your MetaMask account to clear old transaction data:
- MetaMask → Settings → Advanced → Clear activity tab data

### 6️⃣ Test the Features!

**Create a poll with duration:**
- Go to "Create Poll" tab
- Enter question and options
- **NEW:** Enter duration in hours (e.g., 1 for testing)
- Submit

**Vote on a poll:**
- Go to "Vote" tab
- Select your poll
- **NEW:** See time remaining display
- Vote before time expires

**View results:**
- Go to "View Results" tab
- Select poll
- **NEW:** Results only show after voting ends

## Testing Scenarios

### Quick Test (1 hour poll)
```
Duration: 1 hour
Expected: Results available in 1 hour
```

### Development Test (shorter for testing)
For faster testing, you can modify the contract to use minutes instead of hours during development:
```solidity
// In Polling.sol, temporarily change line 37 to:
newPoll.endTime = block.timestamp + (_durationInHours * 1 minutes); // For testing
```
Then `_durationInHours` becomes duration in minutes for testing.

**Remember to change it back to `1 hours` for production!**

## Verification Checklist

- [ ] Contract compiles without errors
- [ ] Contract deploys successfully
- [ ] .env file updated with new address
- [ ] Dev server restarted
- [ ] MetaMask reset
- [ ] Can create poll with duration
- [ ] Time remaining shows correctly
- [ ] Cannot vote after time expires
- [ ] Cannot view results before time expires
- [ ] Can view results after time expires

## Need Help?

Check the detailed documentation:
- `TIME_BASED_VOTING_IMPLEMENTATION.md` - Complete implementation guide
- `Documentation/COMPLETE_GUIDE.md` - General project documentation

## Common Issues

**Problem:** Contract deployment fails  
**Solution:** Make sure Ganache is running on `http://127.0.0.1:7545`

**Problem:** Frontend shows old poll data  
**Solution:** Clear browser cache, reset MetaMask, restart dev server

**Problem:** Cannot vote or view results  
**Solution:** This is expected! Check the voting period status - the feature is working correctly

**Problem:** Time remaining not updating  
**Solution:** Refresh the page or reselect the poll to update the time

## What's Next?

After successful testing:
1. Consider deploying to a testnet (Sepolia, Goerli)
2. Add more features (see TIME_BASED_VOTING_IMPLEMENTATION.md)
3. Optimize gas costs for production
4. Consider professional security audit

---

**Status:** ✅ Implementation Complete - Ready for Deployment
