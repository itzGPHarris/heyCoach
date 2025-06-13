import React, { useRef, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import BaseballField, { BaseballFieldHandle } from './BaseballField';
import { BaseState, QuestionDifficulty } from '../types';
import diamondUrl from '../assets/baseballDiamond.svg';
import runnerImageUrl from '../assets/single_runner.png'; // any runner image you have

const initialBases: BaseState = {
  first: false,
  second: false,
  third: false,
};

const TestAnimationWrapper: React.FC = () => {
  const fieldRef = useRef<BaseballFieldHandle>(null);
  const [bases, setBases] = useState<BaseState>(initialBases);
  const [log, setLog] = useState<string[]>([]);

  const triggerAnimation = (hitType: QuestionDifficulty) => {
    logMessage(`Triggering animation: ${hitType}`);
    fieldRef.current?.startPlayAnimation(hitType);
  };

  const logMessage = (msg: string) => {
    console.log(msg);
    setLog((prev) => [...prev, msg]);
  };

  return (
    <Box p={4}>
      <Typography variant="h5">🏟 Animation Debugger</Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <Button onClick={() => triggerAnimation('Single')} variant="contained">Single</Button>
        <Button onClick={() => triggerAnimation('Double')} variant="contained" color="warning">Double</Button>
        <Button onClick={() => triggerAnimation('Triple')} variant="contained" color="error">Triple</Button>
        <Button onClick={() => triggerAnimation('Homerun')} variant="contained" color="error">Home Run</Button>

        <Button onClick={() => setBases(initialBases)}>Reset Bases</Button>
      </Stack>

      <Box mt={4}>
        <BaseballField
          ref={fieldRef}
          bases={bases}
          outs={0}
          strikes={0}
          score={0}
          diamondUrl={diamondUrl}
          runnerImageUrl={runnerImageUrl}
          onAnimationStart={() => logMessage('🎬 Animation started')}
          onAnimationComplete={(runs) => logMessage(`✅ Animation complete, runs scored: ${runs}`)}
          onBaseUpdate={(newBases) => {
            logMessage(`🔄 Bases updated: ${JSON.stringify(newBases)}`);
            setBases(newBases);
          }}
        />
      </Box>

      <Box mt={4}>
        <Typography variant="subtitle1">📝 Log</Typography>
        <pre style={{ background: '#333', padding: '1rem', maxHeight: '200px', overflow: 'auto' }}>
          {log.map((line, index) => <div key={index}>{line}</div>)}
        </pre>
      </Box>
    </Box>
  );
};

export default TestAnimationWrapper;
