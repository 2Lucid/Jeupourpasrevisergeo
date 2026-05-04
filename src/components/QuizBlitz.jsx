import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Flame } from 'lucide-react';
import { quizQuestions } from '../data/quizData';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizBlitz({ onBack, onFinish }) {
  const questions = useMemo(() => shuffleArray(quizQuestions), []);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [history, setHistory] = useState([]);

  const q = questions[current];
  const progress = ((current + (showExplanation ? 1 : 0)) / questions.length) * 100;
  const letters = ['A', 'B', 'C', 'D'];

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === q.correct;
    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
    setHistory((h) => [...h, {
      question: q.question,
      correct: isCorrect,
      explanation: q.explanation,
    }]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      onFinish({ score, total: questions.length, history });
    }
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
          <div className="score-pill blue">
            <Trophy size={14} /> {score}
          </div>
        </div>
      </div>

      <div className="progress-bar-track">
        <motion.div
          className="progress-bar-fill blue"
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        />
      </div>

      <div className="quiz-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <div className="question-card">
              <div className="question-number">Question {current + 1} / {questions.length}</div>
              <div className="question-text">{q.question}</div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="choices-grid">
          {q.choices.map((choice, i) => {
            let cls = 'choice-btn';
            if (selected !== null) {
              cls += ' disabled';
              if (i === q.correct) cls += ' correct';
              else if (i === selected && i !== q.correct) cls += ' wrong';
            }
            return (
              <motion.button
                key={i}
                className={cls}
                onClick={() => handleSelect(i)}
                whileTap={selected === null ? { scale: 0.97 } : {}}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="choice-letter">{letters[i]}</span>
                {choice}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              className={`explanation-toast ${selected === q.correct ? 'correct' : 'wrong'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p>{q.explanation}</p>
              <button className="next-btn blue" onClick={handleNext}>
                {current < questions.length - 1 ? 'Question suivante →' : 'Voir mes résultats'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
