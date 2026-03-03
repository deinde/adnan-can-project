# Execution Scripts

This folder contains deterministic Python scripts that handle the actual work.

Principles:
- **Reliable**: Scripts produce consistent output for the same input
- **Testable**: Each script can be run independently for verification
- **Fast**: Optimized for performance
- **Well-commented**: Clear documentation of what each script does
- **Environment-aware**: API keys and config loaded from `.env`

Scripts are called by the orchestration layer (the AI agent) based on directives.
