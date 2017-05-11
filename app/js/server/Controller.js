const EventRepository = require('./EventRepository');

class Controller {
    static insertEvents(eventObjects, parentId) {
        return new Promise((resolve, reject) => {

            if (eventObjects.length > 0) {
                const event = EventRepository.deserializeEvent(eventObjects.shift());

                EventRepository.addEvent(event, parentId).then((eventId) => {
                    resolve(Controller.insertEvents(eventObjects, eventId))
                });
            } else {
                Controller.getCatalog(parentId).then((catalog) => {
                    resolve(catalog);
                })
            }
        });
    }



    static getCatalog(eventId) {
        return EventRepository.getCatalog(eventId);
    }
}


module.exports = Controller;
