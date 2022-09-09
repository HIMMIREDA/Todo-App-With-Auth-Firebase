
const authReducer = (state, action) => {
    switch(action.type){
        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser: action.payload,
                loading: false
            };
        
        case "UPDATE_PROFILE":
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...action.payload
                }
            };
    }
}


export default authReducer;