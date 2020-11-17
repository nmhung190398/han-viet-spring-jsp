<%--
  Created by IntelliJ IDEA.
  User: nmhung-evotek
  Date: 11/3/2020
  Time: 10:13 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
    <%--<%@include file="/include/admin/header-css.jsp"%>--%>
    <%@include file="../../../../include/admin/header-css.jsp" %>
</head>
<body
        id="kt_body"
        class="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading"
>
<!--begin::Main-->

<div class="d-flex flex-column flex-root">
    <!--begin::Page-->
    <div class="d-flex flex-row flex-column-fluid page">
        <!--begin::Aside-->
        <jsp:include page="../../../../include/admin/menu.jsp"/>
        <!--end::Aside-->
        <!--begin::Wrapper-->
        <div class="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
            <!--begin::Header-->
            <jsp:include page="../../../../include/admin/header.jsp"/>
            <!--end::Header-->
            <!--begin::Content-->
            <div
                    class="content d-flex flex-column flex-column-fluid"
                    id="kt_content"
            >
                <!--begin::Subheader-->
                <div
                        class="subheader py-2 py-lg-4 subheader-solid"
                        id="kt_subheader"
                >
                    <div
                            class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
                    >
                        <!--begin::Info-->
                        <div class="d-flex align-items-center flex-wrap mr-2">
                            <!--begin::Page Title-->
                            <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">
                                Strong Hero Nguyễn
                            </h5>
                            <!--end::Page Title-->
                            <!--begin::Actions-->
                            <div
                                    class="subheader-separator subheader-separator-ver mt-2 mb-2 mr-4 bg-gray-200"
                            ></div>
                            >

                            <button onclick="onShowModalEditItem()"
                                    type="button"
                                    class="mx-3 btn btn-light-info font-weight-bolder btn-sm"
                            >Add New
                            </button>

                            <button onclick="onDownLoad()"
                                    type="button"
                                    class="mx-3 btn btn-light-primary font-weight-bolder btn-sm">Tải
                            </button>

                            <div class="input-group w-auto mx-3">
                                <input id="upload-file" class="btn btn-sm" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                                <div class="input-group-append">
                                    <button onclick="onUploadExcel()" class="btn btn-outline-secondary" type="button">Upload</button>
                                </div>
                            </div>

                            <!--end::Actions-->
                        </div>
                        <!--end::Info-->
                        <!--begin::Toolbar-->
                        <div class="d-flex align-items-center">
                            <!--begin::Actions-->
                            <div class="input-group">
                                <input style="width: 300px" id="input-search" type="text" class="form-control" placeholder="Tìm kiếm">
                                <div class="input-group-append">
                                    <button onclick="onSearch(0)" class="btn btn-outline-secondary" type="button"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                            <!--end::Daterange-->
                        </div>
                        <!--end::Toolbar-->
                    </div>
                </div>
                <!--end::Subheader-->
                <!--begin::Entry-->
                <div class="d-flex flex-column-fluid">
                    <!--begin::Container-->
                    <div class="container">
                        <div class="card">
                            <div class="card-header"></div>
                            <div class="card-body">
                                <div class="w-100 table-pagination">
                                    <table class="table table-bordered" id="table-han-viet">
                                        <thead>
                                        <th>Mã</th>
                                        <th>Âm đọc</th>
                                        <th>Chữ viết</th>
                                        <th>Nghĩa</th>
                                        <th>Từ ghép</th>
                                        <th>Nghĩa gốc</th>
                                        <th>Thành ngữ</th>
                                        <th>Bộ thủ</th>
                                        <th>Chú thích</th>
                                        <th>#</th>
                                        </thead>
                                        <tbody id="table-body-han-viet">

                                        </tbody>
                                    </table>

                                    <div class="w-100 d-flex">
                                        <ul class="pagination" id="pagination"></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--end::Container-->
                </div>
                <!--end::Entry-->
            </div>
            <!--end::Content-->
            <!--begin::Footer-->
            <jsp:include page="../../../../include/admin/footer.jsp"/>
            <!--end::Footer-->
        </div>
        <!--end::Wrapper-->
    </div>
    <!--end::Page-->
</div>
<!--end::Main-->

<!--end::Page Scripts-->

<%--modal ae--%>

