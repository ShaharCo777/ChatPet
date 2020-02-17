import uuid from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from './consts'

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4()
  dispatch({
    type: SET_ALERT,
    data: { msg, alertType, id }
  });

  setTimeout(() => dispatch({
       type: REMOVE_ALERT, data: id }), timeout)
}
