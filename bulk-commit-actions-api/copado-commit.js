/**
 * Bulk Commit Labels to User Stories
 * Commits Label_3 through Label_100 to their corresponding User Stories
 * (Label_1 and Label_2 already completed)
 */

var unirest = require('unirest');

// ===== CONFIGURATION =====
const WEBHOOK_URL = 'https://app-api.copado.com/json/v1/webhook/mcwebhook/commit?webhookKey=your-action-api-key-here';
const BASE_BRANCH = 'main';
const DELAY_BETWEEN_REQUESTS = 2000; // 2 seconds delay between requests
const SESSION_COOKIE = 'SESSION=your-session-cookie-here'; // Replace with your actual session cookie

// ===== COMPLETE LABEL TO USER STORY MAPPING =====
const userStoryMappings = [
  // ALREADY COMPLETED - SKIPPING THESE:
  // { labelName: 'Label_1', userStoryId: 'a1val0000014xc1AAA', title: 'Large Deployment US 1' },
  // { labelName: 'Label_2', userStoryId: 'a1val0000014xc2AAA', title: 'Large Deployment US 2' },

  // REMAINING 98 TO COMMIT:
  { labelName: 'Label_3', userStoryId: 'a1val0000014xc3AAA', title: 'Large Deployment US 3' },
  { labelName: 'Label_4', userStoryId: 'a1val0000014xc4AAA', title: 'Large Deployment US 4' },
  { labelName: 'Label_5', userStoryId: 'a1val0000014xc5AAA', title: 'Large Deployment US 5' },
  { labelName: 'Label_6', userStoryId: 'a1val0000014xc6AAA', title: 'Large Deployment US 6' },
  { labelName: 'Label_7', userStoryId: 'a1val0000014xc7AAA', title: 'Large Deployment US 7' },
  { labelName: 'Label_8', userStoryId: 'a1val0000014xc8AAA', title: 'Large Deployment US 8' },
  { labelName: 'Label_9', userStoryId: 'a1val0000014xc9AAA', title: 'Large Deployment US 9' },
  { labelName: 'Label_10', userStoryId: 'a1val0000014xcAAAQ', title: 'Large Deployment US 10' },
  { labelName: 'Label_11', userStoryId: 'a1val0000014xcBAAQ', title: 'Large Deployment US 11' },
  { labelName: 'Label_12', userStoryId: 'a1val0000014xcCAAQ', title: 'Large Deployment US 12' },
  { labelName: 'Label_13', userStoryId: 'a1val0000014xcDAAQ', title: 'Large Deployment US 13' },
  { labelName: 'Label_14', userStoryId: 'a1val0000014xcEAAQ', title: 'Large Deployment US 14' },
  { labelName: 'Label_15', userStoryId: 'a1val0000014xcFAAQ', title: 'Large Deployment US 15' },
  { labelName: 'Label_16', userStoryId: 'a1val0000014xcGAAQ', title: 'Large Deployment US 16' },
  { labelName: 'Label_17', userStoryId: 'a1val0000014xcHAAQ', title: 'Large Deployment US 17' },
  { labelName: 'Label_18', userStoryId: 'a1val0000014xcIAAQ', title: 'Large Deployment US 18' },
  { labelName: 'Label_19', userStoryId: 'a1val0000014xcJAAQ', title: 'Large Deployment US 19' },
  { labelName: 'Label_20', userStoryId: 'a1val0000014xcKAAQ', title: 'Large Deployment US 20' },
  { labelName: 'Label_21', userStoryId: 'a1val0000014xcLAAQ', title: 'Large Deployment US 21' },
  { labelName: 'Label_22', userStoryId: 'a1val0000014xcMAAQ', title: 'Large Deployment US 22' },
  { labelName: 'Label_23', userStoryId: 'a1val0000014xcNAAQ', title: 'Large Deployment US 23' },
  { labelName: 'Label_24', userStoryId: 'a1val0000014xcOAAQ', title: 'Large Deployment US 24' },
  { labelName: 'Label_25', userStoryId: 'a1val0000014xcPAAQ', title: 'Large Deployment US 25' },
  { labelName: 'Label_26', userStoryId: 'a1val0000014xcQAAQ', title: 'Large Deployment US 26' },
  { labelName: 'Label_27', userStoryId: 'a1val0000014xcRAAQ', title: 'Large Deployment US 27' },
  { labelName: 'Label_28', userStoryId: 'a1val0000014xcSAAQ', title: 'Large Deployment US 28' },
  { labelName: 'Label_29', userStoryId: 'a1val0000014xcTAAQ', title: 'Large Deployment US 29' },
  { labelName: 'Label_30', userStoryId: 'a1val0000014xcUAAQ', title: 'Large Deployment US 30' },
  { labelName: 'Label_31', userStoryId: 'a1val0000014xcVAAQ', title: 'Large Deployment US 31' },
  { labelName: 'Label_32', userStoryId: 'a1val0000014xcWAAQ', title: 'Large Deployment US 32' },
  { labelName: 'Label_33', userStoryId: 'a1val0000014xcXAAQ', title: 'Large Deployment US 33' },
  { labelName: 'Label_34', userStoryId: 'a1val0000014xcYAAQ', title: 'Large Deployment US 34' },
  { labelName: 'Label_35', userStoryId: 'a1val0000014xcZAAQ', title: 'Large Deployment US 35' },
  { labelName: 'Label_36', userStoryId: 'a1val0000014xcaAAA', title: 'Large Deployment US 36' },
  { labelName: 'Label_37', userStoryId: 'a1val0000014xcbAAA', title: 'Large Deployment US 37' },
  { labelName: 'Label_38', userStoryId: 'a1val0000014xccAAA', title: 'Large Deployment US 38' },
  { labelName: 'Label_39', userStoryId: 'a1val0000014xcdAAA', title: 'Large Deployment US 39' },
  { labelName: 'Label_40', userStoryId: 'a1val0000014xceAAA', title: 'Large Deployment US 40' },
  { labelName: 'Label_41', userStoryId: 'a1val0000014xcfAAA', title: 'Large Deployment US 41' },
  { labelName: 'Label_42', userStoryId: 'a1val0000014xcgAAA', title: 'Large Deployment US 42' },
  { labelName: 'Label_43', userStoryId: 'a1val0000014xchAAA', title: 'Large Deployment US 43' },
  { labelName: 'Label_44', userStoryId: 'a1val0000014xciAAA', title: 'Large Deployment US 44' },
  { labelName: 'Label_45', userStoryId: 'a1val0000014xcjAAA', title: 'Large Deployment US 45' },
  { labelName: 'Label_46', userStoryId: 'a1val0000014xckAAA', title: 'Large Deployment US 46' },
  { labelName: 'Label_47', userStoryId: 'a1val0000014xclAAA', title: 'Large Deployment US 47' },
  { labelName: 'Label_48', userStoryId: 'a1val0000014xcmAAA', title: 'Large Deployment US 48' },
  { labelName: 'Label_49', userStoryId: 'a1val0000014xcnAAA', title: 'Large Deployment US 49' },
  { labelName: 'Label_50', userStoryId: 'a1val0000014xcoAAA', title: 'Large Deployment US 50' },
  { labelName: 'Label_51', userStoryId: 'a1val0000014xcpAAA', title: 'Large Deployment US 51' },
  { labelName: 'Label_52', userStoryId: 'a1val0000014xcqAAA', title: 'Large Deployment US 52' },
  { labelName: 'Label_53', userStoryId: 'a1val0000014xcrAAA', title: 'Large Deployment US 53' },
  { labelName: 'Label_54', userStoryId: 'a1val0000014xcsAAA', title: 'Large Deployment US 54' },
  { labelName: 'Label_55', userStoryId: 'a1val0000014xctAAA', title: 'Large Deployment US 55' },
  { labelName: 'Label_56', userStoryId: 'a1val0000014xcuAAA', title: 'Large Deployment US 56' },
  { labelName: 'Label_57', userStoryId: 'a1val0000014xcvAAA', title: 'Large Deployment US 57' },
  { labelName: 'Label_58', userStoryId: 'a1val0000014xcwAAA', title: 'Large Deployment US 58' },
  { labelName: 'Label_59', userStoryId: 'a1val0000014xcxAAA', title: 'Large Deployment US 59' },
  { labelName: 'Label_60', userStoryId: 'a1val0000014xcyAAA', title: 'Large Deployment US 60' },
  { labelName: 'Label_61', userStoryId: 'a1val0000014xczAAA', title: 'Large Deployment US 61' },
  { labelName: 'Label_62', userStoryId: 'a1val0000014xd0AAA', title: 'Large Deployment US 62' },
  { labelName: 'Label_63', userStoryId: 'a1val0000014xd1AAA', title: 'Large Deployment US 63' },
  { labelName: 'Label_64', userStoryId: 'a1val0000014xd2AAA', title: 'Large Deployment US 64' },
  { labelName: 'Label_65', userStoryId: 'a1val0000014xd3AAA', title: 'Large Deployment US 65' },
  { labelName: 'Label_66', userStoryId: 'a1val0000014xd4AAA', title: 'Large Deployment US 66' },
  { labelName: 'Label_67', userStoryId: 'a1val0000014xd5AAA', title: 'Large Deployment US 67' },
  { labelName: 'Label_68', userStoryId: 'a1val0000014xd6AAA', title: 'Large Deployment US 68' },
  { labelName: 'Label_69', userStoryId: 'a1val0000014xd7AAA', title: 'Large Deployment US 69' },
  { labelName: 'Label_70', userStoryId: 'a1val0000014xd8AAA', title: 'Large Deployment US 70' },
  { labelName: 'Label_71', userStoryId: 'a1val0000014xd9AAA', title: 'Large Deployment US 71' },
  { labelName: 'Label_72', userStoryId: 'a1val0000014xdAAAQ', title: 'Large Deployment US 72' },
  { labelName: 'Label_73', userStoryId: 'a1val0000014xdBAAQ', title: 'Large Deployment US 73' },
  { labelName: 'Label_74', userStoryId: 'a1val0000014xdCAAQ', title: 'Large Deployment US 74' },
  { labelName: 'Label_75', userStoryId: 'a1val0000014xdDAAQ', title: 'Large Deployment US 75' },
  { labelName: 'Label_76', userStoryId: 'a1val0000014xdEAAQ', title: 'Large Deployment US 76' },
  { labelName: 'Label_77', userStoryId: 'a1val0000014xdFAAQ', title: 'Large Deployment US 77' },
  { labelName: 'Label_78', userStoryId: 'a1val0000014xdGAAQ', title: 'Large Deployment US 78' },
  { labelName: 'Label_79', userStoryId: 'a1val0000014xdHAAQ', title: 'Large Deployment US 79' },
  { labelName: 'Label_80', userStoryId: 'a1val0000014xdIAAQ', title: 'Large Deployment US 80' },
  { labelName: 'Label_81', userStoryId: 'a1val0000014xdJAAQ', title: 'Large Deployment US 81' },
  { labelName: 'Label_82', userStoryId: 'a1val0000014xdKAAQ', title: 'Large Deployment US 82' },
  { labelName: 'Label_83', userStoryId: 'a1val0000014xdLAAQ', title: 'Large Deployment US 83' },
  { labelName: 'Label_84', userStoryId: 'a1val0000014xdMAAQ', title: 'Large Deployment US 84' },
  { labelName: 'Label_85', userStoryId: 'a1val0000014xdNAAQ', title: 'Large Deployment US 85' },
  { labelName: 'Label_86', userStoryId: 'a1val0000014xdOAAQ', title: 'Large Deployment US 86' },
  { labelName: 'Label_87', userStoryId: 'a1val0000014xdPAAQ', title: 'Large Deployment US 87' },
  { labelName: 'Label_88', userStoryId: 'a1val0000014xdQAAQ', title: 'Large Deployment US 88' },
  { labelName: 'Label_89', userStoryId: 'a1val0000014xdRAAQ', title: 'Large Deployment US 89' },
  { labelName: 'Label_90', userStoryId: 'a1val0000014xdSAAQ', title: 'Large Deployment US 90' },
  { labelName: 'Label_91', userStoryId: 'a1val0000014xdTAAQ', title: 'Large Deployment US 91' },
  { labelName: 'Label_92', userStoryId: 'a1val0000014xdUAAQ', title: 'Large Deployment US 92' },
  { labelName: 'Label_93', userStoryId: 'a1val0000014xdVAAQ', title: 'Large Deployment US 93' },
  { labelName: 'Label_94', userStoryId: 'a1val0000014xdWAAQ', title: 'Large Deployment US 94' },
  { labelName: 'Label_95', userStoryId: 'a1val0000014xdXAAQ', title: 'Large Deployment US 95' },
  { labelName: 'Label_96', userStoryId: 'a1val0000014xdYAAQ', title: 'Large Deployment US 96' },
  { labelName: 'Label_97', userStoryId: 'a1val0000014xdZAAQ', title: 'Large Deployment US 97' },
  { labelName: 'Label_98', userStoryId: 'a1val0000014xdaAAA', title: 'Large Deployment US 98' },
  { labelName: 'Label_99', userStoryId: 'a1val0000014xdbAAA', title: 'Large Deployment US 99' },
  { labelName: 'Label_100', userStoryId: 'a1val0000014xdcAAA', title: 'Large Deployment US 100' }
];

