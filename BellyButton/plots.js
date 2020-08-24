function init() {
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
    });
})}



function optionChanged(newSample) {
    buildMetadata(newSample);
    buildBarChart(newSample);

}

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");

        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(key.toUpperCase() + ': ' + value); 
        })


        var wash_freq = result.wfreq;
        console.log(wash_freq);
    
            
        var gauge_trace = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: wash_freq,
            title: {text: "Belly Button Washing Frequency <br> Scrubs per Week", font: {size: 20}},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 10]},
                bar: { color: "#2979ff blue accent-3" },
                steps: [
                { range: [0, 1], color: '#fff3e0 orange lighten-5' },
                { range: [1, 2], color: '#ffe0b2 orange lighten-4' },
                { range: [2, 3], color: '#ffcc80 orange lighten-3' },
                { range: [3, 4], color: '#ffb74d orange lighten-2' },
                { range: [4, 5], color: '#ffa726 orange lighten-1' },
                { range: [5, 6], color: '#ff9800 orange' },
                { range: [6, 7], color: '#fb8c00 orange darken-1' },
                { range: [7, 8], color: '#f57c00 orange darken-2' },
                { range: [8, 9], color: '#ef6c00 orange darken-3' },
                { range: [9, 10], color: '#e65100 orange darken-4' }
                ],
            }  
        }
    ];
            
            var gauge_layout = {
    
                width: 500, 
                height: 500, 
                margin: { t: 0, b: 0 },
                paper_bgcolor: "#d7ccc8 brown lighten-4"
            };
            
            Plotly.newPlot('gauge', gauge_trace, gauge_layout)

    });
}


function buildBarChart(sample) {
    d3.json("samples.json").then((data) => {
        var resultArray = data
        .samples
        .filter(sampleObj => {
        return sampleObj.id == sample
    });
        var result = resultArray[0];
        var top_ten_otu_ids = result.otu_ids.slice(0, 10).map(numericIds => {
        return 'OTU ' + numericIds;}).reverse();

        var top_ten_sample_values = result.sample_values.slice(0, 10).reverse();
        var top_ten_otu_labels = result.otu_labels.slice(0, 10).reverse();

        Otu_ids = result. otu_ids;
        Sample_values = result.sample_values;
        Otu_labels = result.otu_labels;

        var bar_trace = [
        {
            x: top_ten_sample_values,  
            y: top_ten_otu_ids,
            text: top_ten_otu_labels,
            name: "Top 10",
            type: 'bar',
            orientation: 'h'
        }];

        var data = [bar_trace];

        var bar_layout = {
            title: "Top 10 OTUs",
    
        };
        
        Plotly.newPlot('bar', bar_trace, bar_layout);
    

        var bubble_trace = [{
            
            x:Otu_ids,  
            y:Sample_values,
            text:Otu_labels,
            mode: 'markers',
            marker: {
                color: "#fafafa grey lighten-5",
                size: Sample_values,
                colorscale: "Jet"
            }
        }]
            var bubble_layout = {
                xaxis: { title: "OTU ID"},
                height: 450,
                width: 950,
                paper_bgcolor: "#d7ccc8 brown lighten-4",
                plot_bgcolor: "#d7ccc8 brown lighten-4"
            };
            Plotly.newPlot("bubble", bubble_trace, bubble_layout);

            
            });
     };

     init()