<!--begin::Modal-->
<!-- Modal -->
<div class="modal fade right " id="han-viet-ae-modal" tabindex="-1" role="dialog"
     aria-labelledby="accountChangeModalLabel" aria-hidden="true">
    <div class="modal-dialog-full-width modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content-full-width modal-content " style="">

            <div class=" modal-header-full-width   modal-header text-center">
                <h5 class="modal-title w-100" id="exampleModalPreviewLabel">{{title}}</h5>
                <button type="button" class="close " data-dismiss="modal" aria-label="Close">
                    <span style="font-size: 1.3em;" aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <!--begin::Form-->
                <div class="kt-portlet__body">
                    <form id="han-viet-frm">
                        <input type="hidden" name="id" value='{{render(item.id)}}'>
                        <div class="row form-group">
                            <div class="col-4">
                                <label>Âm đọc</label>
                                <input class="form-control" name="amDoc" value='{{render(item.amDoc)}}'>
                            </div>
                            <div class="col-4">
                                <label>Chứ viết</label>
                                <input class="form-control" name="chuViet" value='{{render(item.chuViet)}}'>
                            </div>

                            <div class="col-4">
                                <label>Bộ thủ</label>
                                <input class="form-control" name="boThu" value='{{render(item.boThu)}}'>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-4">
                                <label>Từ ghép</label>
                                <select name="tuGheps" class="form-control select2-tu-ghep"
                                        multiple="multiple"></select>
                            </div>
                            <div class="col-4">
                                <label>Nghĩa</label>
                                <select name="nghias" class="form-control select2-nghia" multiple="multiple"></select>
                            </div>
                            <div class="col-4">
                                <label>Thành ngữ</label>
                                <select name="thanhNgus" class="form-control select2-thanh-ngu"
                                        multiple="multiple"></select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-8">
                                <label>Nghĩa hán</label>
                                <textarea name="nghiaHan" class="form-control" cols="4"
                                          data-value="">{{render(item.nghiaHan)}}</textarea>
                            </div>

                            <div class="col-4">
                                <label>Chú thích</label>
                                <textarea name="chuThich" class="form-control" cols="4"
                                          data-value="">{{render(item.chuThich)}}</textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <!--end::Form-->
            </div>
            <div class="modal-footer-full-width  modal-footer py-2 @FooterCss">
                <a type="button" class="btn btn-danger btn-md btn-rounded btn-modal-close" data-dismiss="modal">
                    Close
                </a>
                <a onclick="onSubmitItem(null)" type="button" class="btn btn-primary btn-md btn-rounded"
                   id="submit-from">Save</a>
            </div>
        </div>
    </div>
</div>

<!--end::Modal-->


<%--end moda ae--%>


<%--template--%>
<div class="d-none">
    <%--han-viet-table-teamplate--%>

    <table>
        <tbody id="template-tr-table-han-viet">
        <tr>
            <td>{{render(id)}}</td>
            <td>{{render(amDoc)}}</td>
            <td>{{render(chuViet)}}</td>
            <td>{{arrayAsString(nghias)}}</td>
            <td>{{arrayAsString(tuGheps)}}</td>
            <td>{{render(nghiaHan)}}</td>
            <td>{{arrayAsString(thanhNgus)}}</td>
            <td>{{render(boThu)}}</td>
            <td>{{render(chuThich)}}</td>
            <td>
                <div class="">
                    <button class="btn btn-success btn-han-viet-edit mx-2 btn-sm" itemId="{{id}}">Sửa</button>
                    <button class="btn btn-danger btn-han-viet-del mx-2 btn-sm" itemId="{{id}}">Xóa</button>
                </div>
            </td>

        </tr>
        </tbody>

    </table>

    <%--END-han-viet-table-teamplate--%>
</div>

