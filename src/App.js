import Home from './components/Home';
import Navbar from './components/Navbar';
import './css/app.css';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter,Route,Routes
} from "react-router-dom";
import Section from './components/Section';
import Chatbot from './components/Chatbot';
import DoctorList from './components/DoctorList';
import DoctorDetailPage from './components/DoctorDetailPage';
import BlogPage from './components/BlogPage';
import ViewAppoint from './components/ViewAppoint';
import DoctorReviewsPage from './components/DoctorReviewsPage';


function App() {
 
  return (
   <>

  <BrowserRouter>
   <Routes>
   <Route path="/login" element={<Login/>}/>
   <Route path="/create-user" element={<Signup/>}/>

<Route path="/" element={<Navbar/>}>
   <Route index element={<Home/>}/>
   <Route path="/features" element={<Section/>}/>
   <Route path="/chat" element={<Chatbot/>}/>
   <Route path="/list" element={<DoctorList/>}/>
   <Route path="/blog" element={<BlogPage/>}/>
   <Route path="/appointments" element={<ViewAppoint/>}/>
   <Route path="/doctordetails" element={<DoctorDetailPage/>}/>
   <Route path="/reviews" element={<DoctorReviewsPage/>}/>

</Route>
  </Routes>
  </BrowserRouter>
   </>
  );
}

export default App;
