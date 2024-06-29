import { all, spawn, call } from "redux-saga/effects";

import { watchAuthSaga } from "../../components/auth/sagas";
import { watchCreationsSaga } from "../../components/creations/sagas";
import { watchDetailViewSaga } from "../../components/detailView/sagas";
import { watchSnackbarSaga } from "../../components/snackBar/sagas";
import { watchProfileSaga } from "../../components/profile/sagas";
import { watchAdminSaga } from "../../components/admin/sagas";

/* This strategy maps our child sagas to spawned generators (detaching them from the root parent)
which start our sagas as subtasks in a try block. Our saga will run until termination, and then be
automatically restarted. The catch block harmlessly handles any error that may have been thrown by,
and terminated, our saga. */

export default function* rootSaga() {
    const sagas = [
        watchAuthSaga,
        watchSnackbarSaga,
        watchCreationsSaga,
        watchDetailViewSaga,
        watchProfileSaga,
        watchAdminSaga
    ];

    yield all(
        sagas.map((saga) =>
            spawn(function* () {
                while (true) {
                    try {
                        yield call(saga);
                        break;
                    } catch (reason) {
                        console.error(reason);
                    }
                }
            })
        )
    );
}
