// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_AUTH":
//       const newState = {
//         ...action.payload,
//       };
//       return newState;
//     default:
//       return state;
//   }
// };

export const authReducer = (state, action) => {
	const {
		type,
		payload: { isAuthenticated, user }
	} = action

	switch (type) {
		case 'SET_AUTH':
			return {
				...state,
				authLoading: false,
				isAuthenticated:action.payload.isAuthenticated,
				user:action.payload.user,
			}

		default:
			return state
	}
}

//action gồm type, payload