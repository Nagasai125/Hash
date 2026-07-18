const collections = [
  {
    name: "Vapes",
    eyebrow: "Devices & flavor",
    description:
      "Dependable disposables, refillable pod systems, coils, pods, and e-liquids—without the guesswork.",
    image: "/images/vape.jpg",
    alt: "A real black vape device surrounded by vapor",
    className: "collection collection--wide",
  },
  {
    name: "Premium cigars",
    eyebrow: "Humidor selection",
    description:
      "Humidor-kept classics, everyday favorites, and special-occasion sticks ready when the moment is.",
    image: "/images/cigars.jpg",
    alt: "A real premium cigar resting on a wooden humidor",
    className: "collection",
  },
  {
    name: "Glass & hookah",
    eyebrow: "Statement pieces",
    description:
      "Functional glass, standout hookahs, bowls, hoses, charcoal, and the details that complete your setup.",
    image: "/images/hookah.jpg",
    alt: "A real illuminated glass hookah in a lounge",
    className: "collection",
  },
  {
    name: "Daily essentials",
    eyebrow: "Everything else",
    description:
      "Papers, wraps, trays, grinders, lighters, storage, and cleaning gear—the things you reach for most.",
    image: "/images/glass.jpg",
    alt: "A real hookah and accessories on a wooden table",
    className: "collection collection--wide",
  },
];

const promises = [
  {
    title: "A real answer.",
    copy: "Tell us what you like, what you don’t, and what you want to spend. We’ll help narrow it down.",
  },
  {
    title: "The right setup.",
    copy: "From the device to the small part people forget, we help make sure everything works together.",
  },
  {
    title: "Something new.",
    copy: "Fresh arrivals move through the shop often, so there’s always another flavor, piece, or favorite to find.",
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
        <div className="hero__smoke" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="hero__hash" aria-hidden="true">#</div>
        <div className="hero__content shell">
          <p className="kicker"><span>North Austin</span> • North Lamar • 21+</p>
          <h1 id="hero-title">Good taste.<br /><span>No guesswork.</span></h1>
          <p className="hero__copy">
            A sharper smoke shop experience—real guidance, fresh arrivals,
            and the right gear for however you unwind.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#catalog">
              See the selection
            </a>
            <a
              className="button button--glass"
              href="tel:+15125687868"
            >
              Call for stock
            </a>
          </div>
        </div>
        <p className="hero__scroll" aria-hidden="true">Scroll to discover</p>
      </section>

      <div className="category-rail" aria-hidden="true">
        <div>
          <span>Vapes</span><i>✦</i><span>Premium cigars</span><i>✦</i>
          <span>Glass</span><i>✦</i><span>Hookah</span><i>✦</i>
          <span>Daily essentials</span><i>✦</i><span>Vapes</span><i>✦</i>
          <span>Premium cigars</span><i>✦</i><span>Glass</span><i>✦</i>
          <span>Hookah</span><i>✦</i><span>Daily essentials</span><i>✦</i>
        </div>
      </div>

      <section className="intro shell" aria-labelledby="intro-title">
        <p className="section-label">Why #</p>
        <div className="intro__lead">
          <h2 id="intro-title">Walk in curious.<br />Leave certain.</h2>
          <p className="intro__copy">
            A big selection only matters when you can find what fits. We make
            the choices simpler, the conversation honest, and the visit worth it.
          </p>
        </div>
        <div className="promise-grid">
          {promises.map((promise, index) => (
            <article className="promise" key={promise.title}>
              <span>0{index + 1}</span>
              <h3>{promise.title}</h3>
              <p>{promise.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="catalog shell" id="catalog" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div>
            <p className="section-label">The selection</p>
            <h2 id="catalog-title">Your orbit,<br />fully stocked.</h2>
          </div>
          <a href="tel:+15125687868">Check today&apos;s stock ↗</a>
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
          <h2 id="story-title">Built for the regulars<br />we haven&apos;t met yet.</h2>
          <div className="story__copy">
            <p>
              A neighborhood shop earns its place one conversation at a time.
              By listening before recommending. By remembering the little things.
              By making a first visit feel like it won&apos;t be the last.
            </p>
            <p>
              That&apos;s what # Smoke Shop is here to be: a place with serious
              selection and zero attitude, where questions are welcome and every
              customer gets the time to choose well.
            </p>
            <span>No pressure. No pretense. Your place on North Lamar.</span>
          </div>
        </div>
      </section>

      <section className="visit" id="visit" aria-labelledby="visit-title">
        <div className="visit__glow" aria-hidden="true">#</div>
        <div className="visit__content shell">
          <p className="section-label">Your next stop</p>
          <h2 id="visit-title">Come by.<br />Find your thing.</h2>
          <p className="visit__lede">New favorite, reliable standby, or something you can&apos;t name yet—we&apos;ll help you find it.</p>
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
        <p>North Austin. North Lamar. 21+.</p>
        <p>For adults 21+ only.</p>
      </footer>
    </main>
  );
}
