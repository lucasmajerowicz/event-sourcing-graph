const AddCatalogEvent = require('./js/events/AddCatalogEvent');
const AddCategoryEvent = require('./js/events/AddCategoryEvent');
const AddProductEvent = require('./js/events/AddProductEvent');
const SetProductCategoryEvent = require('./js/events/SetProductCategoryEvent');
const SetProductAttributeEvent = require('./js/events/SetProductAttributeEvent');
const EventRepository = require('./js/EventRepository');

const event = new AddCatalogEvent('c_id', 'my 111');

const catalog = event.process();

const event2 = new AddCategoryEvent(catalog, 'c1', 'cat1');
const event3 = new AddProductEvent(catalog, 'p1', 'pp');
const event4 = new SetProductCategoryEvent(catalog, 'p1', 'c1');
const event5 = new SetProductAttributeEvent(catalog, 'p1', 'price', '100');

event2.process();
event3.process();
event4.process();
event5.process();

console.log(JSON.stringify(catalog));

EventRepository.getEventsForCatalog('c_id').then(result => {
    let catalog = null;
    result.forEach((event) => {
        event.process();
        catalog = event.catalog;
    });
    console.log(catalog);
});


/*
EventRepository.addEvent(event).then(result => {
    EventRepository.addEvent(event2).then(result => {
        EventRepository.addEvent(event3).then(result => {
            EventRepository.addEvent(event4).then(result => {
                EventRepository.addEvent(event5).then(result => {
                    console.log('done');
                    // const singleRecord = result.records[0];
                    // const node = singleRecord.get(0);
                    //
                    // console.log(node.properties.name);
                });
            });
        });
    });
});
*/



