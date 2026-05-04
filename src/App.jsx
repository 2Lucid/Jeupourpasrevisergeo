import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './components/Home';
import QuizBlitz from './components/QuizBlitz';
import VraiFaux from './components/VraiFaux';
import MatchGame from './components/MatchGame';
import ResultScreen from './components/ResultScreen';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState('home'); // home | quiz | vf | match | results
  const [lastMode, setLastMode] = useState(null);
  const [results, setResults] = useState(null);

  const handleSelectMode = (mode) => {
    setLastMode(mode);
    setScreen(mode);
  };

  const handleFinish = (data) => {
    setResults(data);
    setScreen('results');
  };

  const handleReplay = () => {
    setScreen(lastMode);
    setResults(null);
  };

  const handleHome = () => {
    setScreen('home');
    setResults(null);
  };

  return (
    <div className="app-shell">
      <div className="app-inner">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <Home onSelectMode={handleSelectMode} />
            </motion.div>
          )}

          {screen === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <QuizBlitz onBack={handleHome} onFinish={handleFinish} />
            </motion.div>
          )}

          {screen === 'vf' && (
            <motion.div
              key="vf"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <VraiFaux onBack={handleHome} onFinish={handleFinish} />
            </motion.div>
          )}

          {screen === 'match' && (
            <motion.div
              key="match"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <MatchGame onBack={handleHome} onFinish={handleFinish} />
            </motion.div>
          )}

          {screen === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <ResultScreen
                results={results}
                onReplay={handleReplay}
                onHome={handleHome}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
