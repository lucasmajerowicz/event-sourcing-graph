class UiGraph {

    static update(events, selectedEventId, selectedEventId2, callbackClick) {
        UiGraph.events = events;

        const rootNode = UiGraph.eventsAsTree(events, selectedEventId, selectedEventId2);
        const simple_chart_config = {
            chart: {
                container: "#graph",
                rootOrientation: "WEST",
                nodeAlign: "BOTTOM",
                connectors: {
                    style: {
                        "stroke-width": 1,
                        "stroke": "#3C3C3A"
                    }
                }
            },

            nodeStructure: rootNode
        };

        new Treant(simple_chart_config);

        $('#graph .node').click((e) => {
            let index = $(e.target).attr('event-index');
            if (!index) {
                index = $(e.target).find('p').attr('event-index');
            }
            const event = UiGraph.events[index];

            callbackClick(event, e.ctrlKey);

            if (e.ctrlKey) {
                UiGraph.update(events, selectedEventId, event.id, callbackClick);
            }
        });
    }

    static eventsAsTree(events, selectedEventId, selectedEventId2) {
        const nodesById = UiGraph.getNodesById(events, selectedEventId2);

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

    static getNodesById(events, selectedEventId2) {
        const nodesById = {};

        let i = 0;
        events.forEach((event) => {
            let name = event.name.replace('Event', '');

            if (event.name == 'AddBranchEvent') {
                name = event.branchName;
            }

            const node = {
                parentId: event.parentId,
                children: [],
                innerHTML: $('<p/>', {
                    text: name
                }).attr('event-index', i).addClass('withEvent').prop('outerHTML')
            };

            if (event.name == 'AddBranchEvent') {
                node.HTMLclass = 'branch';
            }

            if (selectedEventId2 && event.id == selectedEventId2) {
                node.HTMLclass = 'selectedSecond';
            }

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

                if (node.HTMLclass != 'branch') {
                    node.HTMLclass = 'selectedParent';
                }
            } else {
                node = null;
            }

        } while (node);
    }
}

UiGraph.events = [];


module.exports = UiGraph;