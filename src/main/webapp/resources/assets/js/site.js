window.nmhung = {
    groupBy(xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    },
    getDataInUrl(sParam) {
        let sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    },
    formatDataSelect2Multi(data) {
        if (nmhung.isNullOrUndefined(data)) {
            return [];
        }
        if (!Array.isArray(data)) {
            return [data];
        }
        return data;
    },
    getDataInFrm(id) {
        const formData = $(id).serializeArray();
        const data = nmhung.groupBy(formData, 'name');
        Object.keys(data).forEach(item => {
            data[item] = data[item].map(tmp => {
                return tmp.value;
            });
            if (data[item].length == 1) {
                data[item] = data[item][0];
            }
        });
        return data;
    },
    isNullOrUndefined(data) {
        if (data == undefined || data == null) {
            return true;
        }
        return false
    },
    onClick(id, fn, root = null) {
        if (root) {
            $(root).on('click', id, function () {
                fn($(this));
            });
        } else {
            $(document).on('click', id, function () {
                fn($(this));
            });
        }

    },
    arrayAsString(array) {
        if (array) {
            return array.join(', ');
        }

        return '';
    },
    initPagination(id, totalPages, currentPage, fnPageClick) {

        var $currentPage = currentPage;
        $(id).twbsPagination('destroy');
        window.pagObj = $(id).twbsPagination({
            startPage: currentPage,
            totalPages: totalPages,
            visiblePages: 5,
            onPageClick: function (event, page) {
            }
        }).on('page', function (event, page) {
            console.log(page + ' change page');
            fnPageClick(page);
        });
        console.log(window.pagObj);
    },
    token: function () {
        var tokenKey = "strong_hero_nguyen_token";
        return localStorage.getItem(tokenKey);
    },
    clickButton: function (id) {
        document.getElementById(id).click();
    },
    clearValue: function (id) {
        //document.getElementById(id).attributes("value", "");
        id = "#" + id;
        $(id).attr("value", "");
    },
    initLayout: function () {
        KTLayout.init();
        //$.fn.modal.Constructor.DEFAULTS.keyboard = false;
    },
    showClosableModal: function (modalId) {
        $(modalId).modal("show");
    },
    showModal: function (param, fnModelOnShow = null, fnModelOnHide = null) {
        $(param).modal({
            backdrop: 'static',
            keyboard: false  // to prevent closing with Esc button (if you want this too)
        });
        if (fnModelOnShow != null) {
            $(param).on('shown.bs.modal', fnModelOnShow);

        }
        if (fnModelOnHide != null) {
            $(param).on('hidden.bs.modal', fnModelOnHide);
        }

        return param;
    },
    hideModal: function (modalId) {
        $(modalId).modal("hide");
    },
    disposeModel: function (modalId) {
        $(modalId).modal("dispose");
    },
    printElement: function (elementId, bootstrapEnable = false) {

        var divToPrint = document.getElementById(elementId);

        var newWin = window.open('', 'Print-Window');

        newWin.document.open();

        newWin.document.write('<html>');

        if (bootstrapEnable === true) {
            newWin.document.write('<link rel="stylesheet" href="https://partner.vsmart.net/css/bootstrap/bootstrap.min.css">');
        }

        newWin.document.write('<body onload="window.print()">' + divToPrint.innerHTML + '</body>');

        newWin.document.write('</html>');

        newWin.document.close();

        //$(elementId).printMe();
    },
    showError: function (message) {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        toastr.error(message);
    },
    showSuccess: function (message) {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        toastr.success(message);
    },
    showWarning: function (message) {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        toastr.warning(message);
    },
    showConfirmOnly: function (message) {
        Swal.fire({
            title: "Information",
            text: message,
            icon: "warning",
            showCancelButton: false,
            confirmButtonText: "Ok"
        }).then(function (result) {
        });
    },
    showConfirm: function (message, confrimFunctionCallback, title = 'Are you sure?') {
        Swal.fire({
            title: title,
            text: message,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ok"
        }).then(function (result) {
            if (result.value) {
                confrimFunctionCallback()
            }
        });
    },
    showConfirmWithCancel: function (message, dotnetRef, confrimFunctionCallback, cancelFunctionCallback, itemId) {
        Swal.fire({
            title: "Are you sure?",
            text: message,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ok"
        }).then(function (result) {
            if (result.value) {
                dotnetRef.invokeMethodAsync(confrimFunctionCallback, itemId);
            }
            if (result.dismiss == "cancel") {
                dotnetRef.invokeMethodAsync(cancelFunctionCallback, itemId);
            }
        });
    },
    redirectTo401page: function (message) {

    },
    showPageBlockingSpinner: function () {
        KTApp.blockPage({
            overlayColor: '#000000',
            state: 'primary', // a bootstrap color
            size: 'lg' //available custom sizes: sm|lg
        });
    },
    hidePageBlockingSpinner: function () {
        KTApp.unblockPage();
    },
    initDepartmentTreeView: function (param) {

        $(param[0]).jstree({
            "core": {
                'multiple': false,
                "themes": {
                    "responsive": false
                },
                "data": param[1]
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder text-warning"
                },
                "file": {
                    "icon": "fa fa-file  text-warning"
                }
            },
            "plugins": ["types"]
        });

        $(param[0]).on("changed.jstree", function (e, data) {
            if (data.action == "deselect_all") {
                return;
            }
            param[2].invokeMethodAsync('OnDepartmentSelect', data.selected.toString());
            let returnData = {
                elementId: e.target.id,
            };
            if (data.node !== undefined) {
                returnData.id = data.node.id;
            }
            param[2].invokeMethodAsync('OnSelected', returnData);
        });

        $(param[0]).bind('before.jstree', function (e, data) {
            // invoked before jstree starts loading
            let returnData = {
                elementId: e.target.id,
            };
            param[2].invokeMethodAsync('OnBeforeLoadJsTree', returnData);
        })
            .bind('loaded.jstree', function (e, data) {
                // invoked after jstree has loaded
                let returnData = {
                    elementId: e.target.id,
                };
                param[2].invokeMethodAsync('OnLoadedJsTree', returnData);
            })

    },

    // start artice js
    initArticleTreeView: function (params) {
        if (!params || !params[0]) return;
        $(params[0]).jstree({
            "core": {
                'multiple': true,
                "themes": {
                    "responsive": false
                },
                "data": params[1]
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder text-warning"
                },
                "file": {
                    "icon": "fa fa-file  text-warning"
                }
            },
            "plugins": ["types", "checkbox"]
        });
        $(params[0]).on("changed.jstree", function (e, data) {
            if (data.action === "deselect_all") {
                return;
            }
            params[2].invokeMethodAsync('OnSelectTreeItem', {returnData: data.selected, id: params[0]});
        });

        $(params[0]).bind('before.jstree', function (e, data) {
            let returnData = {
                elementId: e.target.id
            };
            params[2].invokeMethodAsync('OnBeforeLoadJsTree', returnData);
        })
            .bind('loaded.jstree', function (e, data) {
                let returnData = {
                    elementId: e.target.id
                };
                params[2].invokeMethodAsync('OnLoadedJsTree', returnData);
            });
    },
    //end artice js

    // start category js
    initCategoryTreeView: function (params) {
        console.log(params[1]);

        if (!params || !params[0]) return;
        $(params[0]).jstree({
            "core": {
                'multiple': false,
                "themes": {
                    "responsive": false
                },
                "data": params[1]
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder text-warning"
                },
                "file": {
                    "icon": "fa fa-file  text-warning"
                }
            },
            "plugins": ["types"]
        });
        $(params[0]).on("changed.jstree", function (e, data) {
            if (data.action === "deselect_all") {
                return;
            }
            params[2].invokeMethodAsync('OnCategorySelect', data.selected);
        });

        $(params[0]).bind('before.jstree', function (e, data) {
            let returnData = {
                elementId: e.target.id
            };
            params[2].invokeMethodAsync('OnBeforeLoadJsTree', returnData);
        })
            .bind('loaded.jstree', function (e, data) {
                let returnData = {
                    elementId: e.target.id
                };
                params[2].invokeMethodAsync('OnLoadedJsTree', returnData);
            });
    },
    customDataSelectedCategory: function (id, elementId) {
        var item = $(id + " " + elementId + "_anchor");
        $(id + " a").attr('style', '');
        item.attr('style', 'background: #beebff;border-radius: 2px;');
    },
    initCategoryChangeTreeView: function (params) {
        if (!params || !params[0]) return;
        $(params[0]).jstree({
            "core": {
                'multiple': false,
                "themes": {
                    "responsive": false
                },
                "data": params[1]
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder text-warning"
                },
                "file": {
                    "icon": "fa fa-file  text-warning"
                }
            },
            "plugins": ["types"]
        });
        $(params[0]).on("changed.jstree", function (e, data) {
            if (data.action === "deselect_all") {
                return;
            }
            params[2].invokeMethodAsync('OnCategoryChangeSelect', data.selected);
        });

        $(params[0]).bind('before.jstree', function (e, data) {
            let returnData = {
                elementId: e.target.id
            };
            params[2].invokeMethodAsync('OnBeforeLoadJsTree', returnData);
        })
            .bind('loaded.jstree', function (e, data) {
                let returnData = {
                    elementId: e.target.id
                };
                params[2].invokeMethodAsync('OnLoadedJsTree', returnData);
            });
    },
    //end category js

    setJsTreeSelected: function (id, value, dotNetRef) {
        console.log("setJsTreeSelected");
        // value is array or single
        $(id).jstree("deselect_all");
        $(id).jstree("select_node", value);
        dotNetRef.invokeMethodAsync('OnSetJsTreeSelected', value);
    },
    clearAllJsTreeSelected: function (id) {
        $(id).jstree("deselect_all");
    },
    clearJsTreeSelected: function (elementId, nodeId) {
        // nodeId is array or single
        $(elementId).jstree("deselect_node", nodeId);
    },
    refreshJsTree: function (id) {
        $(id).jstree("deselect_all");
        $(id).jstree().refresh(true);
    },
    refreshJsTreeData: function (id, data) {
        $(id).jstree(true).settings.core.data = data;
        $(id).jstree(true).refresh();
        $(id).jstree(true).load_node('#');
    },
    disableJsTreeNode: function (elementId, nodeId) {
        $(elementId).jstree().disable_node(nodeId);
    },
    expandJsTreeNode: function (elementId, nodeId) {
        $(elementId).toggle_node(nodeId);
    },
    setNewDataJsTree: function (elementId, newData) {
        $(elementId).jstree(true).settings.core.data = newData;
        $(elementId).jstree(true).refresh();
    },
    initSelect2DropDown: function (id, dotnetRef, selectedValues, placeholder) {

        $(id).select2({
            placeholder: placeholder,
            width: "100%"
        });

        $(id).val(selectedValues).trigger('change');

        $(id).on('select2:select', function (e) {
            dotnetRef.invokeMethodAsync('OnSelectMultiItem', $(id).val());
        });
        $(id).on('select2:unselect', function (e) {
            dotnetRef.invokeMethodAsync('OnUnSelectMultiItem', $(id).val());
        });
    },
    initSingleSelect2DropDown: function (id, dotnetRef, selectedValues) {

        $(id).select2({
            placeholder: "Select a state",
            width: "100%"
        });

        $(id).val(selectedValues).trigger('change');

        $(id).on('select2:select', function (e) {
            dotnetRef.invokeMethodAsync('OnSelectSingleItem', $(id).val());
        });
        $(id).on('select2:unselect', function (e) {
            dotnetRef.invokeMethodAsync('OnUnSelectSingleItem', $(id).val());
        });
    },
    setValueForSelect2: function (id, selectedValues) {
        $(id).val(selectedValues).trigger('change');
    },
    refreshDropdown: function (id) {
        if ($(id).find('option').length > 0) {
            $(id).find('option')
                .remove()
                .end();
        }
    },
    languageSelected: function (id) {
        $(".language").css('border-color', '#ffffff');
        $("#language" + id).css('border-color', '#1bc5bd');
    },
    getBrowserLocale: function () {
        return (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
    },
    showDatePicker: function (id) {
        $(id).datepicker("show");
    },
    initDatePicker: function (id, format, value, dotnetRef) {
        console.log("value date time : " + value);
        var arrows;
        if (KTUtil.isRTL()) {
            arrows = {
                leftArrow: '<i class="la la-angle-right"></i>',
                rightArrow: '<i class="la la-angle-left"></i>'
            }
        } else {
            arrows = {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            }
        }

        $(id).datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: "linked",
            clearBtn: true,
            todayHighlight: true,
            templates: arrows,
            format: format.toLowerCase(),
            autoclose: true,
            value: value
        })
            .on("input change", function (e) {
                var val = e.target.value;
                if (val === null || !val) {
                    dotnetRef.invokeMethodAsync('OnSetDate', null);
                } else {
                    dotnetRef.invokeMethodAsync('OnSetDate', val);
                }
                console.log(val);
            });
        if (value) {
            $(id).datepicker('setDate', value);
        }
    },
    initDateTimePicker: function (id, format, dotnetRef) {
        dotnetRef.invokeMethodAsync('Test', '123');
        var arrows;
        if (KTUtil.isRTL()) {
            arrows = {
                leftArrow: '<i class="la la-angle-right"></i>',
                rightArrow: '<i class="la la-angle-left"></i>'
            }
        } else {
            arrows = {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            }
        }

        $(id).datetimepicker({
            //rtl: KTUtil.isRTL(),
            todayBtn: "linked",
            clearBtn: true,
            todayHighlight: true,
            //templates: arrows,
            //format: format,
            minuteStep: 1,
            showSeconds: false,
            showMeridian: true,
            snapToStep: true,
            autoUpdateInput: false,
            cancelLabel: 'Clear',
        })
            .on("input change", function (e) {
                var val = e.target.value;
                if (val === null || !val) {
                    dotnetRef.invokeMethodAsync('OnSetDateTime', null);
                } else {
                    dotnetRef.invokeMethodAsync('OnSetDateTime', val);
                }
                console.log(val);
            })
            .on('cancel.daterangepicker', function (e, picker) {
                e.target.value = '';
                dotnetRef.invokeMethodAsync('OnSetDateTime', null);
            })
            .on('hide.daterangepicker', function (e, picker) {
                if (e.target.value == null || e.target.value == '') {
                    dotnetRef.invokeMethodAsync('OnSelectItem', null);
                }
            });

    },
    initDateRangePicker: function (elementId, type, dotnetRef) {
        var f = 'MM/DD/YYYY';
        var element = $('#' + elementId);
        // minimum setup
        if (type == 1) {
            $(element).daterangepicker({
                buttonClasses: ' btn',
                applyClass: 'btn-primary',
                cancelClass: 'btn-secondary'
            });
        } else if (type == 2) {		// Input Group Setup
            $(element).daterangepicker({
                buttonClasses: ' btn',
                applyClass: 'btn-primary',
                cancelClass: 'btn-secondary'
            }, function (start, end, label) {
                $(element).val(start.format(f) + ' - ' + end.format(f));
                dotnetRef.invokeMethodAsync('OnSelectItem', $(element).val());
            });
        } else if (type == 3) {		// Predefined Ranges
            //var start = moment().subtract(29, 'days');
            //var end = moment();
            element.daterangepicker({
                buttonClasses: ' btn',
                applyClass: 'btn-primary',
                cancelClass: 'btn-secondary',
                alwaysShowCalendars: true,
                autoUpdateInput: false,
                cancelLabel: 'Clear',
                //startDate: '',
                //endDate: '',
                format: f,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }, function (start, end, label) {
                element.val(start.format(f) + ' - ' + end.format(f));
                dotnetRef.invokeMethodAsync('OnSelectItem', start, end);
            });
            element.on('cancel.daterangepicker', function (ev, picker) {
                element.val('');
                dotnetRef.invokeMethodAsync('OnSelectItem', null, null);
            });
            element.on('hide.daterangepicker', function (ev, picker) {
                if (element.val() == null || element.val() == '') {
                    dotnetRef.invokeMethodAsync('OnSelectItem', null, null);
                }
            });

        }
    },
    datepickerSetValue: function (elementId, item) {
        if (item != null && item != '') {
            $(elementId).datepicker('setDate', new Date(item));
        }
        else {
            $(elementId).datepicker('setDate', null);
        }
        console.log(elementId + ' : ' + item);
    },
    onSetValueDateRangePicker: function (elementId, startDate, endDate) {
        const element = $(`#${elementId}`);
        if (!elementId || !startDate || !endDate) {
            element.val('');
            element.data('daterangepicker').setStartDate(moment());
            element.data('daterangepicker').setEndDate(moment());
            return;
        }
        element.data('daterangepicker').setStartDate(startDate);
        element.data('daterangepicker').setEndDate(endDate);
        element.val(startDate + ' - ' + endDate);
    },
    initTimePicker: function (element, data, dotnetRef) {
        if (!element) {
            return;
        }
        $(element).timepicker({
            minuteStep: 1,
            showSeconds: false,
            showMeridian: false,
            snapToStep: true,
            //template: 'modal'
        }).on("input change", function (e) {
            console.log(e.target.value);
            dotnetRef.invokeMethodAsync('OnSetTime', e.target.value);
        });
        if (data) {
            $(element).timepicker('setTime', data);
        }
    },

    resetTimePicker: function (element) {
        if (!element)
            return;
        $(element).timepicker('setTime', null);
    },

    setValueTimePicker: function (element, value) {
        if (!element)
            return;
        $(element).timepicker('setTime', value);
    },
    select2ComponentInit: function (elementId, placeholder, isMultiple = false, isTag = false) {


        var element = $(elementId);

        const option = {
            placeholder: placeholder,
            allowClear: true,
            tags: isTag,
            cache: false
        };
        if (isMultiple) {
            option.multiple = "multiple"
        }

        var select2 = element.select2(option);

        select2.on('select2:select', function (e) {
            console.log(e);
            // dotnetRef.invokeMethodAsync('OnSelectItem', e.params.data);
        });
        select2.on('select2:unselect', function (e) {
            // dotnetRef.invokeMethodAsync('OnUnSelectItem', e.params.data);
        });
        select2.on('select2:clear', function (e) {
            // dotnetRef.invokeMethodAsync('OnClearSelectItem');
        });
        select2.on('select2:change', function (e) {

            // dotnetRef.invokeMethodAsync('OnChangeSelectItem', e.params.data);
        });


    },
    select2ComponentSetValue: function (elementId, value) {
        var element = $(elementId);

        element.val(value);
        element.trigger('change');
    },
    select2ComponentSetSelect: function (elementId, item) {

        if (item != null) {
            var val = new Set($(elementId).val());
            //$(elementId).val(null).trigger('change');
            if ($(elementId).find("option[value='" + item + "']").length) {
                $(elementId).val([...val]).trigger('change');
            } else {
                var newOption = new Option(item, item, true, true);
                $(elementId).append(newOption).trigger('change');
            }
            val.add(item)

        } else {
            $(elementId).val(null).trigger('change');
        }
    },
    select2ComponentInsertTag: function (elementId, tags) {
        $(elementId).select2({
            insertTag: function (data, tag) {
                // Insert the tag at the end of the results
                data.push(tags);
            }
        });
    },
    select2ComponentSetInvalid: function (elementId, isInvalid) {
        if (isInvalid != null) {
            var containerId = `#select2-${elementId}-container`;
            if (isInvalid) {
                $(containerId).parent().removeClass('control-border-blue').addClass('control-border-red')
            } else {
                $(containerId).parent().removeClass('control-border-red').addClass('control-border-blue')
            }
        } else {
            $(elementId).val(null).trigger('change');
        }
    },
    select2AjaxComponentInit: function (dotnetRef, elementId, urlPath, minimumInputLength, delay, allowClear, placeholder, valueIgnores = []) {

        var element = $('#' + elementId);

        var select2 = element.select2({
            ajax: {
                url: urlPath,
                dataType: 'json',
                contentType: 'application/json',
                delay: delay,
                type: 'POST',
                data: function (params) {
                    console.log(params);
                    var request = dotnetRef.invokeMethod('MakeRequest', params);
                    return JSON.stringify(request);
                },
                transport: function (params, success, failure) {
                    params.beforeSend = function (request) {
                        var token = VCSAdminJsFunctions.token();
                        request.setRequestHeader('Authorization', `Bearer ${token}`);
                    };
                    var $request = $.ajax(params);
                    $request.then(success);
                    $request.fail(failure);
                    return $request;
                },
                processResults: function (data, params) {
                    var result = null;
                    if (valueIgnores != null && valueIgnores.length > 0) {
                        result = data.data.models.filter(item => {
                            return valueIgnores.some(v => v != item.value);
                        });
                    } else {
                        result = data.data.models;
                    }

                    return {
                        results: result
                    };
                },
                cache: false,
                width: '100%'
            },
            escapeMarkup: function (markup) {
                return markup;
            },
            placeholder: placeholder,
            minimumInputLength: minimumInputLength,
            allowClear: allowClear
        });
        if (dotnetRef != null) {
            select2.on('select2:select', function (e) {
                //element.find('option').each(function (i, opt) {
                //    //opt.selected = opt.defaultSelected;
                //    //if (opt.defaultSelected) { console.log(opt); };
                //    if (opt.value != e.params.data.value) {
                //        opt.remove();
                //    }
                //});

                dotnetRef.invokeMethodAsync('OnSelectItem', e.params.data);
            });
            select2.on('select2:unselect', function (e) {
                dotnetRef.invokeMethodAsync('OnUnSelectItem', e.params.data);
            });
            select2.on('select2:clear', function (e) {
                element.find('option').each(function (i, opt) {
                    //opt.selected = opt.defaultSelected;
                    //if (opt.defaultSelected) { console.log(opt); };
                    opt.remove();
                });
                dotnetRef.invokeMethodAsync('OnClearSelectItem');
            });
        }
    },
    select2AjaxComponentDestroy: function (elementId) {
        var element = $('#' + elementId);
        element.select2('destroy');
    },
    select2AjaxComponentSetSelect: function (elementId, item) {

        if (item != null) {
            if ($(elementId).find('option[value=\'' + item.value + '\']').length) {
                $(elementId).val(item.value).trigger('change');
            } else {
                var newOption = new Option(item.text, item.value, true, true);
                $(elementId).append(newOption).trigger('change');
            }
            if (!item.value && !item.text) {
                $(elementId).val(null).trigger('change');
            }
        } else {
            $(elementId).val(null).trigger('change');
        }
    },
    select2AjaxComponentSetInValid: function (elementId, isInvalid) {
        if (isInvalid != null) {
            var containerId = `#select2-${elementId}-container`;

            if (isInvalid) {
                $(containerId).parent().removeClass('control-border-blue').addClass('control-border-red')
            } else {
                $(containerId).parent().removeClass('control-border-red').addClass('control-border-blue')
            }
        } else {
            $(elementId).val(null).trigger('change');
        }
    },
    initSelect2AjaxDropDown: function (id, dotnetRef, selectedValues, token, propertySearch, searchingEndpoint) {
        //$(id).val([]).trigger('change');

        //remove old binding value
        $(id).find('option').each(function (i, opt) {
            //opt.selected = opt.defaultSelected;
            //if (opt.defaultSelected) { console.log(opt); };
            if (!opt.defaultSelected) {
                opt.remove();
            }
        });

        $(id).select2({
            placeholder: "Select a state",
            ajax: {
                url: searchingEndpoint,
                dataType: 'json',
                method: "POST",
                delay: 250,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data:
                    function (params) {
                        var queryParameters = {};
                        queryParameters[propertySearch] = params.term;
                        return JSON.stringify(queryParameters);
                    },
                transport: function (params, success, failure) {
                    params.beforeSend = function (request) {
                        request.setRequestHeader('Authorization', `Bearer ${token}`);
                    };
                    var $request = $.ajax(params);

                    $request.then(success);
                    $request.fail(failure);

                    return $request;
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    //params.page = params.page || 1;
                    //makeSelect2(data.data.model);
                    //dotnetRef.invokeMethodAsync('RefreshData', data.data.model);
                    return {
                        results: data.data.model
                    };
                },

                cache: false
            }
        });

        $(id).val(selectedValues).trigger('change');

        $(id).on('select2:select', function (e) {
            dotnetRef.invokeMethodAsync('OnSelectItem', $(id).val());
        });
        $(id).on('select2:unselect', function (e) {
            dotnetRef.invokeMethodAsync('OnUnSelectItem', $(id).val());
        });
    },
    initImagePickker: function (id, dotnetRef) {
        var avatar4 = new KTImageInput(id);

        avatar4.on('cancel', function (imageInput) {
            //swal.fire({
            //    title: 'Image successfully canceled !',
            //    type: 'success',
            //    buttonsStyling: false,
            //    confirmButtonText: 'Awesome!',
            //    confirmButtonClass: 'btn btn-primary font-weight-bold'
            //});
            dotnetRef.invokeMethodAsync('OnCancelImage');
        });

        avatar4.on('change', function (imageInput) {

            var reader = new FileReader();
            reader.readAsDataURL(imageInput.input.files[0]);
            reader.onload = function () {
                dotnetRef.invokeMethodAsync('OnChangeImage', reader.result);
            };
        });


        avatar4.on('remove', function (imageInput) {
            //swal.fire({
            //    title: 'Image successfully removed !',
            //    type: 'error',
            //    buttonsStyling: false,
            //    confirmButtonText: 'Got it!',
            //    confirmButtonClass: 'btn btn-primary font-weight-bold'
            //});
        });

    },
    bindingImage: function (id, base64Image) {
        var element = KTUtil.getById(id);
        var wrapper = KTUtil.find(element, '.image-input-wrapper');

        KTUtil.addClass(element, 'image-input-changed');
        KTUtil.removeClass(element, 'image-input-empty');
        KTUtil.css(wrapper, 'background-image', 'url(' + base64Image + ')');
    },
    setTableSelectionDefault: function (id) {
        $(id).prop('checked', false);
    },
    createAndDownloadBase64File: function (filename, bytesBase64) {
        var link = document.createElement('a');
        link.download = filename;
        link.href = "data:application/octet-stream;base64," + bytesBase64;
        document.body.appendChild(link); // Needed for Firefox
        link.click();
        document.body.removeChild(link);
    },
    initGroupTreeView: function (id, treeData, dotnetRef) {

        $(id).jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                "data": treeData
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder text-warning"
                },
                "file": {
                    "icon": "fa fa-file  text-warning"
                }
            },
            "plugins": ["types"]
        });

        $(id).on("changed.jstree", function (e, data) {
            dotnetRef.invokeMethodAsync('OnJsTreeSelected', data.selected.toString());
        });

        $(id).jstree(true).settings.core.data = treeData;
    },
    MenuSetActive: function (activeElement) {
        $("#kt_aside_menu_wrapper .menu-item-open").removeClass("menu-item-open menu-item-here");
        $("#kt_aside_menu_wrapper .menu-item-active").removeClass("menu-item-active");
        $("#kt_aside_menu_wrapper #" + activeElement).closest('.menu-item-submenu').addClass("menu-item-open menu-item-here");
        $("#kt_aside_menu_wrapper #" + activeElement).addClass("menu-item-active");
    },

    resetInputFile: function (id) {
        console.log(id)
        $("#" + id).val(null);
    },

    InitCkeditor: function (params) {
        if (!params || !params[0])
            return;

        ClassicEditor.create(document.getElementById(params[0]), {
            extraPlugins: [CustomUploadAdapterPlugin],
        }).then((editor) => {
            editor.setData(params[1] ? params[1] : "");

            editor.editing.view.document.on('blur', () => {
                params[2].invokeMethodAsync("OnchangeContent", editor.getData());
            });
        }).catch(error => {
            console.error(error);
        });
    },

    openPDFBase64: function (data) {
        let pdfWindow = window.open("");
        pdfWindow.document.write(
            "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
            encodeURI(data) +
            "'></iframe>"
        );
    },
    DownloadFile: function (token, url, fileName) {
        this.showPageBlockingSpinner();
        let app = this;
        $.ajax({
            type: "GET",
            url: url,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            xhrFields: {
                responseType: 'blob'
            },
            success: function (blob) {
                let windowUrl = window.URL || window.webkitURL;
                let url = windowUrl.createObjectURL(blob);
                let anchor = document.createElement('a');
                anchor.href = url;
                anchor.download = fileName;
                anchor.click();
                // anchor.parentNode.removeChild(anchor);
                windowUrl.revokeObjectURL(url);
            },
            error: function (error) {
                app.hidePageBlockingSpinner();
            },
            complete: function () {
                app.hidePageBlockingSpinner();
            }
        });
    },
    switchTab: function (isNext) {
        if (isNext) {
            $('.nav-tabs > .nav-item > .active').parent().next('li').find('a').trigger('click');
        } else {
            $('.nav-tabs > .nav-item > .active').parent().prev('li').find('a').trigger('click');
        }
    },
    DisplayElement: function (element) {
        $(element).show(500);
    },
    HideElement: function (element) {
        $(element).hide(500);
    },
    RemoveClass: function (element, className) {
        $(element).removeClass(className);
    },
    AddClass: function (element, className) {
        $(element).addClass(className);
    },
    ActiveTab: function (tabId) {
        $('.nav-tabs a[href="' + tabId + '"]').tab('show');
    },
    setCheckBoxValue: function (id, value) {
        // value là tru hoặc false
        $('#' + id).prop('checked', value);
    },
    initBsToggleCard: function (id) {
        new KTCard(id);
    },
    openNewWindow: function (url) {
        window.open(url);
    },
    JsonViewer: function (elementId, data, options) {
        try {
            var jsonData = eval('(' + data + ')');
            $(elementId).jsonViewer(jsonData, options);
        }
        catch (error) {
            return alert("Cannot eval JSON: " + error);
        }
    },
};


