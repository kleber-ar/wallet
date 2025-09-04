import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import '@testing-library/jest-dom';

describe('01 [LOGIN] - Teste da pagina de login.', () => {
  it('teste de renderização dos inputs e button(DISABLED)', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonLogin = screen.getByRole('button');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toBeDisabled();
  });

  it('teste de validação e button(ENABLED) e se direciona para a "/careira"', async () => {
    const { user } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonLogin = screen.getByRole('button');

    expect(inputEmail).toBeInTheDocument();

    await user.type(inputEmail, 'alguem@email.com');
    await user.type(inputPassword, '123456');

    expect(buttonLogin).toBeEnabled();

    await user.click(buttonLogin);

    waitFor(() => expect(global.window.location.pathname).toEqual('/carteira'));
  });
});
