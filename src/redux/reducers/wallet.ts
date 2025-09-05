
export type walletStateType = {
  expenses: any[];
}

const initialState: walletStateType = {
  expenses: [],
};

export default function walletReducer(state = initialState, action: any): walletStateType {
  switch (action.type) {
    default:
      return state;
  }
}
