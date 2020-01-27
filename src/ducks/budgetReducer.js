import axios from 'axios';

const intialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

const REQUEST_BUDGET_DATA = 'REQUEST_BDUGET_DATA';
const ADD_PURCHASE = 'ADD_PURCHASE';
const REMOVE_PURCHASE = 'REAMOVE_PURCHASE';

export const requestBudgetData = () => {
    let data = axios.get('/api/budget-data').then(res => res.data)
    .catch(err => err.message);

    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}

export const addPurchase = (price, description, category) => {
    let data = axios.post('/api/budget-data/purchase', {price, description, category}).then(res => res.data)
    .catch(err => err.message);

    return{
        type: ADD_PURCHASE,
        payload: data
    }
}

export const removePurchase = (id) => {
    let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data)
    .catch(err => err.message);

    return {
        type: REMOVE_PURCHASE,
        payload: data
    }
}

export default function budgetReducer(state = intialState, action) {
    switch (action.type){
        case REQUEST_BUDGET_DATA + '_PENDING':
            return {...state, loading: true};
        case REQUEST_BUDGET_DATA + '_FULFILLED':
            return {...state, ...action.payload, loading: false};
        case ADD_PURCHASE + '_PENDING':
            return {...state, loading: true};
        case ADD_PURCHASE + '_FULFILLED':
            return {...state, purchase: action.payload, loading: false};
        case REMOVE_PURCHASE + '_PENDING':
            return {...state, loading: true};
        case REMOVE_PURCHASE + 'FULFILLED':
            return {...state, purchases: action.payload, loading: false};
        default:
            return state;      
    }
}