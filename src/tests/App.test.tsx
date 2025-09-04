import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonLogin = screen.getByRole('button');

    expect(inputEmail).toBeInTheDocument();

    await userEvent.type(inputEmail, 'alguem@email.com');
    await userEvent.type(inputPassword, '123456');

    expect(buttonLogin).toBeEnabled();

    await userEvent.click(buttonLogin);

    waitFor(() => expect(global.window.location.pathname).toEqual('/carteira'));
  });
});
