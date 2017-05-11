const EventRepository = require('./EventRepository');

class Controller {
    static insertEvent(eventObject) {
        return new Promise((resolve, reject) => {

            const event = EventRepository.deserializeEvent(eventObject);
            const parentId = eventObject.parentId || null;

            EventRepository.addEvent(event, parentId).then((eventId) => {

                Controller.getCatalog(eventId).then((catalog) => {
                    resolve(catalog);
                })

            });
        });
    }

    static getCatalog(eventId) {
        return EventRepository.getCatalog(eventId);
    }
}


module.exports = Controller;
