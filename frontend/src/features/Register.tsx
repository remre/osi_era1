import { useAuth } from "../context/AuthContext";
import AuthForm from "../compounds/AuthForm";

const Register = () => {
  const { register } = useAuth();
  return (
    <AuthForm
      title="Register"
      onSubmit={register}
      linkText="Already have an account?"
      linkPath="/login"
    />
  );
};

export default Register;