// ===== HELPER FUNCTIONS =====

// Sleep function for delays
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Commit a single label
function commitLabel(labelName, userStoryId, title) {
  return new Promise((resolve, reject) => {
    const timestamp = new Date().toISOString();
    console.log(`\n[${timestamp}] Committing ${labelName} to ${title} (${userStoryId})...`);

    var req = unirest('POST', WEBHOOK_URL)
      .headers({
        'Content-Type': 'application/json',
        'Cookie': SESSION_COOKIE
      })
      .send(JSON.stringify({
        "payload": {
          "baseBranch": BASE_BRANCH,
          "changes": [
            {
              "t": "CustomLabel",
              "n": labelName,
              "m": "force-app/main/default",
              "a": "add",
              "c": "sfdx"
            }
          ],
          "executeCommit": true,
          "message": `Adding ${labelName} to ${title}`,
          "recreateFeatureBranch": false,
          "userStoryId": userStoryId
        }
      }))
      .end(function (res) {
        if (res.error) {
          console.error(`✗ FAILED: ${labelName} → ${title}`);
          console.error(`  Error: ${res.error}`);
          reject({ labelName, userStoryId, title, error: res.error });
        } else {
          console.log(`✓ SUCCESS: ${labelName} → ${title}`);
          console.log(`  Response: ${res.raw_body}`);
          resolve({ labelName, userStoryId, title, response: res.raw_body });
        }
      });
  });
}

