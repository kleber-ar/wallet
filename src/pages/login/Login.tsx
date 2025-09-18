import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail } from "../../redux/actions";
import './Login.css';
import Logo from "../../components/Logo";

export default function Login() {
  const [email, setEmailInput] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isFormValid) {
      dispatch(setEmail(email));
      navigate('/carteira')
    }
  }

  return (
    <div className="login-page">
      <Logo size={55} margin="10px" />
      <div className='login-container'>
        <form onSubmit={handleSubmit}>
          <input
            data-testid='email-input'
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <input
            data-testid='password-input'
            type="password"
            placeholder="Senha"
            value={password}
            minLength={6}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button type="submit" disabled={!isFormValid}>
            Entrar
          </button>
        </form>
      </div >
    </div>
  );
}
