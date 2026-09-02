import './SeptemberSaleBanner.css';
import bgImage from '../../assets/Banner_image/september_sale_divine_blessings.jpg';

export function SeptemberSaleBanner() {
  return (
    <section className="sep-banner-short-wrapper">
      <div className="sep-banner-short-container">

        {/* Left - Title */}
        <div className="sep-banner-short-left">
          <div className="sep-banner-text-stacked">
            <span className="sep-banner-text-top">SEPTEMBER</span>
            <span className="sep-banner-text-bottom">SALE</span>
          </div>
        </div>

        {/* Middle - Offer & Info */}
        <div className="sep-banner-short-middle">
          <div className="sep-banner-middle-content">
            <h3 className="sep-banner-short-offer">
              UP TO <span>45% OFF*</span>
            </h3>
            <p className="sep-banner-short-desc">
              Strengthen what matters most with Divine blessings.
            </p>
            <div className="sep-banner-date-cta-row">
              <div className="sep-banner-short-date">
                Sep. 1 - 30, 2026
              </div>
              <button className="sep-banner-short-cta">
                EXPLORE SEPTEMBER BLESSINGS
              </button>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="sep-banner-short-right">
          <img src={bgImage} alt="Divine Blessings" className="sep-banner-bg-img" />
          <div className="sep-banner-fade"></div>
        </div>

        <img
          src="https://cdn.astroved.com/images/images-av/AstroVed-Logo.svg"
          alt="AstroVed Logo"
          className="sep-banner-abs-logo"
        />

      </div>
    </section>
  );
}