// ===== MAIN EXECUTION =====

async function bulkCommit() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║   COPADO BULK COMMIT - LABELS 3-100        ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log(`Total labels to commit: ${userStoryMappings.length}`);
  console.log(`Delay between requests: ${DELAY_BETWEEN_REQUESTS}ms`);
  console.log(`Base branch: ${BASE_BRANCH}`);
  console.log(`Start time: ${new Date().toISOString()}`);
  console.log('════════════════════════════════════════════\n');

  const results = {
    successful: [],
    failed: []
  };

  const startTime = Date.now();
  let count = 0;
  const total = userStoryMappings.length;

  for (const mapping of userStoryMappings) {
    count++;

    try {
      const result = await commitLabel(
        mapping.labelName,
        mapping.userStoryId,
        mapping.title
      );
      results.successful.push(result);
      console.log(`Progress: ${count}/${total} (${((count / total) * 100).toFixed(1)}%) ✓`);
    } catch (error) {
      results.failed.push(error);
      console.log(`Progress: ${count}/${total} (${((count / total) * 100).toFixed(1)}%) ✗ FAILED`);
    }

    // Wait before next request (except for the last one)
    if (count < total) {
      console.log(`⏳ Waiting ${DELAY_BETWEEN_REQUESTS}ms before next request...`);
      await sleep(DELAY_BETWEEN_REQUESTS);
    }
  }

  const endTime = Date.now();
  const durationSeconds = ((endTime - startTime) / 1000).toFixed(1);
  const durationMinutes = (durationSeconds / 60).toFixed(1);

  // ===== FINAL SUMMARY =====
  console.log('\n\n╔════════════════════════════════════════════╗');
  console.log('║           BULK COMMIT COMPLETED            ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log(`✓ Successful: ${results.successful.length}`);
  console.log(`✗ Failed: ${results.failed.length}`);
  console.log(`Total: ${total}`);
  console.log(`Duration: ${durationSeconds}s (${durationMinutes} minutes)`);
  console.log(`End time: ${new Date().toISOString()}`);
  console.log('════════════════════════════════════════════\n');

  if (results.successful.length > 0) {
    console.log('✓ SUCCESSFUL COMMITS:');
    results.successful.forEach(r => {
      console.log(`  ✓ ${r.labelName} → ${r.title}`);
    });
  }

  if (results.failed.length > 0) {
    console.log('\n✗ FAILED COMMITS:');
    results.failed.forEach(r => {
      console.log(`  ✗ ${r.labelName} → ${r.title} - ${r.error}`);
    });
  }

  // Save results to file
  const fs = require('fs');
  const resultsFile = `commit-results-${Date.now()}.json`;
  fs.writeFileSync(resultsFile, JSON.stringify({
    summary: {
      total,
      successful: results.successful.length,
      failed: results.failed.length,
      durationSeconds,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString()
    },
    successful: results.successful,
    failed: results.failed
  }, null, 2));

  console.log(`\n📄 Results saved to: ${resultsFile}`);

  // Exit with appropriate code
  process.exit(results.failed.length > 0 ? 1 : 0);
}

// ===== RUN THE BULK COMMIT =====
bulkCommit().catch(error => {
  console.error('\n✗ FATAL ERROR:', error);
  process.exit(1);
});
