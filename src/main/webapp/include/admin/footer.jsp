<%--
  Created by IntelliJ IDEA.
  User: nmhung-evotek
  Date: 11/3/2020
  Time: 11:06 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!--begin::Footer-->
<div
        class="footer bg-white py-4 d-flex flex-lg-column"
        id="kt_footer"
>
    <!--begin::Container-->
    <div
            class="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between"
    >
        <!--begin::Copyright-->
        <div class="text-dark order-2 order-md-1">
            <span class="text-muted font-weight-bold mr-2">2020©</span>
            <a
                    href="http://keenthemes.com/metronic"
                    target="_blank"
                    class="text-dark-75 text-hover-primary"
            >Keenthemes</a
            >
        </div>
        <!--end::Copyright-->
        <!--begin::Nav-->
        <div class="nav nav-dark">
            <a
                    href="http://keenthemes.com/metronic"
                    target="_blank"
                    class="nav-link pl-0 pr-5"
            >About</a
            >
            <a
                    href="http://keenthemes.com/metronic"
                    target="_blank"
                    class="nav-link pl-0 pr-5"
            >Team</a
            >
            <a
                    href="http://keenthemes.com/metronic"
                    target="_blank"
                    class="nav-link pl-0 pr-0"
            >Contact</a
            >
        </div>
        <!--end::Nav-->
    </div>
    <!--end::Container-->
</div>
<!--end::Footer-->

<%--<jsp:include page="../admin/canvas.jsp"/>--%>



<jsp:include page="../admin/script.jsp"/>

<div class="d-none" id="loading" style="
    position: fixed;
    background: rgba(0,0,0,0.1);
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
">
    <div class="spinner-border" role="status" style="display: block;margin-top: 50vh !important;margin: auto">
        <span class="sr-only">Loading...</span>
    </div>
</div>
