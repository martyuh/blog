export default (state=[], action) =>{

    switch(action.type){
        case 'FETCH_USER':
            // pass in state and add in new user
            return[...state, action.payload]
        default:
            return state;
    }

}