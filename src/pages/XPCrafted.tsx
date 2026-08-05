import { useMemo, useState } from "react";
import {
  ArrowRight,
  Gamepad2,
  HeartHandshake,
  Minus,
  Paintbrush2,
  PawPrint,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SEO } from "@/components/SEO";

const venmoUrl = (
  import.meta.env.VITE_XP_CRAFTED_VENMO_URL as string | undefined
)?.trim();

const facebookUrl = (
  import.meta.env.VITE_XP_CRAFTED_FACEBOOK_URL as string | undefined
)?.trim();

const PAWS_4_AUTISM_URL = "https://www.pawsablelife.org/";

export default function XPCrafted() {
  const [quantity, setQuantity] = useState(1);
  const total = useMemo(() => quantity, [quantity]);

  const decreaseQuantity = () => setQuantity((current) => Math.max(1, current - 1));
  const increaseQuantity = () => setQuantity((current) => Math.min(25, current + 1));

  return (
    <>
      <SEO
        title="XP Crafted | Kid-Made Gamer Art With a Purpose"
        description="Hand-drawn gamer-inspired art created by a 10-year-old artist. Each drawing is $1, and 10% of all proceeds go to Paws 4 Autism."
        canonical="/"
      />

      <div className="xp-site min-h-screen overflow-hidden bg-[#fffaf0] text-[#171717]">
        <style>{`
          .xp-site {
            --xp-green: #35c93f;
            --xp-yellow: #ffbf24;
            --xp-blue: #28a8ef;
            --xp-red: #ef3f49;
            --xp-purple: #8f56d9;
            --xp-ink: #171717;
            font-family: "Trebuchet MS", "Arial Rounded MT Bold", Arial, sans-serif;
            background-image:
              radial-gradient(circle at 8% 12%, rgba(40, 168, 239, 0.11) 0 4px, transparent 5px),
              radial-gradient(circle at 88% 18%, rgba(239, 63, 73, 0.10) 0 4px, transparent 5px),
              radial-gradient(circle at 18% 74%, rgba(53, 201, 63, 0.10) 0 4px, transparent 5px),
              radial-gradient(circle at 82% 80%, rgba(143, 86, 217, 0.10) 0 4px, transparent 5px);
            background-size: 90px 90px, 110px 110px, 120px 120px, 100px 100px;
          }

          .xp-site h1,
          .xp-site h2,
          .xp-site h3 {
            font-family: "Trebuchet MS", "Arial Rounded MT Bold", Arial, sans-serif;
            letter-spacing: -0.035em;
          }

          .xp-sticker {
            box-shadow: 8px 8px 0 var(--xp-ink);
          }

          .xp-card {
            box-shadow: 5px 5px 0 rgba(23, 23, 23, 0.95);
          }

          .xp-doodle {
            position: absolute;
            pointer-events: none;
            opacity: 0.8;
          }

          @media (prefers-reduced-motion: no-preference) {
            .xp-float {
              animation: xpFloat 5s ease-in-out infinite;
            }

            .xp-float-delayed {
              animation: xpFloat 6s ease-in-out 1s infinite;
            }

            @keyframes xpFloat {
              0%, 100% { transform: translateY(0) rotate(-2deg); }
              50% { transform: translateY(-10px) rotate(2deg); }
            }
          }
        `}</style>

        <header className="relative border-b-4 border-black bg-white/90">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <a href="#top" className="flex items-center gap-3" aria-label="XP Crafted home">
              <img
                src="/xpcrafted/logo.svg"
                alt="XP Crafted"
                className="h-14 w-14 sm:h-16 sm:w-16"
              />
              <div>
                <p className="text-xl font-black leading-none sm:text-2xl">XP Crafted</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">
                  Kid-made gamer art
                </p>
              </div>
            </a>

            <a
              href="#pay"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-black bg-[#ffbf24] px-4 py-2 text-sm font-black transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#28a8ef]/40"
            >
              Get a drawing
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </header>

        <main id="top">
          <section className="relative isolate overflow-hidden">
            <Sparkles
              className="xp-doodle xp-float left-[4%] top-20 h-12 w-12 text-[#8f56d9]"
              aria-hidden="true"
            />
            <Gamepad2
              className="xp-doodle xp-float-delayed right-[5%] top-28 h-16 w-16 text-[#28a8ef]"
              aria-hidden="true"
            />

            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex rotate-[-1deg] items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-black">
                  <Paintbrush2 className="h-4 w-4 text-[#ef3f49]" aria-hidden="true" />
                  Made with markers, colored pencils, and imagination
                </div>

                <h1 className="mt-7 text-5xl font-black leading-[0.94] sm:text-6xl md:text-7xl">
                  Gamer art made by a kid
                  <span className="block text-[#35a83d]">with a big purpose.</span>
                </h1>

                <p className="mt-7 max-w-2xl text-lg font-semibold leading-relaxed text-slate-700 sm:text-xl">
                  XP Crafted is a family-supervised art project created by a
                  10-year-old gamer who is building confidence, practicing his
                  creativity, and using what he makes to help people in his community.
                </p>

                <div className="mt-9 flex flex-wrap gap-4">
                  <a
                    href="#pay"
                    className="xp-sticker inline-flex min-h-12 items-center gap-2 rounded-xl border-4 border-black bg-[#35c93f] px-6 py-3 text-base font-black transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#28a8ef]/40"
                  >
                    Pick a drawing for $1
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </a>

                  <a
                    href="#mission"
                    className="inline-flex min-h-12 items-center gap-2 rounded-xl border-4 border-black bg-white px-6 py-3 text-base font-black transition-colors hover:bg-[#fff1b8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#28a8ef]/40"
                  >
                    See the mission
                  </a>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-lg">
                <div className="absolute -inset-5 rotate-3 rounded-[2rem] border-4 border-black bg-[#28a8ef]" aria-hidden="true" />
                <div className="relative -rotate-1 rounded-[2rem] border-4 border-black bg-white p-5 shadow-2xl sm:p-7">
                  <img
                    src="/xpcrafted/logo.svg"
                    alt="Round XP Crafted logo"
                    className="mx-auto aspect-square w-full max-w-md"
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="mission" className="border-y-4 border-black bg-[#222] text-white">
            <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="mx-auto flex h-40 w-40 rotate-[-4deg] items-center justify-center rounded-[2rem] border-4 border-white bg-[#ffbf24] text-black shadow-[8px_8px_0_#28a8ef]">
                <div className="text-center">
                  <span className="block text-6xl font-black leading-none">10%</span>
                  <span className="mt-2 block text-sm font-black uppercase tracking-wider">
                    of all proceeds
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 text-[#ffbf24]">
                  <PawPrint className="h-7 w-7" aria-hidden="true" />
                  <p className="text-sm font-black uppercase tracking-[0.18em]">
                    Art that helps
                  </p>
                </div>
                <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                  Every drawing supports Paws 4 Autism.
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-200">
                  Ten percent of every XP Crafted purchase is donated to Paws 4 Autism,
                  helping support autistic individuals and families through service-dog
                  and community-focused programs.
                </p>
                <a
                  href={PAWS_4_AUTISM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 font-black text-[#ffbf24] underline decoration-2 underline-offset-4 hover:text-white"
                >
                  Learn about Paws 4 Autism
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          <section className="bg-[#fffaf0]">
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
              <div className="text-center">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8f56d9]">
                  Simple, handmade, and one of a kind
                </p>
                <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                  What makes XP Crafted special?
                </h2>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {[
                  {
                    icon: Paintbrush2,
                    title: "Made by hand",
                    copy: "Each piece is drawn with markers and colored pencils—not generated, printed, or mass-produced.",
                    color: "bg-[#ffcf4d]",
                  },
                  {
                    icon: Gamepad2,
                    title: "Inspired by games",
                    copy: "The drawings are inspired by the blocky worlds, characters, and adventures he enjoys.",
                    color: "bg-[#6dd3ff]",
                  },
                  {
                    icon: HeartHandshake,
                    title: "Built to do good",
                    copy: "Every sale helps a young artist grow his confidence while supporting autism in the community.",
                    color: "bg-[#7ee787]",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className={`xp-card rounded-2xl border-4 border-black p-6 ${item.color}`}
                  >
                    <item.icon className="h-9 w-9" aria-hidden="true" />
                    <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                    <p className="mt-3 font-semibold leading-relaxed text-slate-800">
                      {item.copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="pay" className="border-y-4 border-black bg-[#8f56d9]">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div className="text-white">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#fff1a8]">
                  Support the artist
                </p>
                <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
                  Choose a drawing. Pay $1. Help him level up.
                </h2>
                <p className="mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-white/90">
                  Confirm that the artwork you want is available, choose how many
                  drawings you are buying, and send the matching amount through the
                  XP Crafted Venmo business profile.
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border-4 border-black bg-white text-black hover:bg-[#fff1a8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                    aria-label="Decrease drawing quantity"
                  >
                    <Minus className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <div className="min-w-36 rounded-xl border-4 border-black bg-[#ffbf24] px-5 py-3 text-center text-black">
                    <span className="block text-3xl font-black">{quantity}</span>
                    <span className="block text-xs font-black uppercase tracking-wider">
                      {quantity === 1 ? "drawing" : "drawings"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border-4 border-black bg-white text-black hover:bg-[#fff1a8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                    aria-label="Increase drawing quantity"
                  >
                    <Plus className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="xp-card rounded-3xl border-4 border-black bg-white p-6 sm:p-8">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                  Total
                </p>
                <p className="mt-1 text-6xl font-black text-[#ef3f49]">${total}</p>
                <p className="mt-3 font-semibold leading-relaxed text-slate-700">
                  Add your name and the drawing you selected in the Venmo payment note.
                </p>

                {venmoUrl ? (
                  <a
                    href={venmoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border-4 border-black bg-[#35c93f] px-5 py-3 text-lg font-black transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#28a8ef]/40"
                  >
                    Pay XP Crafted with Venmo
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </a>
                ) : (
                  <div className="mt-7 rounded-xl border-4 border-dashed border-black bg-[#fff1b8] p-5">
                    <p className="font-black">Online payment link is being connected.</p>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
                      The page is ready; the XP Crafted Venmo business-profile link is
                      the final item needed to activate online checkout.
                    </p>
                  </div>
                )}

                {facebookUrl && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl border-4 border-black bg-[#28a8ef] px-5 py-3 font-black hover:bg-[#68c9ff] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#28a8ef]/40"
                  >
                    Confirm artwork on Facebook
                  </a>
                )}

                <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-100 p-4 text-sm text-slate-700">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#35a83d]" aria-hidden="true" />
                  <p>
                    XP Crafted is managed and supervised by a parent. No child contact
                    information is collected or displayed on this website.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white">
            <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:px-8">
              <PawPrint className="mx-auto h-10 w-10 text-[#28a8ef]" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                Small drawings can still make a real difference.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-relaxed text-slate-700">
                Buying one gives a young artist another reason to keep creating—and
                helps support autism-focused work in the Kansas City community.
              </p>
            </div>
          </section>
        </main>

        <footer className="border-t-4 border-black bg-[#171717] text-white">
          <div className="mx-auto max-w-6xl px-5 py-8 text-center sm:px-8">
            <p className="font-black">XP Crafted</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              A family-supervised child art project. 10% of all proceeds go to
              Paws 4 Autism.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Gamer-inspired artwork is original fan art. XP Crafted is not affiliated
              with or endorsed by Minecraft, Mojang, Microsoft, or other game publishers.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
