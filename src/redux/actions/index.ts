
export const SET_EMAIL = 'SET_EMAIL';

export function setEmail(email: string) {
  return {
    type: SET_EMAIL,
    payload: email,
  };
}
