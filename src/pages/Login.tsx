import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isFormValid) {
      navigate('/carteira')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          minLength={6}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button type="submit" disabled={!isEmailValid}>
          Entrar
        </button>
      </form>
    </div>
  );
}
