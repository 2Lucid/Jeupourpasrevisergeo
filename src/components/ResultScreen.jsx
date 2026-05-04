import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home } from 'lucide-react';

export default function ResultScreen({ results, onReplay, onHome }) {
  const { score, total, history } = results;
  const pct = Math.round((score / total) * 100);

  let emoji, title, iconClass;
  if (pct >= 80) {
    emoji = '🏆';
    title = 'Excellent !';
    iconClass = 'great';
  } else if (pct >= 50) {
    emoji = '💪';
    title = 'Pas mal !';
    iconClass = 'ok';
  } else {
    emoji = '📚';
    title = 'Continue de réviser !';
    iconClass = 'bad';
  }

  return (
    <motion.div
      className="results"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className={`results-icon ${iconClass}`}>{emoji}</div>
      <h2>{title}</h2>
      <div className="results-score">{score}/{total}</div>
      <p className="results-subtitle">
        {pct >= 80 && 'Tu maîtrises la mondialisation comme un champion ! Ta copie sera au top.'}
        {pct >= 50 && pct < 80 && 'Tu as de bonnes bases. Rejoue pour solidifier tes connaissances.'}
        {pct < 50 && 'Pas de panique, relis les explications ci-dessous et retente ta chance !'}
      </p>

      {history.length > 0 && (
        <div className="results-review">
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 4 }}>
            Récapitulatif
          </h3>
          {history.map((item, i) => (
            <div key={i} className={`review-card ${item.correct ? 'was-right' : 'was-wrong'}`}>
              <div className="review-question">
                {item.correct ? '✅' : '❌'} {item.question}
              </div>
              <div className="review-explanation">{item.explanation}</div>
            </div>
          ))}
        </div>
      )}

      <div className="results-buttons">
        <button className="next-btn blue" onClick={onReplay}>
          <RotateCcw size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />
          Rejouer
        </button>
        <button className="next-btn purple" onClick={onHome}>
          <Home size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />
          Accueil
        </button>
      </div>
    </motion.div>
  );
}
