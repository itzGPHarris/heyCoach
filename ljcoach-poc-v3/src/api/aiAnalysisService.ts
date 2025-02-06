const analyzePitch = async (pitchText: string) => {
  console.log("📊 AI Analyzing Pitch:", pitchText);

  return new Promise<{ insights: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        insights: `Your pitch introduction is engaging, but the conclusion could be stronger. Consider reinforcing your main message.`,
      });
    }, 1500);
  });
};

export default { analyzePitch };
