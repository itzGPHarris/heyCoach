
import FeedView from "./Feed/FeedView"; // ✅ Ensure the correct import path

function AppShell() {
  
  return (
    console.log("AppShell"), // ✅ Log the AppShell component
    <FeedView /> // ✅ Load the updated feed view
    )
  }

export default AppShell;
