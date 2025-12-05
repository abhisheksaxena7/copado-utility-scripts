# get-copado-license-info.apex

## Purpose

This Apex script collects Copado license summary information and prints details for all users that have Copado licenses assigned. It is optimized to only query User records for the users returned by the Copado Global API.

**Usage**

- Run the script using the Salesforce CLI and redirect output to a file. Example:

```
sf apex run --file get-license-info/get-copado-license-info.apex --target-org myCopadoOrg > output.log
```

**Important**: Run this against the Salesforce org where Copado is installed. The script calls Copado's `GlobalAPI` and will only work in orgs that have the Copado managed package installed and the Global API available.
For more details, see [Copado Global API Documentation](https://docs.copado.com/articles/#!copado-ci-cd-publication/global-api/a/h2__1183961390).

## Prerequisites

- **Salesforce CLI (`sf`) installed**: Install the Salesforce CLI for macOS by following the official instructions: https://developer.salesforce.com/docs/salesforce-cli/guide/install
- **Authorize the target org**: Authenticate the org you will run against and give it an alias (example uses `myCopadoOrg`). A common way is a web login:

```
sf org login web --set-alias myCopadoOrg
```

- **Apex execute permission**: The user you authenticate with must have permission to run anonymous Apex and access to the Copado package objects and APIs.
- **Copado installed in the org**: Confirm Copado is installed in the target org and that the authenticated user has access to Copado's Global API.

## What the script does

- Retrieves the Copado license summary via `copado.GlobalAPI.getLicenseInformation()` and prints totals for Copado Admin and Copado User licenses.
- Calls `copado.GlobalAPI.listCopadoLicenses()` to get all Copado license assignments.
- Builds a set of licensed user Ids and runs a single selective SOQL query to retrieve `User` records for those ids (Name, Username, Email, IsActive, Profile.Name).
- Prints each licensed user's details and the original license record details.
- Prints a final summary with counts of active/inactive users and a comparison of expected used Copado licenses vs actual users found.

## Sample output (excerpt)

The script prints debug output similar to what's captured in `output.log`. Example excerpt:

```
========== COPADO LICENSE SUMMARY ==========

COPADO ADMIN LICENSES:
  Total: 200
  Used: 32
  Available: 168

COPADO USER LICENSES:
  Total: 200
  Used: 8
  Available: 192

========== ALL LICENSED USERS ==========

Retrieved 33 license records from Copado GlobalAPI

Found 33 unique users with Copado licenses

---------- LICENSED USER DETAILS ----------

USER: Test User
  Username: testeuser+se-demo-org@copado.com
  Email: tuser@copado.com
  Profile: Standard Platform User
  User ID: 005J7000002fovuIAA

  License Details: UserLicense:[isADDEnabled=null, isCADenabled=true, isCCHenabled=true, isCCMenabled=true, isCSTenabled=false, isCopadoEnabled=true, userId=005J7000002fovuIAA]

========== SUMMARY ==========
Total licensed users: 33
  Active: 32
  Inactive: 1

Expected used Copado User licenses: 8
Actual users with licenses: 33

========== COMPLETE ==========
```

## Troubleshooting

- If the script fails to run, confirm the `sf` executable is in your PATH and that the alias `myCopadoOrg` (or whichever alias you use) is pointing to a valid, authorized org.
- If you see exceptions about missing types or unknown `copado.GlobalAPI`, that indicates Copado isn't installed in the org or the running user lacks access to the Copado package.
- If the Apex anonymous run times out, try running in smaller chunks or use a user with higher execution limits. The script itself uses one call to `listCopadoLicenses()` plus one SOQL query for user details.

## Security & Permissions

- The authenticated user must have sufficient permissions to execute anonymous Apex and read `User` and Copado-managed package objects.
- Be mindful that output may include user email addresses and user IDs. Treat `output.log` as sensitive if your org policy requires it.
