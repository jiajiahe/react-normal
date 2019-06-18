import reducers from './reducers';
import layoutReducers from '../layout/reducers';
import sagas from './sagas';
import view from './view';

export default {
    reducers: {admin: reducers,layout:layoutReducers},
    sagas: {admin: sagas},
    view: view
}

