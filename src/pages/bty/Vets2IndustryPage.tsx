import { BtyOrganizationHighlight } from "@/components/bty/BtyOrganizationHighlight";

export default function Vets2IndustryPage() {
  return (
    <BtyOrganizationHighlight
      name="VETS2INDUSTRY"
      routePath="/vets2industry"
      summary="VETS2INDUSTRY connects service members, veterans, military spouses, and families with free resources, career tools, professional networks, and opportunities."
      description="VETS2INDUSTRY was built around a simple problem: useful resources and opportunities already exist, but military-connected people often do not know where to find them or who to talk to. The organization brings those resources together while creating direct connections among veterans, military spouses, mentors, recruiters, employers, and community partners."
      highlights={[
        {
          title: "Free Resource Library",
          body: "VETS2INDUSTRY organizes military and veteran resources into a free, living library designed to make benefits, services, organizations, and support easier to discover.",
        },
        {
          title: "Career Education",
          body: "The organization offers free career-focused webinars and tools that help transitioning service members, veterans, and military spouses prepare for civilian employment.",
        },
        {
          title: "Networking & Opportunity",
          body: "Virtual networking events bring military-connected job seekers together with recruiters, employers, mentors, professionals, and other people who can help turn a transition into a real opportunity.",
        },
      ]}
      videoUrl="https://www.youtube.com/watch?v=iVDPZL_PEWo&list=PLnEJh6R3w5IbykCvTZJtD1IgWY8XRjP0Q&index=4"
      videoEmbedUrl="https://www.youtube-nocookie.com/embed/iVDPZL_PEWo?rel=0"
      links={[
        { label: "Facebook", url: "https://www.facebook.com/vets2industryfoundation" },
        { label: "LinkedIn", url: "https://www.linkedin.com/company/vets2industry/" },
        { label: "YouTube", url: "https://www.youtube.com/channel/UCXW-UubhcMZUMmiQK6BfuBw" },
        { label: "Instagram", url: "https://www.instagram.com/vets2industry" },
      ]}
    />
  );
}
