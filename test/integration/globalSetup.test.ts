import {closeTestServer} from '../testHelpers/testService';

after('destroy running server', () => {
    return closeTestServer();
});
