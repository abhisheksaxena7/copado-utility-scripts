// Get Copado license summary and all licensed users
// Optimized to query only users who have Copado licenses assigned

System.debug('========== COPADO LICENSE SUMMARY ==========\n');

copado.GlobalAPI api = new copado.GlobalAPI();
copado.GlobalAPI.CopadoLicenses licenseSummary;

try {
    // Get overall Copado license summary
    licenseSummary = api.getLicenseInformation();

    System.debug('COPADO ADMIN LICENSES:');
    System.debug('  Total: ' + licenseSummary.totalNumberOfCopadoLicenses);
    System.debug('  Used: ' + licenseSummary.usedCopadoLicenses);
    System.debug('  Available: ' + licenseSummary.availableCopadoLicenses);
    System.debug('');

    System.debug('COPADO USER LICENSES:');
    System.debug('  Total: ' + licenseSummary.totalNumberOfCCMLicenses);
    System.debug('  Used: ' + licenseSummary.usedCCMLicenses);
    System.debug('  Available: ' + licenseSummary.availableCCMLicenses);
    System.debug('');

} catch (Exception e) {
    System.debug('ERROR getting license summary: ' + e.getMessage());
    return;
}

System.debug('========== ALL LICENSED USERS ==========\n');

try {
    // Step 1: Get ALL Copado licenses from GlobalAPI
    List<copado.GlobalAPI.UserLicense> allLicenses = api.listCopadoLicenses();

    if (allLicenses == null || allLicenses.isEmpty()) {
        System.debug('No Copado licenses found in the system.\n');
        return;
    }

    System.debug('Retrieved ' + allLicenses.size() + ' license records from Copado GlobalAPI\n');

    // Step 2: Extract user IDs from license records (efficient - only query users who have licenses)
    Set<Id> licensedUserIds = new Set<Id>();
    for (copado.GlobalAPI.UserLicense lic : allLicenses) {
        if (lic.userId != null) {
            licensedUserIds.add(lic.userId);
        }
    }

    System.debug('Found ' + licensedUserIds.size() + ' unique users with Copado licenses\n');

    // Step 3: Query User details ONLY for licensed users (best practice - selective query)
    Map<Id, User> licensedUsers = new Map<Id, User>([
        SELECT Id, Name, Username, Email, IsActive, Profile.Name
        FROM User
        WHERE Id IN :licensedUserIds
        ORDER BY Name
    ]);

    System.debug('---------- LICENSED USER DETAILS ----------\n');

    Integer activeCount = 0;
    Integer inactiveCount = 0;

    // Step 4: Display each licensed user with their license details
    for (copado.GlobalAPI.UserLicense lic : allLicenses) {
        User u = licensedUsers.get(lic.userId);

        if (u != null) {
            if (u.IsActive) {
                activeCount++;
            } else {
                inactiveCount++;
            }

            System.debug('USER: ' + u.Name + (u.IsActive ? '' : ' [INACTIVE]'));
            System.debug('  Username: ' + u.Username);
            System.debug('  Email: ' + u.Email);
            System.debug('  Profile: ' + u.Profile.Name);
            System.debug('  User ID: ' + u.Id);
            System.debug('');
            System.debug('  License Details: ' + lic);
            System.debug('');
        }
    }

    System.debug('========== SUMMARY ==========');
    System.debug('Total licensed users: ' + licensedUsers.size());
    System.debug('  Active: ' + activeCount);
    System.debug('  Inactive: ' + inactiveCount);
    System.debug('');
    System.debug('Expected used Copado User licenses: ' + licenseSummary.usedCCMLicenses);
    System.debug('Actual users with licenses: ' + licensedUsers.size());

} catch (Exception e) {
    System.debug('ERROR: ' + e.getMessage());
    System.debug('Type: ' + e.getTypeName());
    System.debug('Line: ' + e.getLineNumber());
    System.debug('Stack: ' + e.getStackTraceString());
}

System.debug('========== COMPLETE ==========');
