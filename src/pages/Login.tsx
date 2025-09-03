import { useState } from "react";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  return (
    <div>
      <form onSubmit={ }>
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
        <button type="submit" >
          Entrar
        </button>
      </form>
    </div>
  );
}
