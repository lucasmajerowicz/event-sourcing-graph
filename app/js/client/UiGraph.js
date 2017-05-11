class UiGraph {

    static update(events, callbackClick) {
        UiGraph.events = events;

        let parentNode = null;
        let prevNode = null;

        let i = 0;
        events.forEach((event) => {
            const node = {
                children: [],
                innerHTML: $('<div/>', {
                    text: event.name
                }).attr('event-index', i).prop('outerHTML')
            };

            if (prevNode != null) {
                prevNode.children.push(node);
            } else {
                parentNode = node;
            }

            prevNode = node;
            i++;
        });

        const simple_chart_config = {
            chart: {
                container: "#graph",
                nodeAlign: "TOP",
                connectors: {
                    type: "step",
                    style: {
                        "stroke-width": 2
                    }
                },
                node: {
                    HTMLclass: "big-commpany"
                }
            },

            nodeStructure: parentNode
        };
        const my_chart = new Treant(simple_chart_config);


        $('#graph .node').click((e) => {
            const index = $(e.target).attr('event-index');
            const event = UiGraph.events[index];
            callbackClick(event);
        });
    }
}

UiGraph.events = [];


module.exports = UiGraph;