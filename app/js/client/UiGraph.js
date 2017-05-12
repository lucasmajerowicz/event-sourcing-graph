class UiGraph {

    static update(events, selectedEventId, callbackClick) {
        UiGraph.events = events;

        const rootNode = UiGraph.eventsAsTree(events, selectedEventId);
        const simple_chart_config = {
            chart: {
                container: "#graph",
                rootOrientation: "WEST",
                nodeAlign: "BOTTOM",
                connectors: {
                    style: {
                        "stroke-width": 2
                    }
                }
            },

            nodeStructure: rootNode
        };
        const my_chart = new Treant(simple_chart_config);


        $('#graph .node').click((e) => {
            console.log(e.target);
            let index = $(e.target).attr('event-index');
            if (!index) {
                index = $(e.target).find('p').attr('event-index');
            }
            const event = UiGraph.events[index];
            console.log(event, index, UiGraph.events);

            callbackClick(event);
        });
    }

    static eventsAsTree(events, selectedEventId) {
        const nodesById = UiGraph.getNodesById(events);

        UiGraph.markEvents(nodesById, selectedEventId);

        let root = null;
        events.forEach((event) => {
            const node = nodesById[event.id];

            if (event.parentId) {
                nodesById[event.parentId].children.push(node);
            } else {
                root = node;
            }
        });

        return root;
    }

    static getNodesById(events) {
        const nodesById = {};

        let i = 0;
        events.forEach((event) => {
            const node = {
                parentId: event.parentId,
                children: [],
                innerHTML: $('<p/>', {
                    text: event.name.replace('Event', '')
                }).attr('event-index', i).addClass('withEvent').prop('outerHTML')
            };

            nodesById[event.id] = node;
            i++;
        });
        return nodesById;
    }

    static markEvents(nodesById, selectedEventId) {
        let node = nodesById[selectedEventId];
        node.HTMLclass = 'selected';

        do {
            if (node.parentId) {
                node = nodesById[node.parentId];
                node.HTMLclass = 'selectedParent';
            } else {
                node = null;
            }

        } while (node);
    }
}

UiGraph.events = [];


module.exports = UiGraph;