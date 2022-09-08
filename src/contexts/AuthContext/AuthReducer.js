
const authReducer = (state, action) => {
    switch(action.type){
        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser: action.payload,
                loading: false
            };
            
    }
}


export default authReducer;