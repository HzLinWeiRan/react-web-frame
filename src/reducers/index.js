import { combineReducers } from 'redux';
import apis from '@/fetch';

// 初始化状态
const initialState = {
    apis,
    visiable: false
};
let loadChild = 0;
function root(state = initialState, action) {
    switch (action.type) {
    case 'LOADING':
        loadChild += 1;
        return {
            ...state,
            visiable: loadChild !== 0,
        };
    case 'UNLOADING':
        if (loadChild > 0) loadChild -= 1;
        return {
            ...state,
            visiable: loadChild !== 0,
        };
    default:
        return state;
    }
}

const rootReducer = combineReducers({
    root,
});

export default rootReducer;
