import { useState } from "react";
import "./QuoteCalculator.css";

function getQuote(blankCost, quantity, frontColors, backColors) {
  const A = 96.9151
  const B = 1.5492
  const C = 0.0000
  const D = 2.4308
  const E = 1.0982
  const L = 0.9093
  const K = 0.0012

  let costF = 0
  let costB = 0
  if (frontColors > 0) {
    costF = D + E * (frontColors - 1)
  }
  if (backColors > 0) {
    costB = D + E * (backColors - 1)
  }

  let basePrice = blankCost + (A + B * (frontColors + backColors)) / quantity + C + costF + costB
  let discount = L + (1 - L) * Math.exp(-K * quantity)

  return basePrice * discount;
}

export default function QuoteCalculator() {
  const [blankCost, setBlankCost] = useState(0);
  const [quantity, setQuantity] = useState(8);
  const [frontColors, setFrontColors] = useState(0);
  const [backColors, setBackColors] = useState(0);
  const [quote, setQuote] = useState(null);

  const handleGetQuote = (e) => {
    e.preventDefault();
    const result = getQuote(blankCost, quantity, frontColors, backColors);
    setQuote(result);
  };

  const selectAllText = (event) => {
    event.target.select();
  };

  return (
    <div className="quote-calculator">
      <div className="quote-header">
        <h1 className="quote-title">Get a Quote</h1>
      </div>

      <div className="quote-card">
        <form onSubmit={handleGetQuote} className="quote-form">
          <div className="quote-section">
            <label htmlFor="quote-blank-cost">Blank shirt cost</label>
            <input
              id="quote-blank-cost"
              type="number"
              min="0"
              step="0.01"
              value={blankCost}
              onChange={(e) => setBlankCost(parseFloat(e.target.value) || 0)}
              onFocus={selectAllText}
            />
          </div>

          <hr className="quote-divider" />

          <div className="quote-section">
            <label htmlFor="quote-quantity">Quantity</label>
            <input
              id="quote-quantity"
              type="number"
              min="8"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 8)}
              onFocus={selectAllText}
            />
          </div>

          <hr className="quote-divider" />

          <div className="quote-colors-row">
            <div className="quote-section">
              <label htmlFor="quote-front-colors">Front Colors</label>
              <input
                id="quote-front-colors"
                type="number"
                min="0"
                max="6"
                value={frontColors}
                onChange={(e) => setFrontColors(parseInt(e.target.value, 10) || 0)}
                onFocus={selectAllText}
              />
            </div>
            <div className="quote-section">
              <label htmlFor="quote-back-colors">Back Colors</label>
              <input
                id="quote-back-colors"
                type="number"
                min="0"
                max="6"
                value={backColors}
                onChange={(e) => setBackColors(parseInt(e.target.value, 10) || 0)}
                onFocus={selectAllText}
              />
            </div>
          </div>

          <hr className="quote-divider" />

          <button type="submit" className="quote-button">
            Get Quote
          </button>
        </form>

        <div
          className={`quote-result ${
            quote !== null ? "is-visible" : "is-hidden"
          }`}
        >
          {quote !== null && (
            <>
              <span className="quote-result-label">Your quote:</span>
              <strong className="quote-result-amount">
                ${typeof quote === "number" ? quote.toFixed(2) : "—"}
              </strong>
            </>
          )}
        </div>
      </div>

      <div className="quote-tips">
        <h2 className="quote-tips-title">Pricing Tips</h2>
        <ul className="quote-tips-list">
          <li>Order more to save more — higher quantities reduce cost per item.</li>
          <li>Use 1–2 colors per side for best pricing.</li>
          <li>White garments cost less than colored ones.</li>
          <li>Extended sizes (XXL+) may have additional costs.</li>
          <li>Tax added at checkout.</li>
        </ul>
      </div>
    </div>
  );
}
