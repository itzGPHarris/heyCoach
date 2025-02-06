// aiService.ts

const sendMessageToAI = async (message: string) => {
    console.log("🧠 AI Processing:", message);
  
    return new Promise<{ response: string }>((resolve) => {
      setTimeout(() => {
        const responses: { [key: string]: string } = {
          "help me with my first pitch": "Sure! Let's start by naming your pitch.",
          "find my competition entry": "Let me locate your competition entry...",
          "find my radiant hue pitch": "I found your 'Radiant Hue' pitch!",
        };
        resolve({ response: responses[message.toLowerCase()] || "I'm not sure how to help with that." });
      }, 1000);
    });
  };
  
  export default { sendMessageToAI };
  