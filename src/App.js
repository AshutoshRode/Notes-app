import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SigninScreen from './Screens/SigninScreen';
import SignupScreen from './Screens/SignupScreen';
import HomeScreen from './Screens/HomeScreen';
import AddNoteScreen from './Screens/AddNoteScreen';
import AboutScreen from './Screens/AboutScreen';
import Navigation from './Components/Navigation';
import EditNoteScreen from './Screens/EditNoteScreen';
import ProfileScreen from "./Screens/ProfileScreen";

function App() {
  return (
    <div>

      <BrowserRouter>
        <Navigation />

        <div className="container">
          <Routes>


            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/add-note" element={<AddNoteScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/edit-note/:id" element={<EditNoteScreen />} />

            <Route path="/profile" element={<ProfileScreen />} />

          </Routes>

        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
