import React, { useRef, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import BaseballField, { BaseballFieldHandle } from './BaseballField';
import { BaseState, QuestionDifficulty } from '../types';

const TestWrapper: React.FC = () => {
  const fieldRef = useRef<BaseballFieldHandle>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [strikeCount, setStrikeCount] = useState(0);
  const [baseState, setBaseState] = useState<BaseState>({ first: false, second: false, third: false });
  const [score, setScore] = useState(0);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 10));
  };

  const handlePlay = (type: QuestionDifficulty) => {
    fieldRef.current?.startPlayAnimation(type);
    addLog(`⚾ Play triggered: ${type}`);
  };

  const preloadGrandSlam = () => {
    setBaseState({ first: true, second: true, third: true });
    addLog('💥 Bases loaded! Ready for a grand slam.');
  };

  const resetField = () => {
    setBaseState({ first: false, second: false, third: false });
    setScore(0);
    setStrikeCount(0);
    addLog('🔄 Field reset.');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack spacing={2} direction="row" justifyContent="center" mb={3}>
        <Button variant="contained" color="primary" onClick={() => handlePlay('Single')}>
          Hit: Single
        </Button>
        <Button variant="contained" color="warning" onClick={() => handlePlay('Double')}>
          Hit: Double
        </Button>
        <Button variant="contained" color="error" onClick={() => handlePlay('Triple')}>
          Hit: Triple
        </Button>
        <Button variant="contained" color="success" onClick={() => handlePlay('Homerun')}>
          Hit: Home Run
        </Button>
        <Button variant="outlined" onClick={preloadGrandSlam}>Preload Grand Slam</Button>
        <Button variant="outlined" color="secondary" onClick={resetField}>Reset Field</Button>
      </Stack>

      <BaseballField
        ref={fieldRef}
        bases={baseState}
        outs={0}
        strikes={strikeCount}
        score={score}
        diamondUrl="../assets/baseballDiamond.svg"
        runnerImageUrl="../assets/single_runner.png"
        onAnimationStart={() => addLog('🎬 Animation started')}
        onAnimationComplete={(runs) => {
          setScore(prev => prev + runs);
          addLog(`✅ Runs scored: ${runs}`);
        }}
        onBaseUpdate={(newBases) => {
          setBaseState(newBases);
          addLog(`🔄 Bases updated: ${JSON.stringify(newBases)}`);
        }}
      />

      <Box sx={{ mt: 4, p: 2, bgcolor: '#f9f9f9', border: '1px solid #ccc', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>📋 Log Console</Typography>
        {logs.map((log, i) => (
          <Typography key={i} variant="body2">{log}</Typography>
        ))}
      </Box>
    </Box>
  );
};

export default TestWrapper;
