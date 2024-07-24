import Otp from "./Pages/Otp"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Table from "./Pages/Table";
import Batch from "./Pages/Batch";

const App= ()=>{
  return <>
   <div className=" h-full overflow-y-hidden m-0 w-full overflow-x-hidden " > 
   <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/otp-form" />} />
        <Route path="/otp-form" element={<Otp />} />
        <Route path="/course-list" element={<Table />} />
        <Route path="/batches" element={<Batch />} />
      </Routes>
    </Router>
   </div>
  </>
}
export default App 