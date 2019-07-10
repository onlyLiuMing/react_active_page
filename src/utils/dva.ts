import { create } from 'dva-core';
import dvaLoading from 'dva-loading';
import { createLogger } from 'redux-logger';

let app;
let store;
let dispatch;
let registered;

function createApp(option) {
  // redux日志(开发环境有效)
  if (process.env.NODE_ENV === 'development') {
    option.onAction = [createLogger()]
  }
  app = create(option);
  app.use(dvaLoading({}));

  if (!registered) option.models.forEach(model => { app.model(model) });
  registered = true;
  app.start();

  store = app._store;
  app.getStore = () => store;
  app.use({
    onError(err) {
      console.error(err)
    }
  });


  dispatch = store.dispatch;

  app.dispatch = dispatch;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch
  }
}

