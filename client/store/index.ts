import { createStore } from "easy-peasy";
import authModel, { AuthModel } from "./auth-model";

export type StoreType = {
    auth: AuthModel
}

const store = createStore<StoreType>({
    auth: authModel
})

export default store;