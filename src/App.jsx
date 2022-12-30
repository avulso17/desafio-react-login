import { login } from './utils';
import './index.css';
import { useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// ✅ - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// ✅ - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos. 
// ✅ - Desabilite o botão de Login equanto você está executando o login.
// ✅ - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// ✅ - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState({
    email: '',
    password: '',
  });
  const { email, password } = auth;
  const disabled = email.length === 0 || password.length < 6 || loading;
  
  const onChangeInput = (event) => {
    const { value } = event.target;

    setAuth({
      ...auth,
      [event.target.id]: value,
    });
  };

  const onSubmitLogin = (event) => {
    event.preventDefault();

    setError(null);
    setLoading(true);

    login({ email, password })
      .then(() => {
        alert('Login efetuado com sucesso!');
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='wrapper'>
      <form onSubmit={onSubmitLogin} className='login-form'>
        <h1>Login Form 🐞</h1>
        {error && <div className='errorMessage'>{error?.message}</div>}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input 
            id={'email'}
            type={'email'}
            autoComplete='off'
            value={email}
            onChange={onChangeInput}
          />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input
            id={'password'}
            type={'password'}
            value={password}
            onChange={onChangeInput}
          />
        </div>

        <div className='button'>
          <button type='submit' disabled={disabled}>Login</button>
        </div>
      </form>
    </div>
  );
}
