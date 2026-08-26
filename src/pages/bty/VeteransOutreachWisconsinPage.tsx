import { BtyOrganizationHighlight } from "@/components/bty/BtyOrganizationHighlight";

export default function VeteransOutreachWisconsinPage() {
  return (
    <BtyOrganizationHighlight
      name="Veterans Outreach of Wisconsin"
      routePath="/VOW"
      summary="Veterans Outreach of Wisconsin helps homeless and at-risk veteran households regain stability through housing, food, essential goods, and supportive programming."
      description="Based in Racine, Veterans Outreach of Wisconsin meets veterans at a point of vulnerability and works toward long-term stability rather than short-term relief alone. Its programs combine safe housing, practical necessities, community support, and individualized help aimed at moving veteran households toward self-sufficiency."
      highlights={[
        {
          title: "Veteran Village",
          body: "VOW operates a tiny-home village that gives homeless and at-risk veterans private, stable housing while they work toward permanent housing and greater independence.",
        },
        {
          title: "Veterans Marketplace",
          body: "Its marketplace provides veterans and eligible spouses access to groceries, personal-care items, and other everyday necessities that can relieve immediate household pressure.",
        },
        {
          title: "Support Beyond Shelter",
          body: "Residents and participants can receive trauma-informed programming, life-skills support, case management, and help navigating the transition toward stable permanent housing.",
        },
      ]}
      videoUrl="https://www.youtube.com/watch?v=hLvZfGcycOQ&list=PLnEJh6R3w5IbykCvTZJtD1IgWY8XRjP0Q&index=1"
      videoEmbedUrl="https://www.youtube-nocookie.com/embed/hLvZfGcycOQ?rel=0"
      links={[
        { label: "Website", url: "https://vowvillages.com/" },
        { label: "Facebook", url: "https://www.facebook.com/VOWNonProfit" },
      ]}
    />
  );
}
