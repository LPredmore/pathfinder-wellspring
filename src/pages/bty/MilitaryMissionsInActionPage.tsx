import { BtyOrganizationHighlight } from "@/components/bty/BtyOrganizationHighlight";

export default function MilitaryMissionsInActionPage() {
  return (
    <BtyOrganizationHighlight
      name="Military Missions in Action"
      routePath="/mmia"
      summary="Military Missions in Action is a North Carolina-focused veteran nonprofit that helps veterans, service members, and military families solve practical barriers to housing stability, accessibility, and everyday independence."
      description="Military Missions in Action focuses on concrete needs that can keep a veteran or military family from moving forward. Its programs provide household furnishings, accessibility modifications, essential supplies, holiday support, and transportation so that people are not left without basic tools simply because a gap in support exists."
      highlights={[
        {
          title: "Home For Healing",
          body: "MMIA provides new and gently used household furnishings and essential goods to veterans, active-duty service members, and military families working to establish stable housing.",
        },
        {
          title: "Operation Building Hope",
          body: "The organization builds handicap ramps and rails for veterans who need safer, more accessible ways to enter and move around their homes.",
        },
        {
          title: "Fill The Footlocker",
          body: "MMIA distributes health, hygiene, and other essential items to unhoused veterans and also supports military and veteran families through its holiday-gift program for children.",
        },
        {
          title: "Warrior Wagon",
          body: "Its no-cost, handicap-accessible transportation program helps veterans reach essential appointments and opportunities when reliable transportation would otherwise be a barrier.",
        },
      ]}
      videoUrl="https://www.youtube.com/watch?v=19JpCgF-d9Q&list=PLnEJh6R3w5IbykCvTZJtD1IgWY8XRjP0Q&index=2"
      videoEmbedUrl="https://www.youtube-nocookie.com/embed/19JpCgF-d9Q?rel=0"
      links={[
        { label: "Website", url: "https://www.militarymissionsinaction.org/" },
        { label: "YouTube", url: "https://www.youtube.com/channel/UCEJdMO3nmmy6hdJlZ-oE2Zg" },
        { label: "Facebook", url: "https://www.facebook.com/MilitaryMissionsInAction/" },
        { label: "Instagram", url: "https://www.instagram.com/mmia27526/" },
      ]}
    />
  );
}
