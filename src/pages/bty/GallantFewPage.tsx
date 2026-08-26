import { BtyOrganizationHighlight } from "@/components/bty/BtyOrganizationHighlight";

export default function GallantFewPage() {
  return (
    <BtyOrganizationHighlight
      name="GallantFew"
      routePath="/gallantfew"
      summary="GallantFew is an Army Ranger-led nonprofit helping veterans and their families remove barriers to care and build lives of hope and purpose after military service."
      description="Founded in 2010, GallantFew supports veterans through a practical model built around connection, coaching, and counseling. Its work is designed to help veterans strengthen the personal, relational, and professional parts of life that can become difficult during and after transition from military service."
      highlights={[
        {
          title: "Connection",
          body: "GallantFew creates opportunities for veterans to build community through events, peer relationships, and veteran-centered spaces that reduce isolation and make support easier to access.",
        },
        {
          title: "Coaching",
          body: "Its coaching model helps veterans assess where they are, identify areas that need attention, and make deliberate progress across emotional, physical, spiritual, social, and professional life.",
        },
        {
          title: "Counseling",
          body: "GallantFew provides veteran-centered clinical counseling in select locations and helps connect veterans with professionals who understand military culture and transition-related challenges.",
        },
      ]}
      videoUrl="https://www.youtube.com/watch?v=zsaTKjNVeew&list=PLnEJh6R3w5IbykCvTZJtD1IgWY8XRjP0Q&index=6"
      videoEmbedUrl="https://www.youtube-nocookie.com/embed/zsaTKjNVeew?rel=0"
      links={[
        { label: "YouTube", url: "https://www.youtube.com/user/GallantFewInc" },
        { label: "Facebook", url: "https://www.facebook.com/gallantfew/" },
      ]}
    />
  );
}
