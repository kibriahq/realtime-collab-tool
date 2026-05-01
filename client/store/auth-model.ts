import { action, persist, Action } from "easy-peasy";

type User = Record<string, any>;

export type AuthModel = {
    user: User;
    isAuth: boolean;
    login: Action<AuthModel, User>;
    signup: Action<AuthModel, User>;
    logout: Action<AuthModel, User>;
}

const authModel = persist<AuthModel>({
    user: {},
    isAuth: false,
    login: action((state, user) => {
        state.isAuth = true;
        state.user = user;
    }),
    signup: action((state, user) => {
        state.isAuth = true;
        state.user = user;
    }),
    logout: action((state) => {
        state.isAuth = false;
        state.user = {};
    })
})

export default authModel;