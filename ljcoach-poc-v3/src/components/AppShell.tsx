
import FeedView from "./Feed/FeedView"; // ✅ Ensure the correct import path
import { styled } from '@mui/material/styles';
import {Box,
} from '@mui/material';


const MainContent = styled(Box)(() => ({
  flexGrow: 1,
  overflow: "auto",
  backgroundColor: "#141414",
  //backgroundImage: "url(/img/ljbg.png)", // ✅ Static background
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  margin: 0,
  width: "100vw",
  height: "100vh",
}));


function AppShell() {
  
  return (
    <MainContent>
      <FeedView /> 
    </MainContent>)
  }

export default AppShell;
