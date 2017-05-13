const EventRepository = require('./EventRepository');

class Controller {
    static insertEvents(eventObjects, parentId, callback) {
        if (eventObjects.length > 0) {
            const event = EventRepository.deserializeEvent(eventObjects.shift());
            EventRepository.addEvent(event, parentId).then((eventId) => {
                Controller.insertEvents(eventObjects, eventId, callback)
            }).catch((e) => callback(e));
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

    static deleteEvent(eventId) {
        return new Promise((resolve, reject) => {
            EventRepository.deleteEvent(eventId).then((event) => {
                if (event) {
                    Controller.getCatalog(event.id).then((catalog) => {
                        resolve(catalog);
                    }).catch((e)=> reject(e));
                } else {
                    resolve({});
                }
            });
        });
    }

    static mergeEvents(eventId, eventFromId, callback) {
        return new Promise((resolve, reject) => {
            EventRepository.getEventsforMerge(eventId, eventFromId).then((events) => {
                Controller.insertEvents(events, eventId, resolve);
            });
        });
    }
}


module.exports = Controller;
