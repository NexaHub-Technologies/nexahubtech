import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, useReveal } from "../components/site";

export const Route = createFileRoute("/")({ component: Home });

/* ── hero visual : the learn → build journey, rendered warmly ───── */

const AV = ["#6a2cad", "#f06ba8", "#8a5bbe", "#5a2494", "#b89ad8"];

function HeroStage() {
  return (
    <div className="hero-stage rise rise-3" aria-hidden="true">
      <div className="softblob s-marigold" />
      <div className="softblob s-teal" />

      <div className="jcard j-learn">
        <span className="jlabel" style={{ color: "var(--marigold-ink)" }}>
          <span className="jdot jdot-learn" />
          In the classroom
        </span>
        <p className="display text-[1.15rem] mt-2.5">
          How the browser actually thinks
        </p>
        <p className="text-[0.9rem] text-mute mt-1.5">
          Build the mental model first — the code comes easily after that.
        </p>
        <div className="progress mt-4">
          <span style={{ width: "72%" }} />
        </div>
        <p className="text-[0.78rem] text-mute mt-2">Module 3 of 5 · 72%</p>
      </div>

      <span
        className="loop-tag"
        style={{ top: "46%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        skills → service ↻
      </span>

      <div className="jcard j-build">
        <span className="jlabel" style={{ color: "var(--teal-deep)" }}>
          <span className="jdot jdot-build" />
          In production
        </span>
        <p className="display text-[1.15rem] mt-2.5">
          A real product, shipped for a real client
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="avatars">
            {AV.map((c) => (
              <i key={c} style={{ background: c }} />
            ))}
          </div>
          <span
            className="text-[0.8rem] font-semibold"
            style={{ color: "var(--teal-deep)" }}
          >
            ● live
          </span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="wrap pt-12 md:pt-16 pb-16">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <div>
          <span className="pill rise rise-1">
            <span className="spark" />A tech school + a software studio
          </span>
          <h1
            className="display rise rise-2 mt-6 text-[2.8rem] sm:text-[3.6rem] lg:text-[4.1rem]"
            style={{ textWrap: "balance" }}
          >
            Learn to build.
            <br />
            Then build{" "}
            <span style={{ color: "var(--marigold-ink)" }}>for real</span>.
          </h1>
          <p className="lead rise rise-3 mt-6 max-w-[34rem] text-[1.12rem]">
            NexaHubTech teaches people the skills to become developers — then
            puts those skills to work building real products for real clients.
            Learning that's tied to actual work, not theory.
          </p>
          <div className="rise rise-4 mt-8 flex flex-wrap gap-3">
            <Link to="/courses" className="btn btn-primary">
              Learn with us
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Work with us
            </Link>
          </div>
          <p className="rise rise-5 mt-7 text-[0.92rem] text-mute">
            Based in Nigeria · teaching and building for Africa and beyond.
          </p>
        </div>

        <HeroStage />
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <section className="wrap py-16">
      <div className="card reveal px-7 py-10 md:px-12 md:py-12 text-center">
        <span className="eyebrow is-plain text-mute justify-center">
          The idea
        </span>
        <p className="display mt-4 text-[1.7rem] sm:text-[2.2rem] max-w-[44rem] mx-auto leading-[1.25]">
          Most schools teach in a vacuum. We teach the skills{" "}
          <span style={{ color: "var(--marigold-ink)" }}>and</span> use them on
          live work — so what you learn is what the world actually pays for.
        </p>
        <p className="lead mt-5 max-w-[36rem] mx-auto">
          One company, two connected arms. The studio's real problems shape the
          lessons; the school grows the people who help build what comes next.
        </p>
      </div>
    </section>
  );
}

const LEARN_FEATS = [
  "Frontend foundations — HTML, CSS & JavaScript done properly",
  "Chunk-based teaching: the mental model first, then the syntax",
  "Structured session notes, exercise briefs & model answers",
  "Built to grow real engineering intuition — not copy-paste habits",
];
const BUILD_FEATS = [
  "Production software built for real businesses and founders",
  "Thoughtful, reliable products — designed before they’re built",
  "A studio that treats every project as a problem worth understanding",
  "Where our best learners get to work on the real thing",
];

function WhatWeDo() {
  return (
    <section className="wrap py-16">
      <div className="reveal max-w-[40rem] mb-10">
        <Eyebrow variant="plain">What we do</Eyebrow>
        <h2 className="display mt-4 text-[2.2rem] sm:text-[2.8rem]">
          Two arms, one mission.
        </h2>
        <p className="lead mt-4">
          Teaching people to build, and building real things — each one makes
          the other better.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card card-lift panel-learn reveal p-8">
          <Eyebrow>Learn · the school</Eyebrow>
          <h3 className="display mt-3 text-[1.7rem]">
            Become a developer, properly.
          </h3>
          <p className="lead mt-3">
            A frontend web development course — with fullstack on the horizon —
            for people who want to truly understand how things work.
          </p>
          <ul className="mt-5">
            {LEARN_FEATS.map((x) => (
              <li key={x} className="feat">
                <span className="mk mk-learn">✓</span>
                {x}
              </li>
            ))}
          </ul>
          <Link to="/courses" className="btn btn-primary mt-7">
            Explore the course
          </Link>
        </div>

        <div className="card card-lift panel-build reveal p-8">
          <Eyebrow variant="build">Build · the studio</Eyebrow>
          <h3 className="display mt-3 text-[1.7rem]">
            Get your product built right.
          </h3>
          <p className="lead mt-3">
            A software studio that builds production systems for clients — with
            the same care and rigor we teach in the classroom.
          </p>
          <ul className="mt-5">
            {BUILD_FEATS.map((x) => (
              <li key={x} className="feat">
                <span className="mk mk-build">✓</span>
                {x}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn-teal mt-7">
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}

const APPROACH = [
  {
    n: "1",
    t: "Understand",
    d: "We start with the idea, not the keyword. Before any syntax, you build a clear mental model of what’s really happening.",
  },
  {
    n: "2",
    t: "Practice",
    d: "Short, focused exercises with model answers. You try, compare, and adjust — until the concept genuinely clicks.",
  },
  {
    n: "3",
    t: "Build",
    d: "You apply it to something real. The strongest learners go on to build alongside the studio on actual client work.",
  },
];

function Approach() {
  return (
    <section className="wrap py-16">
      <div className="reveal max-w-[42rem] mb-10">
        <Eyebrow>Our approach</Eyebrow>
        <h2 className="display mt-4 text-[2.2rem] sm:text-[2.8rem]">
          Mental model first. Syntax second.
        </h2>
        <p className="lead mt-4">
          Most courses start with code and hope understanding catches up. We do
          it the other way around — and it’s why our learners actually get it.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {APPROACH.map((s, i) => (
          <div key={s.t} className="step-card reveal">
            <span
              className={`step-badge ${i === 2 ? "badge-build" : "badge-learn"}`}
            >
              {s.n}
            </span>
            <h3 className="display text-[1.3rem] mt-4">{s.t}</h3>
            <p className="lead mt-2 text-[0.97rem]">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const AUDIENCE = [
  {
    t: "Aspiring developers",
    d: "Whether you're just starting out or changing careers, we provide a clear path into web development with practical, hands-on learning from people who build software every day.",
  },
  {
    t: "Founders & businesses",
    d: "Need a reliable technology partner? We work closely with you to understand your goals and build software that supports your business as it grows.",
  },
  {
    t: "Our graduates",
    d: "Learning doesn't stop at graduation. We continue to support our alumni as they gain experience, work on real projects, and grow in their careers.",
  },
];

function Audience() {
  return (
    <section className="wrap py-16">
      <div className="reveal max-w-[40rem] mb-10">
        <Eyebrow variant="plain">Who it’s for</Eyebrow>
        <h2 className="display mt-4 text-[2.2rem] sm:text-[2.8rem]">
          Built for people who want to build.
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {AUDIENCE.map((a) => (
          <div key={a.t} className="card card-lift reveal p-7">
            <h3 className="display text-[1.25rem]">{a.t}</h3>
            <p className="lead mt-3 text-[0.97rem]">{a.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="wrap py-16">
      <div className="reveal grid md:grid-cols-2 gap-5">
        <div className="card card-lift panel-learn p-9">
          <Eyebrow>For learners</Eyebrow>
          <h3 className="display text-[1.8rem] mt-3">Start your journey.</h3>
          <p className="lead mt-3">
            Join the next cohort and learn to build — the right way, from people
            who do it every day.
          </p>
          <Link to="/courses" className="btn btn-primary mt-6">
            Explore the course
          </Link>
        </div>
        <div className="card card-lift panel-build p-9">
          <Eyebrow variant="build">For businesses</Eyebrow>
          <h3 className="display text-[1.8rem] mt-3">Build with us.</h3>
          <p className="lead mt-3">
            Tell us about the product you need. We’ll help you design and build
            it right.
          </p>
          <Link to="/contact" className="btn btn-teal mt-6">
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}

function Home() {
  useReveal();
  return (
    <>
      <Hero />
      <Thesis />
      <WhatWeDo />
      <Approach />
      <Audience />
      <ClosingCTA />
    </>
  );
}
