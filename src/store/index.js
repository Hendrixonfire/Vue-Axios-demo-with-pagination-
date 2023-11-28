
import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
state() {
    return {
        transactions: [
           ],
    };
},
mutations: {
    loadTransactions(state, payload) {
        state.transactions = payload;
    },
},

actions: {
    async loadTrans({commit}){
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            commit('loadTransactions', response.data)

        } catch (error) {
                console.error('Error loading data:', error);
        }
    },
},
getters: {
    trans (state) {
        return state.transactions;
    },
    getTransById: (state) => (id) => {
      
        return state.transactions.find(transaction => transaction.id === id);
     
    }

    
},
});