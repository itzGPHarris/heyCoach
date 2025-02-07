// feedService.ts

const getFeedMessages = async () => {
    console.log("📥 Fetching feed messages...");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, sender: "coach", text: "👋 Welcome! Ask me anything to get started." },
        ]);
      }, 500);
    });
  };
  
  const addMessageToFeed = async (message: { id: number; sender: "user" | "coach"; text: string }) => {
    console.log("➕ Adding message to feed:", message);
    return Promise.resolve(message);
  };
  
  export default { getFeedMessages, addMessageToFeed };
  