import { AuthorityPage } from "@/components/authority/AuthorityPage";

export default function FamilySystems() {
  return (
    <AuthorityPage
      title="Family Systems Support | Systems Over Reactions"
      description="ValorWell teaches families how to build better systems for communication, emotional regulation, conflict, parenting, and decision-making."
      canonical="/family-systems"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Family Systems", url: "/family-systems" },
      ]}
      eyebrow="Family Systems"
      h1="Families do better with systems, not constant reactions."
      subhead="ValorWell teaches families how to move from reacting to each situation individually toward building shared systems for thinking, communicating, and solving problems."
      heroCTAs={[{ label: "Explore Family Support", to: "/military-family-therapy" }]}
      sections={[
        {
          heading: "The problem with reactive parenting and family conflict",
          body: "Families often try to solve each situation separately. That leads to inconsistency, emotional reasoning, power struggles, and unclear expectations. Everyone ends up exhausted, and nothing actually gets settled.",
        },
        {
          heading: "The systems approach",
          body: "Instead of only telling people what to think, families can teach how to think. A shared framework lowers the temperature on day-to-day decisions.",
          bullets: [
            "What principle applies here?",
            "How would this feel from the other side?",
            "What rule would be fair if everyone followed it?",
            "What outcome does this actually create?",
            "What system should we use next time this comes up?",
          ],
        },
        {
          heading: "Practical family systems",
          cards: [
            { title: "Communication systems" },
            { title: "Conflict repair systems" },
            { title: "Emotional regulation systems" },
            { title: "Screen-time systems" },
            { title: "Responsibility systems" },
            { title: "Family meeting systems" },
            { title: "Decision-making systems" },
            { title: "Accountability systems" },
          ],
        },
        {
          heading: "Consistency at home",
          body: "Families build trust when expectations are fair, repeatable, and not rewritten in the heat of the moment. If a rule only applies when it benefits one person, it is not really a rule.",
        },
        {
          heading: "BestSelfs supports family growth",
          body: "BestSelfs tools support emotional skills and habit-building across ages. They aren't a replacement for therapy, but they give families shared language and shared practice between sessions.",
        },
      ]}
      faqs={[
        {
          question: "What is a family systems approach?",
          answer:
            "Instead of treating each situation in isolation, a systems approach builds shared rules, frameworks, and habits that the whole family can use again and again.",
        },
        {
          question: "How is this different from just giving kids rules?",
          answer:
            "Rules tell kids what to do. Systems teach them how to think about new situations. Both matter, but systems travel.",
        },
        {
          question: "Can this help with teen conflict?",
          answer:
            "Yes. Teens often respond better to fair, consistent systems than to one-off decisions that feel arbitrary.",
        },
        {
          question: "How does emotional reasoning affect families?",
          answer:
            "When decisions are made entirely from how someone feels in the moment, consistency disappears. That breeds resentment and confusion.",
        },
        {
          question: "Is this therapy?",
          answer:
            "No. This is an educational framework. For clinical needs, see Military Family Therapy or Get Care.",
        },
        {
          question: "How can BestSelfs support family systems?",
          answer:
            "BestSelfs tools give families shared exercises and habits to practice the systems they're trying to build.",
        },
      ]}
      related={[
        { name: "Military Family Therapy", href: "/military-family-therapy" },
        { name: "BestSelfs", href: "/bestselfs" },
        { name: "Resources", href: "/resources" },
      ]}
      finalCTAs={[
        { label: "Get Family Support", to: "/get-care" },
        { label: "Explore BestSelfs", to: "/bestselfs", variant: "secondary" },
      ]}
    />
  );
}
