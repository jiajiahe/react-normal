import reducers from './reducers';
import sagas from './sagas';
import view from './view';

export default {
    reducers: {qualityDoc: reducers},
    sagas: {qualityDoc: sagas},
    view: view
}

