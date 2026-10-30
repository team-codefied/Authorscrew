import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutTabs, type Tab } from "@/components/AboutTabs";
import { LeadForm } from "@/components/LeadForm";
import { QuoteButton } from "@/components/PopupProvider";
import { PageHero } from "@/components/Decor";
import { IMG } from "@/lib/img";
import { Container, LinkButton, SectionHeading, buttonClass } from "@/components/ui";
import { platforms } from "@/content/home";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Authors Crew is a full-service publishing partner helping writers, entrepreneurs and professionals turn their ideas into professionally crafted books.",
  alternates: { canonical: "/about-us" },
};

const tabs: Tab[] = [
  {
    label: "Our Journey",
    title: "Origin and Evolution",
    paragraphs: [
      "AuthorsCrew was built on the idea that every story deserves professional support.",
      "Over the years, we expanded from offering editorial assistance into a complete professional ghostwriting company capable of supporting authors from concept development to publication and beyond.",
      "As publishing continued to evolve, so did we. We embraced new technologies, expanded our service offerings, and invested in modern strategies that help authors succeed in today’s competitive market.",
      "What has not changed is our commitment to delivering exceptional work and helping authors achieve their goals.",
    ],
  },
  {
    label: "Our Vision",
    title: "Authors Crew Vision",
    paragraphs: [
      "Our mission is simple: empowering aspiring authors to share their knowledge, experiences, and stories with the world.",
      "We believe great ideas should never remain unfinished because of a lack of guidance, resources, or publishing expertise. Through personalized support and professional services, we help authors transform their vision into a published reality.",
    ],
  },
  {
    label: "Our Commitment",
    title: "Mission of the Company",
    paragraphs: [
      "At Authors Crew, our mission is to provide end to end publishing solutions that make the publishing process clear, accessible, and rewarding.",
      "From the first conversation to the final launch, we focus on delivering quality, transparency, and results. Every project is approached with the same goal: helping authors create a book they are proud to put their name on.",
    ],
  },
];

const whatWeDo = [
  { label: "Ghostwriting and manuscript development", href: "/ghostwriting-services" },
  { label: "Editing and proofreading", href: "/book-editing-services" },
  { label: "Book formatting and design", href: "/book-editing-services" },
  { label: "Print and ebook publishing", href: "/book-publishing-services" },
  { label: "Book cover designs", href: "/book-cover-design" },
  { label: "Author branding & Book Marketing", href: "/book-marketing-services" },
];

const values = [
  { h: "Authors First", t: "Every decision AuthorsCrew makes begins with one question: What is best for the author?" },
  { h: "Excellence", t: "We hold ourselves to high standards because your book deserves nothing less. Our focus is on quality and results." },
  { h: "Integrity", t: "We believe in honest communication, transparent processes, and delivering on our promises." },
  { h: "Collaboration", t: "The best books are built through partnership. We work alongside our clients, not just for them." },
  { h: "Innovation", t: "Publishing continues to evolve, and we continually adapt to help authors stay ahead." },
  { h: "Long-Term Success", t: "Our goal is not simply to help you publish a book. It is to help you build an author platform that continues to grow." },
];

