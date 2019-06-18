import reducers from './reducers';
import sagas from './sagas';
import view from './view';

export default {
    reducers: {layout: reducers},
    sagas: { layout: sagas},
    view: view
}

