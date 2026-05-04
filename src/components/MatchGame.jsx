import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Check } from 'lucide-react';
import { matchSets } from '../data/quizData';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchGame({ onBack, onFinish }) {
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const activeSet = matchSets[activeSetIndex];

  // Shuffle definitions for each set
  const shuffledDefs = useMemo(
    () => shuffleArray(activeSet.pairs.map((p) => p.definition)),
    [activeSetIndex]
  );

  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDef, setSelectedDef] = useState(null);
  const [matched, setMatched] = useState([]); // array of matched term strings
  const [wrongFlash, setWrongFlash] = useState(null); // { term, def }
  const [totalMatched, setTotalMatched] = useState(0);
  const totalPairs = matchSets.reduce((a, s) => a + s.pairs.length, 0);

  const handleTermClick = (term) => {
    if (matched.includes(term)) return;
    setSelectedTerm(term);
    setWrongFlash(null);

    // If a def is already selected, try to match
    if (selectedDef !== null) {
      tryMatch(term, selectedDef);
    }
  };

  const handleDefClick = (def) => {
    if (matched.some((t) => activeSet.pairs.find((p) => p.term === t)?.definition === def)) return;
    setSelectedDef(def);
    setWrongFlash(null);

    // If a term is already selected, try to match
    if (selectedTerm !== null) {
      tryMatch(selectedTerm, def);
    }
  };

  const tryMatch = (term, def) => {
    const pair = activeSet.pairs.find((p) => p.term === term);
    if (pair && pair.definition === def) {
      // Correct match
      setMatched((m) => [...m, term]);
      setTotalMatched((t) => t + 1);
      setSelectedTerm(null);
      setSelectedDef(null);
    } else {
      // Wrong match
      setWrongFlash({ term, def });
      setTimeout(() => {
        setWrongFlash(null);
        setSelectedTerm(null);
        setSelectedDef(null);
      }, 500);
    }
  };

  const switchSet = (index) => {
    setActiveSetIndex(index);
    setSelectedTerm(null);
    setSelectedDef(null);
    setMatched([]);
    setWrongFlash(null);
  };

  const allDone = matched.length === activeSet.pairs.length;
  const allSetsDone = totalMatched === totalPairs;

  return (
    <>
      <div className="game-topbar">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={16} /> Retour
        </button>
        <div className="score-pill purple">
          <Trophy size={14} /> {totalMatched}/{totalPairs}
        </div>
      </div>

      <div className="progress-bar-track">
        <motion.div
          className="progress-bar-fill purple"
          animate={{ width: `${(totalMatched / totalPairs) * 100}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        />
      </div>

      <div className="match-set-selector">
        {matchSets.map((s, i) => (
          <button
            key={s.id}
            className={`set-btn ${i === activeSetIndex ? 'active' : ''}`}
            onClick={() => switchSet(i)}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="match-content">
        <div className="match-title">
          Sélectionne un terme à gauche, puis sa définition à droite
        </div>

        <div className="match-columns">
          {/* Terms Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {activeSet.pairs.map((pair) => {
              const isMatched = matched.includes(pair.term);
              const isSelected = selectedTerm === pair.term;
              const isWrong = wrongFlash?.term === pair.term;
              let cls = 'match-item term';
              if (isMatched) cls += ' matched';
              if (isSelected) cls += ' selected';
              if (isWrong) cls += ' wrong-flash';

              return (
                <motion.div
                  key={pair.term}
                  className={cls}
                  onClick={() => handleTermClick(pair.term)}
                  whileTap={!isMatched ? { scale: 0.95 } : {}}
                  layout
                >
                  {isMatched ? <Check size={14} style={{ display: 'inline', marginRight: 4 }} /> : null}
                  {pair.term}
                </motion.div>
              );
            })}
          </div>

          {/* Definitions Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {shuffledDefs.map((def) => {
              const isMatched = matched.some(
                (t) => activeSet.pairs.find((p) => p.term === t)?.definition === def
              );
              const isSelected = selectedDef === def;
              const isWrong = wrongFlash?.def === def;
              let cls = 'match-item def';
              if (isMatched) cls += ' matched';
              if (isSelected) cls += ' selected';
              if (isWrong) cls += ' wrong-flash';

              return (
                <motion.div
                  key={def}
                  className={cls}
                  onClick={() => handleDefClick(def)}
                  whileTap={!isMatched ? { scale: 0.95 } : {}}
                  layout
                >
                  {def}
                </motion.div>
              );
            })}
          </div>
        </div>

        {allDone && !allSetsDone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginTop: 16 }}
          >
            <p style={{ color: 'var(--accent-green)', fontWeight: 600, marginBottom: 10 }}>
              ✅ Set terminé ! Passe au suivant.
            </p>
          </motion.div>
        )}

        {allSetsDone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginTop: 16 }}
          >
            <p style={{ color: 'var(--accent-green)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 12 }}>
              🎉 Tous les sets sont complétés !
            </p>
            <button
              className="next-btn purple"
              onClick={() => onFinish({ score: totalPairs, total: totalPairs, history: [] })}
            >
              Voir mes résultats
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
}