const check = (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="mt-1 shrink-0 text-teal">
    <path d="m3 9.5 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function AboutUs() {
  return (
    <>
      <PageHero
        title="About Us"
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        eyebrow="Who we are"
        intro="A full-service publishing partner for writers, entrepreneurs and professionals."
        visual={IMG.team}
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <QuoteButton className={buttonClass("amber")}>Get A Quote</QuoteButton>
          <LinkButton href={SITE.phoneHref} variant="outline">Schedule a Call</LinkButton>
        </div>
      </PageHero>

      <section className="py-12">
        <Container>
          <h2 className="mb-8 text-center font-serif text-2xl font-medium text-navy sm:text-3xl">Trusted by Leading Authors &amp; Creators</h2>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {platforms.logos.map((l) => (
              <li key={l.name}>
                <Image src={l.src} alt={l.name} width={140} height={50} className="h-9 w-auto object-contain opacity-80 grayscale" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-14 sm:py-18">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl">We Build Authors, Not Just Books.</h2>
            <div className="mt-6 grid gap-4 text-lg leading-relaxed text-slate-600">
              <p>
                A great book starts with an author who has a story worth sharing. At <Link href="/" className="font-semibold text-teal-dark hover:underline">AuthorsCrew</Link>, we help writers, entrepreneurs, and professionals turn their ideas into professionally crafted books that make a lasting impact.
              </p>
              <p>
                Whether you have a rough draft or a completed manuscript, our experienced team is here to guide you through every stage of the publishing journey. We help transform books into powerful author brands and long-term success.
              </p>
            </div>
            <div className="mt-7"><QuoteButton className={buttonClass("amber")}>Get Started Today</QuoteButton></div>
          </div>
          <Image src="/images/abt-img-01.webp" alt="The Authors Crew team working with authors" width={640} height={520} className="h-auto w-full rounded-2xl object-cover" />
        </Container>
      </section>

      <section className="bg-mist py-14 sm:py-18">
        <Container>
          <SectionHeading title="Our Journey" />
          <div className="mx-auto mb-10 grid max-w-3xl gap-4 text-lg leading-relaxed text-slate-600">
            <p>AuthorsCrew started with a simple observation: too many talented writers were struggling to navigate the publishing world alone.</p>
            <p>The publishing industry can be overwhelming. Finding the right writer, editor, designer, publisher, and marketing team often means dealing with multiple vendors, inconsistent quality, and unnecessary delays.</p>
            <p>We believed there had to be a better way.</p>
            <p>What began as a small team passionate about helping authors share their stories has evolved into a full-service publishing partner serving clients across a wide range of genres and industries. Today, we work with first-time authors, business leaders, coaches, professionals, and established writers who trust us to bring their vision to life.</p>
          </div>
          <div className="text-center"><LinkButton href="/contact-us">Start Your Author Journey</LinkButton></div>
        </Container>
      </section>

      <section className="py-14 sm:py-18">
        <Container>
          <SectionHeading
            title="The Passionate Minds Behind Every Author’s Success"
            intro="Behind every successful author is a dedicated team committed to bringing great stories to life. Our talented writers, editors, designers, and publishing specialists work together to transform ideas into professionally crafted books, providing personalized support, creative expertise, and guidance at every stage of the publishing journey. We are passionate about helping authors achieve their goals and connect with readers worldwide."
          />
          <AboutTabs tabs={tabs} onCta={<LinkButton href="/contact-us">Start Your Author Journey</LinkButton>} />
        </Container>
      </section>

      <section className="bg-mist py-14 sm:py-18">
        <Container className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl">What We Do</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">Creating a successful book takes more than writing alone.</p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">Our team includes experienced writers, expert book editors, designers, strategists, and professional publishing specialists who collaborate to ensure every project receives the attention it deserves.</p>
            <p className="mt-4 text-lg font-semibold text-navy">Our services include:</p>
            <ul className="mt-3 grid gap-3">
              {whatWeDo.map((w) => (
                <li key={w.label} className="flex gap-3">
                  {check}
                  <Link href={w.href} className="text-slate-700 hover:text-teal-dark hover:underline">{w.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-7"><QuoteButton className={buttonClass("amber")}>Get Started Today</QuoteButton></div>
          </div>
          <div className="grid gap-8">
            <div>
              <h2 className="font-serif text-2xl font-medium text-navy sm:text-3xl">Publishing for a Digital World</h2>
              <p className="mt-4 leading-relaxed text-slate-600">Readers consume content differently than ever before, and authors need publishing solutions that keep pace.</p>
              <p className="mt-3 leading-relaxed text-slate-600">That is why we offer modern digital publishing solutions designed to maximize reach, accessibility, and reader engagement. From ebooks to global distribution channels, we help ensure your work is available wherever your audience prefers to read.</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-medium text-navy sm:text-3xl">Helping Authors Get Discovered</h2>
              <p className="mt-4 leading-relaxed text-slate-600">Publishing a book is only one part of the journey. Reaching readers is what turns a published book into a successful one.</p>
              <p className="mt-3 leading-relaxed text-slate-600">Our approach to digital marketing for authors focuses on helping writers build visibility, establish authority, and connect with the audiences that matter most. Through strategic promotion and personalized marketing support, we help authors continue growing long after their book is released.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-18">
        <Container className="max-w-3xl text-center">
          <h2 className="font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl">More Than a Publishing Company</h2>
          <div className="mt-6 grid gap-3 text-lg leading-relaxed text-slate-600">
            <p>At AuthorsCrew, we do not measure success by the number of books we publish.</p>
            <p>We measure it by the authors we help launch, the stories we help share, and the goals our clients achieve along the way.</p>
            <p>Because in the end, we are not just creating books.</p>
            <p className="font-serif text-2xl font-medium text-teal-dark">We are building authors.</p>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-14 sm:py-18">
        <Container>
          <SectionHeading title="Core Values" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <li key={v.h} className="rounded-2xl border-t-4 border-teal bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-navy">{v.h}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{v.t}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-navy py-16 text-white sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl leading-tight font-medium sm:text-4xl">Your Story Deserves More Than an Idea</h2>
            <p className="mt-4 text-lg text-white/90">You already have the idea. Now it’s time to turn it into something real, something that represents you, reaches readers, and stands the test of time.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-ink sm:p-8">
            <LeadForm variant="contact" submitLabel="Submit" />
          </div>
        </Container>
      </section>
    </>
  );
}
