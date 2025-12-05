# Bulk Commit Actions API

A Node.js utility for performing bulk commits to Copado User Stories using the **Copado Actions API**.

## Overview

This script leverages the Copado Actions API's commit action to programmatically commit multiple labels to their corresponding User Stories. Instead of manually committing each label, this tool automates the process by sending POST requests to Copado's webhook endpoint.

## Key Features

- **Bulk Processing**: Commit multiple labels to their corresponding User Stories in a single batch operation
- **Rate Limiting**: Built-in delay between requests to avoid API throttling
- **Detailed Logging**: Real-time progress tracking with success/failure reporting
- **Result Persistence**: Saves execution results to a JSON file for audit and troubleshooting
- **Error Handling**: Captures and reports individual commit failures while continuing with remaining items

## Technology Stack

- **Language**: Node.js / JavaScript
- **Dependencies**:
  - `unirest`: HTTP client for making API requests
  - `axios`: Additional HTTP utilities

## How It Works

The script uses the Copado Actions API's commit action endpoint to:

1. Accept a list of label-to-user-story mappings
2. Iterate through each mapping with configurable delays between requests
3. Send POST requests to Copado's Actions API webhook endpoint
4. Execute the commit operation with the commit action parameters
5. Track and log results (success/failure) for each commit
6. Generate a summary report and save results to a timestamped JSON file

## Configuration

Before running the script, update the following configuration values in `copado-commit.js`:

```javascript
// API endpoint with your Copado Actions API key
const WEBHOOK_URL =
  "https://app-api.copado.com/json/v1/webhook/mcwebhook/commit?webhookKey=YOUR_ACTIONS_API_KEY_HERE";

// Base branch for commits
const BASE_BRANCH = "main";

// Delay between API requests (milliseconds)
const DELAY_BETWEEN_REQUESTS = 2000;

// Session cookie (if required)
const SESSION_COOKIE = "SESSION=YOUR_SESSION_COOKIE_HERE";
```

### User Story Mappings

Define your label-to-user-story mappings in the `userStoryMappings` array:

```javascript
const userStoryMappings = [
  {
    labelName: "Label_1",
    userStoryId: "USER_STORY_ID_1",
    title: "User Story Title 1",
  },
  {
    labelName: "Label_2",
    userStoryId: "USER_STORY_ID_2",
    title: "User Story Title 2",
  },
  // ... more mappings
];
```

## Usage

### Installation

```bash
npm install
```

### Running the Script

```bash
node copado-commit.js
```

The script will:

1. Display an execution summary with configuration details
2. Process each label commit sequentially
3. Log real-time progress with success/failure indicators
4. Output a final summary with statistics
5. Save detailed results to a timestamped JSON file (e.g., `commit-results-1764883423733.json`)

## Output

### Console Output

```
╔════════════════════════════════════════════╗
║   COPADO BULK COMMIT - LABELS 3-100        ║
╚════════════════════════════════════════════╝
Total labels to commit: 98
Delay between requests: 2000ms
Base branch: main
Start time: 2024-12-05T10:30:00.000Z
════════════════════════════════════════════

✓ SUCCESS: Label_3 → User Story Title 3
Progress: 1/98 (1.0%) ✓
⏳ Waiting 2000ms before next request...
...
```

### Results File

A JSON file is generated with the following structure:

```json
{
  "summary": {
    "total": 98,
    "successful": 95,
    "failed": 3,
    "durationSeconds": 245.3,
    "startTime": "2024-12-05T10:30:00.000Z",
    "endTime": "2024-12-05T10:34:05.300Z"
  },
  "successful": [
    {
      "labelName": "Label_3",
      "userStoryId": "USER_STORY_ID_3",
      "title": "User Story Title 3",
      "response": "..."
    }
  ],
  "failed": [
    {
      "labelName": "Label_5",
      "userStoryId": "USER_STORY_ID_5",
      "title": "User Story Title 5",
      "error": "..."
    }
  ]
}
```

## API Integration

This tool integrates with the Copado Actions API using the commit action. The API expects:

- **Endpoint**: `https://app-api.copado.com/json/v1/webhook/mcwebhook/commit`
- **Authentication**: Copado Actions API Key (included as `webhookKey` query parameter)
- **Method**: POST
- **Body**: JSON object containing commit action parameters

For more information on the Copado Actions API, refer to:

- **Copado Actions API Documentation**: https://docs.copado.com/articles/#!copado-developer-center-publication/copado-actions-api/
- **Actions API APIary Documentation**: https://copadomulticoudwebhooks.docs.apiary.io/
- **Commit Action Documentation**: https://docs.copado.com/articles/#!copado-developer-center-publication/commit-action

## Error Handling

The script captures and reports:

- **API Errors**: Failed HTTP requests are logged with error details
- **Partial Failures**: If some commits fail, the script continues with remaining items
- **Exit Code**: Returns exit code 1 if any commits fail, 0 if all succeed

## Example Execution Metrics

- **Typical Duration**: Depends on number of commits and configured delay
  - With 2-second delays: ~100 commits takes approximately 3-4 minutes
- **Success Rate**: Depends on API availability and data validity
- **Rate Limiting**: 2-second default delay is recommended to avoid hitting API throttle limits

## Notes

- Ensure your Copado Actions API key has the necessary permissions for commit operations
- Verify that all User Story IDs and labels exist in your Copado instance before running
- The script uses sequential processing; for large batches, ensure sufficient time between requests
- Results are timestamped and saved locally for audit trails

## Troubleshooting

**Common Issues**:

1. **Authentication Error**: Verify your Copado Actions API key is correct and still valid
2. **Invalid User Story ID**: Check that all User Story IDs in the mappings exist
3. **API Rate Limiting**: Increase `DELAY_BETWEEN_REQUESTS` if you encounter rate limit errors
4. **Network Issues**: Ensure your system can reach `app-api.copado.com`
