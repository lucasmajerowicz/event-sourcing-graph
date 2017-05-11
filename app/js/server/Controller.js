const EventRepository = require('./EventRepository');

class Controller {
    static insertEvents(eventObjects, parentId, callback) {
            if (eventObjects.length > 0) {
                const event = EventRepository.deserializeEvent(eventObjects.shift());
                EventRepository.addEvent(event, parentId).then((eventId) => {
                    Controller.insertEvents(eventObjects, eventId, callback)
                });
            } else {
                Controller.getCatalog(parentId).then((catalog) => {
                    callback(catalog);
                })
            }
    }

    static getCatalog(eventId) {
        return EventRepository.getCatalog(eventId);
    }

    static getEvents(catalogId) {
        return EventRepository.getEventsForCatalog(catalogId);
    }

}


module.exports = Controller;