/*
*
* */
$(document).on('click', '#test-ajax', function () {
    console.log("=================");

    console.log(inputFile);


});
window.ajax = {
    ajaxDataForm: function (id,url, fn) {
        ajax.showLoading();
        const inputFile = document.getElementById(id);
        const data = new FormData();
        data.append('file', inputFile.files[0]);
        $.ajax({
            url: url,
            data: data,
            processData: false,
            cache: false,
            contentType: false,
            type: 'POST',
            // headers: {"Authorization": `Bearer ${localStorage.getItem('vsm_vcs_token')}`},
            success: function (data) {
                ajax.hiddenLoading();
                fn(data);
            },
            error: function (data) {
                this.hiddenLoading();
                alert("Thất Bại\n");
            }
        });
    },
    ajaxGet: function (url, fn) {
        this.showLoading();
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',

            success: function (data) {
                this.hiddenLoading();
                fn(data);
            },
            error: function (data) {
                this.hiddenLoading();
                alert("Thất Bại\n");
            }
        });
    },
    ajaxSave: function (url, request, type, fn) {
        this.showLoading();
        console.log(request);
        $.ajax({
            url: url,
            data: JSON.stringify(request),
            type: type,
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                ajax.hiddenLoading();
                if (response.status) {
                    fn(response.data);
                } else {
                    nmhung.showError(response.message);
                }

            },
            error: function (response) {
                ajax.hiddenLoading();
                console.log(response);
                nmhung.showError("Lỗi ngoài lệ, liên lạc với admin để báo lỗi");
            }
        });
    },
    ajaxPut: function (url, data, fn) {
        this.ajaxSave(url, data, 'PUT', fn);
    },
    ajaxPost: function (url, data, fn) {
        this.ajaxSave(url, data, 'POST', fn);
    },
    showLoading: function () {
        $("#loading").removeClass("d-none");

    },
    hiddenLoading: function () {
        $("#loading").addClass("d-none");
    }
};


