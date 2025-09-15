
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { applyMiddleware, legacy_createStore as createStore, type Store } from 'redux';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import rootReducer, { type RootState } from '../../redux/reducers';
import { thunk } from 'redux-thunk';

type Options = {
  initialEntries?: string[];
  initialState?: RootState;
  store?: Store;
};

function withRouter(component: React.ReactElement, initialEntries: string[]) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  );
}

function withRedux(component: React.ReactElement, store: Store) {
  return (
    <Provider store={store}>
      {component}
    </Provider>
  );
}

export function renderWithRouter(
  component: React.ReactElement,
  {
    initialEntries = ['/'],
  }: Options = {},
) {
  return render(withRouter(component, initialEntries));
}

export function renderWithRedux(component: React.ReactElement, options: Options = {}) {
  const {
    initialState = {},
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
  } = options;

  return {
    ...render(withRedux(component, store)),
    store,
  };
}

export function renderWithRouterAndRedux(
  component: React.ReactElement,
  options: Options = {},
) {
  const {
    initialEntries = ['/'],
  } = options;

  const result = renderWithRedux(withRouter(component, initialEntries), options);
  const user = userEvent.setup();

  return {
    ...result, user,
  };
}
