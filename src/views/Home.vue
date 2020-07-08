<template>
    <div class="home">
        <div>{{ msg }}</div>
        <div id="myDiagramDiv" style="width:800px; height:450px; background-color: #DAE4E4;"></div>
        <div @click="handleAddClick">add</div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import go from 'gojs';
export default {
    components: {},
    data() {
        return {
            msg: process.env.NODE_ENV,
            myDiagram: null,
            model: [],
            nodeDataArray: []
        };
    },
    mounted() {
        var $ = go.GraphObject.make;
        this.myDiagram = $(go.Diagram, 'myDiagramDiv', {
            'undoManager.isEnabled': true,
            layout: $(
                go.TreeLayout, // specify a Diagram.layout that arranges trees
                { angle: 90, layerSpacing: 35 }
            )
        });

        // the template we defined earlier
        this.myDiagram.nodeTemplate = $(
            go.Node,
            'Horizontal',
            { background: '#44CCFF' },
            $(go.Picture, { margin: 10, width: 50, height: 50, background: 'red' }, new go.Binding('source')),
            $(go.TextBlock, 'Default Text', { margin: 12, stroke: 'white', font: 'bold 16px sans-serif' }, new go.Binding('text', 'name'))
        );

        this.model = $(go.TreeModel);
        this.nodeDataArray = [
            { key: '1', name: 'Don Meow', source: 'cat1.png' },
            { key: '2', parent: '1', name: 'Demeter', source: 'cat2.png' },
            { key: '3', parent: '1', name: 'Copricat', source: 'cat3.png' },
            { key: '4', parent: '3', name: 'Jellylorum', source: 'cat4.png' },
            { key: '5', parent: '3', name: 'Alonzo', source: 'cat5.png' },
            { key: '6', parent: '1', name: 'Munkustrap', source: 'cat6.png' },
            { key: '7', parent: '2', name: 'Munkustrap', source: 'cat6.png' }
        ];
        this.model.nodeDataArray = this.nodeDataArray;
        this.myDiagram.model = this.model;
    },
    methods: {
        handleAddClick() {
            const obj = { key: this.nodeDataArray.length + 1, parent: '3', name: 'Don Meow' + 1, source: 'cat1.png' };
            this.nodeDataArray.push(obj);
            this.model.nodeDataArray = this.nodeDataArray;
            console.log(this.model.nodeDataArray);
            this.myDiagram.model = this.model;
        }
    }
};
</script>
