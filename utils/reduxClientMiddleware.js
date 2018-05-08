export default function clientMiddleware(client) {
  return ({dispatch, getState}) => (next) => (action) => {
    console.log('event fired', action);
    if (typeof action === 'function') {
      return action(dispatch, getState, client);
    }

    const {promise, types, ...rest} = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({...rest, type: REQUEST});

    const actionPromise = promise(client);
    actionPromise
      .then((result) => {
        return next({...rest, result, type: SUCCESS});
      }, (error) => {
        console.log('caught error, in then', error);
        next({...rest, error, type: FAILURE});
      })
      .catch((error) => {
        console.error('MIDDLEWARE ERROR:', error);
        console.log('caught error', error);
        next({...rest, error, type: FAILURE});
      });

    return actionPromise;
  };
}
