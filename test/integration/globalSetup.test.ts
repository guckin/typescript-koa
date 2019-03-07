import {closeTestServer} from '../testHelpers/testService';
import * as log from '../../lib/logger'

before('set logging', () => {
    log.setLogging(false);
});

after('destroy running server', () => {
    return closeTestServer();
});
