function asInt(envValue: string, defaultTo: number): number {
    return castOrDefault(envValue, defaultTo, v => parseInt(v, 10));
}

function asBool(envValue: string, defaultTo: boolean): boolean {
    return castOrDefault(envValue, defaultTo, v => v.toLowerCase() === 'true');
}

function castOrDefault<T>(envValue: string, defaultTo: T, castAction: (value: any) => T) {
    if (envValue) {
        return castAction(envValue);
    } else {
        return defaultTo;
    }
}

export default {
    serviceName: 'cat-service',
    version: require('pjson').version,
    instanceName: process.env.INSTANCE_NAME || 'localhost',
    testFeaturesEnabled: asBool(process.env.TEST_FEATURES_ENABLED, true),
    logLevel: asInt(process.env.LOG_LEVEL, 0),
    port: asInt(process.env.PORT, 3000),
    reportMetrics: asBool(process.env.REPORT_METRICS, false),
    oAuth2Runtime: {
        audience: process.env.OAUTH2_AUDIENCE || 'https://test-api.dat.com',
        issuer: process.env.OAUTH2_ISSUER || 'https://login.test.dat.com/'
    },
    aws: {
        dynamoDb: {
            region: process.env.DYNAMODB_REGION || 'us-west-2',
            tablePrefix: process.env.DYNAMODB_ENV_PREFIX || '',
        },
        isLocal: true
    },
};
