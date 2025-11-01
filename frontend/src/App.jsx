import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import EquipmentList from './components/equipment/EquipmentList';
import EquipmentDetails from './components/equipment/EquipmentDetails';
import EquipmentForm from './components/equipment/EquipmentForm';
import RequestList from './components/requests/RequestList';
import RequestForm from './components/requests/RequestForm';
import AdminEquipmentPage from './pages/AdminEquipmentPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <div style={{ marginTop: '20px' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/equipment" 
                element={
                  <ProtectedRoute>
                    <div className="container">
                      <h1 className="mb-3">Equipment</h1>
                      <EquipmentList />
                    </div>
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/equipment/:id" 
                element={
                  <ProtectedRoute>
                    <div className="container">
                      <EquipmentDetails />
                    </div>
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/requests" 
                element={
                  <ProtectedRoute>
                    <div className="container">
                      <RequestList />
                    </div>
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/requests/create/:equipmentId" 
                element={
                  <ProtectedRoute>
                    <div className="container">
                      <RequestForm />
                    </div>
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/admin/equipment" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminEquipmentPage />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/admin/equipment/new" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <div className="container">
                      <EquipmentForm />
                    </div>
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/admin/equipment/edit/:id" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <div className="container">
                      <EquipmentForm isEdit={true} />
                    </div>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
