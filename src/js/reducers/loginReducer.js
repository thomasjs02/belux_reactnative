import {
  LOGGED_IN
} from '../constants/action-types';

const initialState = {
  userIsLoggedIn: false
};

export function loginReducer(state=initialState, action) {
  switch (action.type) {

      case LOGGED_IN:

          const userKey = action.isLoggedIn;
          const lastLoginDate = action.dateOfLastLogin;
          const today = new Date().getTime();
          const daysElapsed = Math.round(
              (today - lastLoginDate) / 86400000
              );
          let trulyLoggedIn = false;
          if (userKey !== null && (daysElapsed < 14)) {
              trulyLoggedIn = true;
          } else { trulyLoggedIn = false }
          return {
              userIsLoggedIn: trulyLoggedIn
          };

      default:
          return state;
  }
}