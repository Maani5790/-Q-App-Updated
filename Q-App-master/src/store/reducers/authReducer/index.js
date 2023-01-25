export default function reducer(state = {}, action) {
  switch (action.type) {
    case "USER_AUTH":
      return { ...state, theme: action.data };
      break;
    default:
      return state;
  }
}
