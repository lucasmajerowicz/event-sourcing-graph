const EventRepository = require('./EventRepository');

class Controller {
    static insertEvent(eventObject) {
        const event = EventRepository.deserializeEvent(eventObject);
        const parentId = eventObject.parentId || null;

        EventRepository.addEvent(event, parentId);
    }
}


module.exports = Controller;
