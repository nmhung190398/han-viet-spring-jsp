window.VCSAdminChartJsFunctions = {
    updatePieChartOptions: (elementId, model) => {
        if (!elementId || !model) {
            return;
        }
        console.log('updateOptionsPie');
        var labels = model.data.map(p => p.label);
        var values = model.data.map(p => p.value);
        const options = {
            series: values,
            labels: labels
        };
        ApexCharts.exec(elementId, 'updateOptions', options, true, true);
    },
    initPieChart: (elementId, model, style) => {
        if (!model)
            return

        console.log(model);
        var labels = model.data.map(p => p.label);
        var values = model.data.map(p => p.value);
        const options = {
            series: values,
            chart: {
                id: elementId,
                type: 'pie',
            },
            labels: labels,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };

        if (style.width && style.width > 0) {
            options.chart.width = style.width;
        }
        if (style.height && style.height > 0) {
            options.chart.height = style.height;
        }

        var selector = document.getElementById(elementId);
        console.log(selector);
        var chart = new ApexCharts(selector, options);
        chart.render();
    },
    updateBarChartOptions: (elementId, model) => {
        if (!elementId || !model) {
            return;
        }
        console.log('updateOptionsChart');
        const options = {
            series: model.series,
            xaxis: {
                categories: model.categories,
            }
        };
        ApexCharts.exec(elementId, 'updateOptions', options, true, true);
    },
    initBarChart: (elementId, model, style) => {
        console.log(model);
        if (!model)
            return;
        var options = {
            series: model.series,
            chart: {
                id: elementId,
                type: 'bar',
                height: 430
            },
            plotOptions: {
                bar: {
                    horizontal: style.horizontal,
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            dataLabels: {
                enabled: true,
                offsetX: -6,
                style: {
                    fontSize: '12px',
                    colors: ['#000']
                }
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                categories: model.categories,
            },
        };


        if (style.width && style.width > 0) {
            options.chart.width = style.width;
        }
        if (style.height && style.height > 0) {
            options.chart.height = style.height;
        }

        var chart = new ApexCharts(document.getElementById(elementId), options);
        chart.render();
    },

    initLineChart: (elementId, model, style) => {
        console.log(model);
        if (!model)
            return;
        var options = {
            chart: {
                id: elementId,
                type: "area"
            },
            dataLabels: {
                enabled: false
            },
            series: model.series,
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 90, 100]
                }
            },
            xaxis: {
                categories: model.categories
            }
        };


        if (style.width && style.width > 0) {
            options.chart.width = style.width;
        }
        if (style.height && style.height > 0) {
            options.chart.height = style.height;
        }

        var chart = new ApexCharts(document.getElementById(elementId), options);
        chart.render();
    },
    updateLineChartOptions: (elementId, model) => {
        if (!elementId || !model) {
            return;
        }
        console.log('updateLineChartOptions-' + elementId);
        const options = {
            series: model.series,
            xaxis: {
                categories: model.categories
            }
        };
        ApexCharts.exec(elementId, 'updateOptions', options, true, true);
    },

    irssSlider: (model) => {
        console.log(model);
        var $range = $(".js-range-slider"),
            $input = $(".js-input"),
            instance,
            min = model.min;
            max = model.max;
        $range.ionRangeSlider({
            skin: "big",
            type: "single",
            min: min,
            max: max,
            from: model.now,
            block: true,
            onStart: function (data) {
                $input.prop("value", data.from);
            },
            onChange: function (data) {
                $input.prop("value", data.from);
            }
        });

        instance = $range.data("ionRangeSlider");

        $input.on("change keyup", function () {
            var val = $(this).prop("value");

            // validate
            if (val < min) {
                val = min;
            } else if (val > max) {
                val = max;
            }

            instance.update({
                from: val
            });
        });
    }

};