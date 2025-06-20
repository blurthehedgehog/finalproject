import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = () => {
    // შენახვა, რომ დარეგისტრირდა
    localStorage.setItem("isRegistered", "true");

    // გადაამისამართე მთავარ გვერდზე
    navigate("/");
  };

  return (
    <div>
      <h1>Registration Page</h1>
      {/* აქ უნდა იყოს შენი ფორმა */}

      <button onClick={handleRegister}>Complete Registration</button>
    </div>
  );
}

export default Register;