<script>
    window.model = {
        totalpage : 1,
        currentPage : 0,
        searchModel : {
            keyword : ''
        }
    };
    let templateAe = {
        id: "#han-viet-ae-modal",
        html: ""
    };
    let itemSave;
    const API_SEARCH = "/api/han-viet/search";
    const API_GET_BY_ID = "/api/han-viet/get";
    const API_ADD = "/api/han-viet/add";
    const API_UPDATE = "/api/han-viet/update";
    const API_DELETE = "/api/han-viet/delete";
    const API_UPLOAD_EXCEL = "/api/han-viet/upload-excel";
    const API_DOWNLOAD = "/api/han-viet/download";

    function init() {
        templateAe = render.initTemplateObject(templateAe.id);
        onSearch();
    }

    function onSearch(page = 0) {
        getData(page, (data) => {
            nmhung.initPagination("#pagination", data.totalPage, data.pageNumber + 1, (page) => {
                getData(page - 1); // when change page
            });
        })
    }

    function onDownLoad() {
        ajax.ajaxPost(API_DOWNLOAD, {
            keyword : $("#input-search").val(),
            page: 0,
            size: 99999
        }, (data) => {
            nmhung.createAndDownloadBase64File('YeuToHanViet.xlsx',data);
        })
    }

    function onUploadExcel() {
        ajax.ajaxDataForm("upload-file",API_UPLOAD_EXCEL,() =>{
            nmhung.showSuccess("upload file thành công");
            onSearch();
        });
    }

    function getData(page, fnLoadDataSuccessful = null) {
        ajax.ajaxPost(API_SEARCH, {
            keyword : $("#input-search").val(),
            page: page,
            size: pageSizeDefault
        }, (data) => {
            model.currentPage = data.pageNumber;
            model.totalpage = data.totalPage;
            renderTableData(data.items);
            if (fnLoadDataSuccessful != null) {
                fnLoadDataSuccessful(data);
            }
        })
    }

    function renderTableData(data) {
        const text = render.createArray("#template-tr-table-han-viet", data);
        render.innerText("#table-body-han-viet", text);
        afterTableRender();
    }

    function afterTableRender() {
        nmhung.onClick('.btn-han-viet-edit', (e) => {
            const id = e.attr('itemId');
            onShowModalEditItem(id);
        }, '#table-body-han-viet');
        nmhung.onClick('.btn-han-viet-del', (e) => {
            const id = e.attr('itemId');
            onDeleteItem(id);
        }, '#table-body-han-viet');
        //set onclick btn
    }

    function onSubmitItem(event) {
        const data = nmhung.getDataInFrm('#han-viet-frm');
        console.log(data);
        let isAdd = true;
        if (!nmhung.isNullOrUndefined(data.id) && data.id != '') {
            try {
                data.id = parseInt(data.id);
                isAdd = false;
            } catch (e) {
                console.error(e);
                nmhung.showError("không thể chuyển đổi kiểu dữ liệu");
            }
        }
        data.nghias = nmhung.formatDataSelect2Multi(data.nghias);
        data.tuGheps = nmhung.formatDataSelect2Multi(data.tuGheps);
        data.thanhNgus = nmhung.formatDataSelect2Multi(data.thanhNgus);


        ajax.ajaxPost(isAdd ? API_ADD : API_UPDATE, data, (data) => {
            nmhung.showSuccess(isAdd ? 'Thêm thành công' : 'Cập nhật thành công');
            nmhung.hideModal(templateAe.id);
            onSearch(model.currentPage);
        });


    }

    function onDeleteItem(id) {
        nmhung.showConfirm("Bạn có chắc chắn muốn xóa không?",() =>{
            console.log("onDeleteItem OK");
            ajax.ajaxPost(API_DELETE,{id : parseInt(id)},(data) =>{
                nmhung.showSuccess("Xóa thành công");
                onSearch(0);
            })
        });
    }

    function onShowModalEditItem(id) {
        const process = (data) => {
            const isAdd = data == null;
            itemSave = isAdd? {} : data;
            console.log(itemSave);
            const dataRender = templateAe.html.eval({
                title: isAdd? 'Thêm từ mới' : `Sửa từ có mã : ` + itemSave.id,
                item: itemSave
            });
            console.log(dataRender);
            render.innerText(templateAe.id, dataRender);
            nmhung.showModal(templateAe.id, () => {
                //render select2
                const select2NghiasId = '.select2-nghia';
                render.createDataSelect2(itemSave.nghias, select2NghiasId);
                nmhung.select2ComponentInit(select2NghiasId, "Thêm nghĩa", true, true);

                const select2tuGhepsId = '.select2-tu-ghep';
                render.createDataSelect2(itemSave.tuGheps, select2tuGhepsId);
                nmhung.select2ComponentInit(select2tuGhepsId, "Thêm từ ghép", true, true);

                const select2thanhNgusId = '.select2-thanh-ngu';
                render.createDataSelect2(itemSave.thanhNgus, select2thanhNgusId);
                nmhung.select2ComponentInit(select2thanhNgusId, "Thêm thành ngữ", true, true);
            }, () => {
            });
        };
        if(nmhung.isNullOrUndefined(id)){
            process(null)
        }else{
            ajax.ajaxPost(API_GET_BY_ID, {id: parseInt(id)}, process)
        }

    }

    $(document).ready(function () {
        init();
    })


</script>
</body>
</html>
