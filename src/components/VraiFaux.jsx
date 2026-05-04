import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Flame } from 'lucide-react';
import { trueFalseQuestions } from '../data/quizData';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function VraiFaux({ onBack, onFinish }) {
  const questions = useMemo(() => shuffleArray(trueFalseQuestions), []);
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(null); // true or false
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [history, setHistory] = useState([]);

  const q = questions[current];
  const progress = ((current + (showExplanation ? 1 : 0)) / questions.length) * 100;

  const handleAnswer = (answer) => {
    if (answered !== null) return;
    setAnswered(answer);
    const isCorrect = answer === q.answer;
    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
    setHistory((h) => [...h, {
      question: q.statement,
      correct: isCorrect,
      explanation: q.explanation,
    }]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setAnswered(null);
      setShowExplanation(false);
    } else {
      onFinish({ score, total: questions.length, history });
    }
  };

  const getTrueClass = () => {
    if (answered === null) return 'vf-btn true-btn';
    let cls = 'vf-btn true-btn disabled';
    if (answered === true && q.answer === true) cls += ' selected-correct';
    else if (answered === true && q.answer === false) cls += ' selected-wrong';
    return cls;
  };

  const getFalseClass = () => {
    if (answered === null) return 'vf-btn false-btn';
    let cls = 'vf-btn false-btn disabled';
    if (answered === false && q.answer === false) cls += ' selected-correct';
    else if (answered === false && q.answer === true) cls += ' selected-wrong';
    return cls;
  };

  return (
    <>
      <div className="game-topbar">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={16} /> Retour
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {streak >= 2 && (
            <motion.div
              className="streak-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={streak}
            >
              <Flame size={14} /> {streak}
            </motion.div>
          )}
          <div className="score-pill green">
            <Trophy size={14} /> {score}
          </div>
        </div>
      </div>

      <div className="progress-bar-track">
        <motion.div
          className="progress-bar-fill green"
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        />
      </div>

      <div className="vf-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <div className="statement-card">
              <div className="question-number">Affirmation {current + 1} / {questions.length}</div>
              <div className="statement-text">« {q.statement} »</div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="vf-buttons">
          <motion.button
            className={getTrueClass()}
            onClick={() => handleAnswer(true)}
            whileTap={answered === null ? { scale: 0.95 } : {}}
          >
            ✅ VRAI
          </motion.button>
          <motion.button
            className={getFalseClass()}
            onClick={() => handleAnswer(false)}
            whileTap={answered === null ? { scale: 0.95 } : {}}
          >
            ❌ FAUX
          </motion.button>
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              className={`explanation-toast ${answered === q.answer ? 'correct' : 'wrong'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p>{q.explanation}</p>
              <button className="next-btn green" onClick={handleNext}>
                {current < questions.length - 1 ? 'Suivant →' : 'Voir mes résultats'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
