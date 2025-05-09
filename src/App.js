import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import './App.css'
import './styles/reset.css';
import './styles/variables.css';
import './styles/typography.css';
import './styles/layout.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
