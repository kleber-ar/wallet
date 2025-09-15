import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';
import mockCurrencies from './helpers/mockCurrencies';

describe('01 [LOGIN] - Teste da pagina de login.', () => {
  it('Renderização dos inputs e button(DISABLED)', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonLogin = screen.getByRole('button');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toBeDisabled();
  });

  it('Validação e button(ENABLED) e se direciona para a "/careira"', async () => {
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

describe('02 [CARTEIRA] - Teste da pagina de carteira.', () => {

  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCurrencies),
      })
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks(); // limpa os mocks entre os testes
  });

  it('Teste valor inicial dos fields Email, total e moeda no header', async () => {
    const { user } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonLogin = screen.getByRole('button');

    expect(inputEmail).toBeInTheDocument();

    await user.type(inputEmail, 'alguem@email.com');
    await user.type(inputPassword, '123456');

    expect(buttonLogin).toBeEnabled();

    await user.click(buttonLogin);

    const emailField = await screen.findByTestId('email-field');
    const totalField = await screen.findByTestId('total-field');
    const currencyField = await screen.findByTestId('header-currency-field');

    expect(emailField).toHaveTextContent('alguem@email.com');
    expect(totalField).toHaveTextContent('0.00');
    expect(currencyField).toHaveTextContent('BRL');
  });

  it('Total soma/subtração das despesas com as moedas mockadas', async () => {
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const valueField = screen.getByTestId("value-input");
    const descricaoField = screen.getByTestId("description-input");
    const metodoDePag = screen.getByTestId("method-input");
    const tag = screen.getByTestId("tag-input");
    const selectCurrency = screen.getByTestId('currency-input');

    expect(valueField).toBeInTheDocument();
    expect(descricaoField).toBeInTheDocument();


    // Aguarda as opções carregarem
    await waitFor(() => {
      expect(metodoDePag).toBeInTheDocument();
      expect(tag).toBeInTheDocument();
      expect(selectCurrency).toBeInTheDocument();
    });

    expect(metodoDePag).toHaveTextContent('Dinheiro');
    expect(metodoDePag).toHaveTextContent('Cartão de crédito');
    expect(metodoDePag).toHaveTextContent('Cartão de débito');


    expect(tag).toHaveTextContent('Alimentação');
    expect(tag).toHaveTextContent('Lazer');
    expect(tag).toHaveTextContent('Trabalho');
    expect(tag).toHaveTextContent('Transporte');
    expect(tag).toHaveTextContent('Saúde');

    // Verifica se o select recebeu as moedas do mock
    expect(selectCurrency).toHaveTextContent('USD');
    expect(selectCurrency).toHaveTextContent('EUR');
    expect(selectCurrency).toHaveTextContent('BRL');

    const totalField = screen.getByTestId('total-field');
    const buttonSubmit = screen.getByRole('button');

    await user.type(valueField, '1');
    await user.type(descricaoField, 'a');
    await user.click(buttonSubmit);

    expect(totalField).toHaveTextContent('5.00');

    await user.type(valueField, '1');
    await user.type(descricaoField, 'a');
    await user.selectOptions(selectCurrency, 'BRL')
    await user.click(buttonSubmit);

    expect(totalField).toHaveTextContent('6.00');

    await user.type(valueField, '1');
    await user.type(descricaoField, 'a');
    await user.selectOptions(selectCurrency, 'EUR')
    await user.click(buttonSubmit);

    expect(totalField).toHaveTextContent('12.00');

    const buttonDel = screen.getAllByTestId('btnDelete');

    await user.click(buttonDel[2]);

    expect(totalField).toHaveTextContent('6.00');

  });

  it('Adição/Remoção das despesas', async () => {
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const totalField = screen.getByTestId('total-field');
    const valueField = screen.getByTestId("value-input");
    const descricaoField = screen.getByTestId("description-input");
    const metodoDePag = screen.getByTestId("method-input");
    const tag = screen.getByTestId("tag-input");
    const selectCurrency = screen.getByTestId('currency-input');
    const buttonSubmit = screen.getByRole('button');


    await user.type(valueField, '1');
    await user.type(descricaoField, 'a');
    await user.click(buttonSubmit);

    expect(totalField).toHaveTextContent('5.00');

    await user.type(valueField, '1');
    await user.type(descricaoField, 'b');
    await user.selectOptions(selectCurrency, 'BRL')
    await user.selectOptions(metodoDePag, 'Cartão de débito');
    await user.selectOptions(tag, 'Lazer');
    await user.click(buttonSubmit);

    expect(totalField).toHaveTextContent('6.00');

    await user.type(valueField, '1');
    await user.type(descricaoField, 'c');
    await user.selectOptions(selectCurrency, 'EUR')
    await user.selectOptions(metodoDePag, 'Cartão de crédito');
    await user.selectOptions(tag, 'Trabalho');
    await user.click(buttonSubmit);

    expect(totalField).toHaveTextContent('12.00');

    const expenses = screen.getAllByTestId('expense');

    expect(expenses[0]).toHaveTextContent('a');
    expect(expenses[0]).toHaveTextContent('Dinheiro');
    expect(expenses[0]).toHaveTextContent('Dólar Americano');
    expect(expenses[0]).toHaveTextContent('Alimentação');
    expect(expenses[0]).toHaveTextContent('5.00');

    expect(expenses[1]).toHaveTextContent('b');
    expect(expenses[1]).toHaveTextContent('Cartão de débito');
    expect(expenses[1]).toHaveTextContent('Real Brasileiro');
    expect(expenses[1]).toHaveTextContent('Lazer');
    expect(expenses[1]).toHaveTextContent('1.00');

    expect(expenses[2]).toHaveTextContent('c');
    expect(expenses[2]).toHaveTextContent('Cartão de crédito');
    expect(expenses[2]).toHaveTextContent('Euro');
    expect(expenses[2]).toHaveTextContent('Trabalho');
    expect(expenses[2]).toHaveTextContent('6.00');

    expect(expenses).toHaveLength(3);

    const buttonDel = screen.getAllByTestId('btnDelete');

    // Deleta o primeiro item
    await user.click(buttonDel[0]);

    // Re-busca as despesas no DOM
    const updatedExpenses1 = screen.queryAllByTestId('expense');
    expect(updatedExpenses1).toHaveLength(2);

    // Deleta o próximo
    await user.click(screen.getAllByTestId('btnDelete')[0]); // agora é o segundo item
    const updatedExpenses2 = screen.queryAllByTestId('expense');
    expect(updatedExpenses2).toHaveLength(1);

    // Deleta o último
    await user.click(screen.getAllByTestId('btnDelete')[0]);
    const updatedExpenses3 = screen.queryAllByTestId('expense');
    expect(updatedExpenses3).toHaveLength(0);

  });




});
