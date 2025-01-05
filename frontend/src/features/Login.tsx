import { useAuth } from "../context/AuthContext";
import AuthForm from "../compounds/AuthForm";

const Login = () => {
  const { login } = useAuth();
  return (
    <AuthForm
      title="Login"
      onSubmit={login}
      linkText="Don't have an account?"
      linkPath="/register"
    />
  );
};

export default Login;
