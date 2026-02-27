

## Replace Step 5 Agreement with Ambassador Participation Agreement

### Overview

Replace the current hardcoded "Official Rules" content in Step 5 of the Creator Application Form with the full ValorWell Ambassador Challenge - Ambassador Participation Agreement from the uploaded PDF. The agreement will be rendered as scrollable formatted text within the existing dialog step.

### What Changes

**File: `src/components/forms/CreatorApplicationForm.tsx` (lines 508-564)**

Replace the entire Step 5 content block with the full Ambassador Participation Agreement, structured into its 16 sections:

1. Purpose of the Program
2. Term
3. Program Structure and Division Assignment (3.1 Division Assignment, 3.2 Follower Verification)
4. Ambassador Responsibilities (4.1 Minimum Content Requirements, 4.2 No Unauthorized Representations)
5. Required Messaging and Prohibited Claims (5.1 Core Campaign Framing, 5.2 Prohibited Claims, 5.3 Required Disclosures)
6. Compensation and Payouts (6.1-6.9 including Session Funding Unit, Activation Threshold, Net Cleared Donations, Division Winner Bonus, Milestone Rewards, Permanent Ambassador Status, Payment Processing, Taxes)
7. Content License, Name, Image, and Publicity Rights (7.1-7.2)
8. Brand Use and Conduct (8.1-8.2)
9. Removal, Disqualification, and Termination (9.1-9.3)
10. Independent Relationship
11. Representations and Compliance
12. Limitation of Expectations and No Guarantees
13. Confidentiality and Internal Information
14. Limitation of Liability
15. Governing Law and Dispute Handling
16. General Terms

**Specific changes:**

- The `<h3>` heading changes from "Official Rules -- Creator Challenge: Sponsor a Veteran" to "ValorWell Ambassador Challenge - Ambassador Participation Agreement"
- The scrollable container keeps the same styling (`max-h-[40vh] overflow-y-auto rounded-md border p-4`)
- Each section rendered with bold headings and properly formatted lists (bulleted where the PDF uses bullets, numbered where appropriate)
- The checkbox label updates from "I have read and agree to the Official Rules and Prize Terms" to "I have read and agree to the Ambassador Participation Agreement"
- The step title in `STEP_TITLES` changes from "Official Rules / Prize Terms" to "Participation Agreement"
- The Zod error message for `acceptedRules` updates from "You must accept the official rules to continue" to "You must accept the participation agreement to continue"

### No other files change

The agreement is self-contained within the form component. No database schema changes needed -- the `accepted_rules` boolean column still works the same way.

