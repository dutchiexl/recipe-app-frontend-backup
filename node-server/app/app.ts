import ApiServer from './api/server';
import AssetServer from './assets/server';

ApiServer.bootstrap().start(3333);
AssetServer.bootstrap().start(3334);
