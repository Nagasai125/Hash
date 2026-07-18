const collections = [
  {
    name: "Vapes",
    eyebrow: "Devices & flavor",
    description:
      "Disposable favorites, refillable systems, coils, pods, e-liquids, and the newest arrivals.",
    image: "/images/vape.jpg",
    alt: "A real black vape device surrounded by vapor",
    className: "collection collection--wide",
  },
  {
    name: "Premium cigars",
    eyebrow: "Humidor selection",
    description:
      "Everyday smokes and special-occasion sticks, kept ready in our in-store humidor.",
    image: "/images/cigars.jpg",
    alt: "A real premium cigar resting on a wooden humidor",
    className: "collection",
  },
  {
    name: "Glass & hookah",
    eyebrow: "Statement pieces",
    description:
      "Glassware, hookahs, bowls, hoses, charcoal, and the accessories that complete the setup.",
    image: "/images/hookah.jpg",
    alt: "A real illuminated glass hookah in a lounge",
    className: "collection",
  },
  {
    name: "Daily essentials",
    eyebrow: "Everything else",
    description:
      "Papers, wraps, trays, grinders, lighters, storage, cleaning supplies, and more.",
    image: "/images/glass.jpg",
    alt: "A real hookah and accessories on a wooden table",
    className: "collection collection--wide",
  },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function HeaderLogo() {
  return (
    <span className="header-logo" aria-label="# Smoke Shop">
      <img src={`${basePath}/man-logo-mark.svg`} alt="" />
    </span>
  );
}

function Wordmark() {
  return (
    <span className="logo" aria-label="# Smoke Shop">
      <span className="logo__mark">#</span>
      <span className="logo__type">SMOKE SHOP</span>
    </span>
  );
}

export default function Home() {
  return (
    <main>
      <div className="site-intro" aria-hidden="true">
        <img src={`${basePath}/man-logo-mark.svg`} alt="" />
        <span>North Austin</span>
      </div>
      <div className="age-note">21+ • Please enjoy responsibly</div>

      <header className="nav shell">
        <a className="nav__brand" href="#top" aria-label="# Smoke Shop home">
          <HeaderLogo />
        </a>
        <nav aria-label="Main navigation">
          <a href="#story">Our story</a>
          <a href="#catalog">Catalog</a>
          <a href="#visit">Visit</a>
          <a className="nav__call" href="tel:+15125687868">
            Call us
          </a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <img
          src={`${basePath}/images/vape.jpg`}
          alt="Real vape device with natural vapor rising behind it"
          fetchPriority="high"
          className="hero__photo"
        />
        <div className="hero__shade" />
        <div className="hero__hash" aria-hidden="true">#</div>
        <div className="hero__content shell">
          <p className="kicker"><span>Austin</span> • North Lamar</p>
          <h1 id="hero-title">Find your<br />new ritual.</h1>
          <p className="hero__copy">
            Austin&apos;s neighborhood destination for vapes, premium cigars,
            glass, hookah, and everyday smoke essentials.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#catalog">
              Explore in-store
            </a>
            <a
              className="button button--glass"
              href="https://www.google.com/maps/dir/?api=1&destination=10014+N+Lamar+Blvd+Austin+TX+78753"
              target="_blank"
              rel="noreferrer"
            >
              Get directions
            </a>
          </div>
        </div>
        <p className="hero__scroll" aria-hidden="true">Scroll to discover</p>
      </section>

      <section className="intro shell" aria-labelledby="intro-title">
        <p className="section-label">The shop</p>
        <h2 id="intro-title">
          The selection you want.<br />The help you need.
        </h2>
        <p>
          Whether you know exactly what you&apos;re after or want to discover
          something new, stop in and talk to our team. Inventory changes often;
          call ahead when you&apos;re looking for a specific item.
        </p>
      </section>

      <section className="catalog shell" id="catalog" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div>
            <p className="section-label">In store now</p>
            <h2 id="catalog-title">The full lineup.</h2>
          </div>
          <a href="tel:+15125687868">Ask about availability ↗</a>
        </div>

        <div className="collection-grid">
          {collections.map((item, index) => (
            <article className={item.className} key={item.name}>
              <img
                src={`${basePath}${item.image}`}
                alt={item.alt}
                loading="lazy"
                className="collection__photo"
              />
              <div className="collection__veil" />
              <div className="collection__number">0{index + 1}</div>
              <div className="collection__copy">
                <p>{item.eyebrow}</p>
                <h3>{item.name}</h3>
                <span>{item.description}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="photo-note">
          Product photography is real and representative. Selection and brands vary in store.
        </p>
      </section>

      <section className="story shell" id="story" aria-labelledby="story-title">
        <p className="section-label">Our story</p>
        <div className="story__grid">
          <h2 id="story-title">More than a shop.<br />A familiar place.</h2>
          <div className="story__copy">
            <p>
              The best neighborhood shops become part of life&apos;s small rituals—a
              familiar face after a long day, an honest recommendation, a place
              where you never feel rushed or judged.
            </p>
            <p>
              That&apos;s the feeling behind # Smoke Shop. We&apos;re here to remember
              what you like, help you discover what&apos;s next, and make every visit
              feel easy. Because North Austin isn&apos;t just where we do business.
              It&apos;s the community we&apos;re proud to welcome through our door.
            </p>
            <span>Come in once. Feel at home every time.</span>
          </div>
        </div>
      </section>

      <section className="visit" id="visit" aria-labelledby="visit-title">
        <div className="visit__glow" aria-hidden="true">#</div>
        <div className="visit__content shell">
          <p className="section-label">Come through</p>
          <h2 id="visit-title">Right here<br />on North Lamar.</h2>
          <div className="visit__details">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=10014+N+Lamar+Blvd+Austin+TX+78753"
              target="_blank"
              rel="noreferrer"
            >
              <span>Address</span>
              10014 N Lamar Blvd<br />Austin, TX 78753 ↗
            </a>
            <a href="tel:+15125687868">
              <span>Phone</span>
              (512) 568-7868 ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <div className="footer__brand">
          <img src={`${basePath}/man-logo-mark.svg`} alt="" />
          <Wordmark />
        </div>
        <p>North Austin&apos;s smoke shop.</p>
        <p>For adults 21+ only.</p>
      </footer>
    </main>
  );
}
