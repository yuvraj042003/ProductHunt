import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios"; 
import { toast } from "sonner";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await api.post("/api/v1/user/logout"); 
        localStorage.removeItem("token");      
        toast.success("Logged out successfully");
        navigate("/home");                         
      } catch (error) {
        toast.error("Logout failed");
        console.error("Logout error:", error);
        navigate("/"); 
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-700">Logging out...</p>
    </div>
  );
};

export default Logout;
