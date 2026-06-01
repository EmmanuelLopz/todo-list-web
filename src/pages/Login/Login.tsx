import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../../components/LoginCard/LoginCard";
import { login } from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/home");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <LoginCard onSubmit={handleSubmit} error={error} loading={loading} />
    </div>
  );
};

export default Login;
