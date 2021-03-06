/**
 * @class AlertService
 */
class AlertService {

    /**
     * Creates an instance of AlertService.
     * @memberof AlertService
     */
    constructor() { }

    /**
     * @param {String} type of the alert
     * @returns the necessary resolver for the alert
     * @memberof AlertService
     */
    getResolver(type = 'defaultResolver') {
        try {
            let resolver = require('./resolvers/' + type);
            return resolver;
        } catch (e) {
            let defaultResolver = require('./resolvers/defaultResolver');
            return defaultResolver;
        }
    };

    /**
     * @param {Alert} alert
     * @memberof AlertService
     */
    async accept(alert) {
        let resolver = this.getResolver(alert.type);
        return await resolver.accept(alert);
    }

    /**
     * @param {Alert} alert
     * @memberof AlertService
     */
    async reject(alert) {
        let resolver = this.getResolver(alert.type);
        return await resolver.reject(alert);
    }
}

module.exports = AlertService;
