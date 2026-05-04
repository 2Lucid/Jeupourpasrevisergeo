import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle, Link2, ChevronRight, Sparkles } from 'lucide-react';

const modes = [
  {
    id: 'quiz',
    title: 'Quiz Blitz',
    subtitle: '20 questions',
    description: 'Réponds aux QCM le plus vite possible. Enchaîne les bonnes réponses pour accumuler des combos !',
    color: 'blue',
    icon: <Zap size={24} />,
  },
  {
    id: 'vf',
    title: 'Vrai ou Faux',
    subtitle: '16 affirmations',
    description: 'Des affirmations sur la mondialisation. Tranche vite : c\'est VRAI ou c\'est FAUX ? Chaque réponse dévoile l\'explication du cours.',
    color: 'green',
    icon: <CheckCircle size={24} />,
  },
  {
    id: 'match',
    title: 'Associe les Concepts',
    subtitle: '3 sets de 6 paires',
    description: 'Relie chaque sigle ou terme à sa bonne définition. Parfait pour mémoriser le vocabulaire clé du cours.',
    color: 'purple',
    icon: <Link2 size={24} />,
  },
];

const roastMessages = [
  "T'as vraiment cliqué là ? 😭 Allez, révise un peu au lieu de chercher des raccourcis.",
  "Ah bah bravo champion, tu veux un 6-7 ? Même le prof serait déçu.",
  "Un 6-7 c'est la moyenne de quelqu'un qui a révisé dans le bus. Tu vaux mieux que ça.",
  "Clique plutôt sur Quiz Blitz, ça te sera plus utile que ce bouton, gamin. 💀",
  "Le seul raccourci vers le 6-7, c'est de ne rien faire. Et t'es bien parti.",
  "Mdr t'es un gamin, va réviser au lieu de cliquer sur des boutons random. 🤡",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
};

export default function Home({ onSelectMode }) {
  const [showRoast, setShowRoast] = useState(false);
  const [roastText, setRoastText] = useState('');

  const handleEasterEgg = () => {
    const msg = roastMessages[Math.floor(Math.random() * roastMessages.length)];
    setRoastText(msg);
    setShowRoast(true);
    setTimeout(() => setShowRoast(false), 4000);
  };

  return (
    <motion.div className="home" variants={container} initial="hidden" animate="show">
      <motion.div className="home-header" variants={item}>
        <h1>GéoMaster</h1>
        <p>Révise la mondialisation en t'amusant — Terminale</p>
      </motion.div>

      {modes.map((mode) => (
        <motion.div
          key={mode.id}
          className={`mode-card ${mode.color}`}
          variants={item}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelectMode(mode.id)}
        >
          <div className="mode-card-top">
            <div className={`mode-icon ${mode.color}`}>{mode.icon}</div>
            <div>
              <h3>{mode.title}</h3>
              <span>{mode.subtitle}</span>
            </div>
            <ChevronRight size={20} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
          </div>
          <p>{mode.description}</p>
        </motion.div>
      ))}

      {/* Easter egg button */}
      <motion.button
        className="easter-egg-btn"
        variants={item}
        whileTap={{ scale: 0.9 }}
        onClick={handleEasterEgg}
      >
        <Sparkles size={14} />
        Obtenir un 6-7 sans réviser
      </motion.button>

      {/* Roast toast */}
      <AnimatePresence>
        {showRoast && (
          <motion.div
            className="roast-toast"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {roastText}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
