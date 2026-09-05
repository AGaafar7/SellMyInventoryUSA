import SellForm from "./components/SellForm";

const inventoryTypes = [
  ["01", "Overstock", "Too much inventory on hand? We can review excess stock."],
  ["02", "Closeouts", "Moving discontinued or closeout merchandise? Let's talk."],
  ["03", "Liquidation", "Need to move a large quantity quickly? Send us the details."],
  ["04", "Bulk merchandise", "Cases, pallets, or larger quantities are welcome to inquire."]
];

export default function Home() {
  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <a className="logo" href="#top" aria-label="Sell My Inventory USA">
            <span className="logo-box">MD</span>
            <span>
              SellMyInventory<span className="logo-green">USA</span>
            </span>
          </a>

          <nav className="desktop-nav">
            <a href="#process">How it works</a>
            <a href="#inventory">What we buy</a>
            <a href="#sell">Sell inventory</a>
          </nav>

          <a
            className="header-social"
            href="https://www.tiktok.com/@mddeals"
            target="_blank"
            rel="noreferrer"
          >
            <span>Follow</span> @mddeals ↗
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-noise" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow light">
                <span className="eyebrow-line" />
                MDDEALS · INVENTORY BUYERS
              </div>

              <h1>
                Have inventory?
                <br />
                <em>Let&apos;s move it.</em>
              </h1>

              <p>
                We purchase overstock, closeout, liquidation, and excess
                merchandise from businesses and sellers across the USA.
              </p>

              <div className="hero-cta">
                <a className="btn btn-lime" href="#sell">
                  Sell your inventory <span>↗</span>
                </a>
                <a className="btn btn-ghost" href="#process">
                  How it works
                </a>
              </div>

              <div className="hero-meta">
                <span><i /> Direct buyer</span>
                <span><i /> Bulk inventory</span>
                <span><i /> USA</span>
              </div>
            </div>

            <div className="hero-visual" aria-label="Inventory boxes">
              <div className="visual-top">
                <span>MDDEALS</span>
                <span>INVENTORY / 001</span>
              </div>

              <div className="warehouse-grid">
                <div className="grid-line line-1" />
                <div className="grid-line line-2" />
                <div className="grid-line line-3" />

                <div className="box box-one">
                  <strong>OVER</strong>
                  <small>STOCK</small>
                </div>
                <div className="box box-two">
                  <strong>CLOSE</strong>
                  <small>OUT</small>
                </div>
                <div className="box box-three">
                  <strong>MD</strong>
                  <small>DEALS</small>
                </div>
              </div>

              <div className="visual-bottom">
                <span>FROM CASES</span>
                <b>→</b>
                <span>TO TRUCKLOADS</span>
              </div>
            </div>
          </div>
        </section>

        <div className="marquee">
          <div className="marquee-track">
            <span>OVERSTOCK</span><b>✦</b>
            <span>CLOSEOUTS</span><b>✦</b>
            <span>LIQUIDATION</span><b>✦</b>
            <span>EXCESS INVENTORY</span><b>✦</b>
            <span>BULK MERCHANDISE</span><b>✦</b>
            <span>OVERSTOCK</span><b>✦</b>
            <span>CLOSEOUTS</span><b>✦</b>
            <span>LIQUIDATION</span><b>✦</b>
          </div>
        </div>

        <section id="process" className="section process">
          <div className="container">
            <div className="section-intro">
              <div>
                <div className="eyebrow">
                  <span className="eyebrow-line dark" />
                  THE PROCESS
                </div>
                <h2>Simple from<br /><em>start to finish.</em></h2>
              </div>
              <p>
                No marketplace. No listing fees. Send us the basics and our
                team can review the inventory and contact you if it is a fit.
              </p>
            </div>

            <div className="steps">
              <article>
                <span className="step-no">01</span>
                <div className="step-icon">↗</div>
                <h3>Send the details</h3>
                <p>Tell us who you are, how to reach you, and what inventory you want to move.</p>
              </article>

              <article>
                <span className="step-no">02</span>
                <div className="step-icon">◎</div>
                <h3>We review it</h3>
                <p>We look at the product type, quantity, condition, and other details you provide.</p>
              </article>

              <article>
                <span className="step-no">03</span>
                <div className="step-icon">→</div>
                <h3>Talk next steps</h3>
                <p>If there is a fit, the MDDeals team contacts you to discuss the opportunity.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="inventory" className="inventory-section">
          <div className="container">
            <div className="inventory-head">
              <div>
                <div className="eyebrow">
                  <span className="eyebrow-line dark" />
                  WHAT WE BUY
                </div>
                <h2>Got product sitting<br /><em>around?</em></h2>
              </div>
              <p>
                We buy merchandise that needs a new home. If you are not sure
                whether your inventory is a fit, send it anyway.
              </p>
            </div>

            <div className="inventory-list">
              {inventoryTypes.map(([number, title, copy]) => (
                <article className="inventory-item" key={number}>
                  <span className="inventory-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <span className="inventory-arrow">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sell" className="sell-section">
          <div className="container sell-grid">
            <div className="sell-copy">
              <div className="eyebrow light">
                <span className="eyebrow-line" />
                SELL YOUR INVENTORY
              </div>
              <h2>
                Tell us what
                <br />
                you&apos;ve <em>got.</em>
              </h2>
              <p>
                Give us a few details about the inventory and the best way to
                reach you. Your inquiry goes directly to the MDDeals team.
              </p>

              <div className="social-card">
                <span className="social-label">SEE WHAT WE DO</span>
                <strong>@mddeals</strong>
              </div>
            </div>

            <SellForm />
          </div>
        </section>

        <section className="final-cta">
          <div className="container">
            <div className="eyebrow">
              <span className="eyebrow-line dark" />
              MDDEALS
            </div>
            <h2>
              Less inventory.
              <br />
              More <em>room.</em>
            </h2>
            <a className="btn btn-black" href="#sell">
              Start your inquiry <span>↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <a className="logo footer-logo" href="#top">
            <span className="logo-box">MD</span>
            <span>SellMyInventory<span className="logo-green">USA</span></span>
          </a>
          <p>© {new Date().getFullYear()} SellMyInventoryUSA · MDDeals</p>
       
        </div>
      </footer>
    </>
  );
}