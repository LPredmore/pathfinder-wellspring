

## Plan: Add Bridge Program FAQs to /beyondtheyellow Page

Add 20 new FAQ items to the existing `faqItems` array in `src/pages/Competitions.tsx`. The FAQs cover the ValorWell Bridge Program details including what it is, how donations work, therapist qualifications, VA system navigation, and campaign mechanics.

### Implementation

**File: `src/pages/Competitions.tsx`**

Append the following 20 FAQ entries to the existing `faqItems` array (after the current 8 items):

1. What is this campaign for?
2. What is the Bridge Program?
3. Why is this needed if the VA already provides mental health care?
4. How long are veterans typically in the Bridge Program?
5. Does ValorWell provide therapy indefinitely?
6. What does a $75 donation pay for?
7. Does ValorWell keep any of the donated money?
8. How does ValorWell operate if it keeps $0 from these donations?
9. Are the therapists licensed professionals?
10. How does ValorWell help veterans access VA care faster?
11. What happens when a veteran is able to receive VA care?
12. Do influencers need to explain the VA Community Care system?
13. Who can receive support through the Bridge Program?
14. Is the Bridge Program only for emergency mental health situations?
15. Is therapy the only support provided?
16. What is Zeffy and how does the campaign link work?
17. Do donors receive a receipt for their donation?
18. Can donors fund multiple therapy sessions?
19. What is the long-term goal for the Bridge Program?

Each answer will preserve the full detail provided, with multi-paragraph answers joined using `\n\n` line breaks or rendered as a single string. The existing FAQ section component and schema will automatically pick up the new items.