$(".nav-tabs a[data-toggle=tab]").on("click", function (e) {
    if ($(this).hasClass("disabled")) {
        e.preventDefault();
        return false;
    }
});

window.render = {
    createDataSelect2(data, select2NghiasId) {
        $(select2NghiasId).html('');
        if (!nmhung.isNullOrUndefined(data)) {
            data.forEach(item => {
                nmhung.select2ComponentSetValue(select2NghiasId, item);
            });
            render.innerText(select2NghiasId, render.createOptions(
                data.map((item) => {
                    return {value: item, text: item, isSelected: true}
                })
            ));
        }
    },
    createOptions(data) {
        return data.reduce((subTotal, element) => {
            return subTotal + `
            <option value="${element.value}" ${element.isSelected ? 'selected' : ''}>${element.text}</option>
        `
        }, "");
    },
    createArray(templateItemId, data) {
        let template = "{{items}}"
        let rs = data.reduce((subTotal, element) => {
            return subTotal + render.createObject(templateItemId, element);
        }, "");
        return template.eval({items: rs});
    },
    createObject(templateId, data) {
        let template = $(templateId).html();
        return template.eval(data);
    },
    innerText(id, text) {
        $(id).html(text);
    },
    appendText(id, text) {
        $(id).append(text);
    },
    initTemplateObject(selector) {
        const html = $(selector).html();
        // $(selector).html('');
        return {
            id: selector,
            html: html
        }
    }
}


