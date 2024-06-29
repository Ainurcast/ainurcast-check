import { takeLatest, put, call, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga'
import * as snackbarAction from './actions';
import { SHOW_SNACKBAR } from "./constants";


function countdown(secs) {
    return eventChannel(emitter => {
        const iv = setInterval(() => {
            secs -= 1;
            if (secs > 0) {
                emitter(secs)
            } else {
                // this causes the channel to close
                emitter(END);
            }
        }, 1000);
        // The subscriber must return an unsubscribe function
        return () => {
            clearInterval(iv);
        }
    }
    )
}

export function* showSnackBar(action) {
    const value = 4;
    yield put(snackbarAction.updateSnackBar(action.payload));
    const chan = yield call(countdown, value);

    try {
        while (true) {
            // take(END) will cause the saga to terminate by jumping to the finally block
            yield take(chan);
        }
    } finally {
        yield put(snackbarAction.hideSnackBar());
    }
}

export function* watchSnackbarSaga() {
    yield takeLatest(SHOW_SNACKBAR, showSnackBar);
}