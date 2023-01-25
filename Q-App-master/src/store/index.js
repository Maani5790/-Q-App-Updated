import { createStore } from "redux";
import reducer from "./reducers/authReducer";

const store = createStore(reducer);

export { store };