$(document).ready(function () {
    $('body').tooltip({selector: ".input-tooltip"});
    String.prototype.eval = function (data) {
        data.render = function (tmp) {
            if (tmp != null && tmp != undefined) {
                return tmp.toString();
            }
            return '';
        };
        data.arrayAsString = function (tmp) {
            if (tmp != null && tmp != undefined) {
                return nmhung.arrayAsString(tmp);
            }
            return '';
        }
        console.log(data);
        return this.replace(/\{{(.*?)}}/g, function (_, code) {
            var scoped = code.replace(/(["'\.\w\$]+)/g, function (match) {
                return /["']/.test(match[0]) ? match : 'scope.' + match;
            });
            try {
                return new Function('scope', 'return ' + scoped)(data);
            } catch (e) {
                return '';
            }
        });
    }
    var data = {
        name1: 'Silento',
        name2: 'Miley',
        nested: {greeting: 'Dude', useName1: true},
        verb: function () {
            return this.nested.useName1 ? 'nae nae' : 'twerk';
        },
        render: function (data) {
            console.log(data);
            if (data) {
                return data.toString();
            }
            return '';
        }
    };
    console.log('{{render(name1)}}'.eval(data))
    'Hello, {{nested["greeting"]}}!'.eval(data);
// returns 'Hello, Dude!'
    '{{!nested.useName1 ? name1 : nested.greeting}}'.eval(data);
// returns 'Silento'
    '${name1} likes to {{verb()}}'.eval(data);
// returns 'Silento likes to nae nae'


});
