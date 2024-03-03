import { Route, Routes } from "react-router-dom";
import Home from "./pages";
import History from "./pages/HistoryPage";
import Layout from "./components/Layout";
import NavBar from "./components/NavBar";
import { QueryProvider } from './context/SearchHistoryContext';


const App: React.FC = () => {
  return (
    <QueryProvider>
    <Layout>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="history" element={<History />} />
      </Routes>
    </Layout>
    </QueryProvider>
  );
};

export default App; 