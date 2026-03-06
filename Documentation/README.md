# Documentation Index

Last updated: 2026-03-06

This folder documents the current implementation of the blockchain polling project.

## Documents

1. [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)
   - Full project overview
   - Features, modules, folder structure
   - Setup summary, configuration, developer notes, future improvements

2. [ARCHITECTURE.md](./ARCHITECTURE.md)
   - High-level architecture
   - Module interaction map
   - Data flow and sequence diagrams

3. [API_REFERENCE.md](./API_REFERENCE.md)
   - Smart contract method reference
   - Frontend Web3 service method reference
   - Data model definitions and relationships

4. [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md)
   - Prerequisites and installation
   - Local run instructions
   - Environment/network setup
   - Troubleshooting and operational notes

## Scope Notes

- This project currently has no HTTP backend endpoints.
- The “API surface” is the smart contract + frontend Web3 service layer.
- Persistent storage is on-chain in the `Polling` contract.
