"use strict";
$(function () {
    var e = $(".datatables-users"),
        l = {
            1: { title: "Pending", class: "bg-label-warning" },
            2: { title: "Active", class: "bg-label-success" },
            3: { title: "Inactive", class: "bg-label-secondary" },
        },
        c = "app-user-view-account.html";
    e.length &&
        e.DataTable({
            ajax: assetsPath + "json/user-list.json",
            columns: [
                { data: "" },
                { data: "full_name" },
                { data: "role" },
                { data: "current_plan" },
                { data: "billing" },
                { data: "status" },
                { data: "" },
            ],
            columnDefs: [
                {
                    className: "control",
                    orderable: !1,
                    searchable: !1,
                    responsivePriority: 2,
                    targets: 0,
                    render: function (e, a, t, s) {
                        return "";
                    },
                },
                {
                    targets: 1,
                    responsivePriority: 4,
                    render: function (e, a, t, s) {
                        var l = t.full_name,
                            n = t.email,
                            r = t.avatar;
                        return (
                            '<div class="d-flex justify-content-left align-items-center"><div class="avatar-wrapper"><div class="avatar avatar-sm me-3">' +
                            (r
                                ? '<img src="' +
                                  assetsPath +
                                  "img/avatars/" +
                                  r +
                                  '" alt="Avatar" class="rounded-circle">'
                                : '<span class="avatar-initial rounded-circle bg-label-' +
                                  [
                                      "success",
                                      "danger",
                                      "warning",
                                      "info",
                                      "dark",
                                      "primary",
                                      "secondary",
                                  ][Math.floor(6 * Math.random()) + 1] +
                                  '">' +
                                  (r = (
                                      ((r =
                                          (l = t.full_name).match(/\b\w/g) ||
                                          []).shift() || "") + (r.pop() || "")
                                  ).toUpperCase()) +
                                  "</span>") +
                            '</div></div><div class="d-flex flex-column"><a href="' +
                            c +
                            '" class="text-body text-truncate"><span class="fw-medium">' +
                            l +
                            '</span></a><small class="text-muted">@' +
                            n +
                            "</small></div></div>"
                        );
                    },
                },
                {
                    targets: 2,
                    render: function (e, a, t, s) {
                        t = t.role;
                        return (
                            "<span class='text-truncate d-flex align-items-center'>" +
                            {
                                Subscriber:
                                    '<span class="badge badge-center rounded-pill bg-label-warning w-px-30 h-px-30 me-2"><i class="bx bx-user bx-xs"></i></span>',
                                Author: '<span class="badge badge-center rounded-pill bg-label-success w-px-30 h-px-30 me-2"><i class="bx bx-cog bx-xs"></i></span>',
                                Maintainer:
                                    '<span class="badge badge-center rounded-pill bg-label-primary w-px-30 h-px-30 me-2"><i class="bx bx-pie-chart-alt bx-xs"></i></span>',
                                Editor: '<span class="badge badge-center rounded-pill bg-label-info w-px-30 h-px-30 me-2"><i class="bx bx-edit bx-xs"></i></span>',
                                Admin: '<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class="bx bx-mobile-alt bx-xs"></i></span>',
                            }[t] +
                            t +
                            "</span>"
                        );
                    },
                },
                {
                    targets: 3,
                    render: function (e, a, t, s) {
                        return (
                            '<span class="fw-medium">' +
                            t.current_plan +
                            "</span>"
                        );
                    },
                },
                {
                    targets: 5,
                    render: function (e, a, t, s) {
                        t = t.status;
                        return (
                            '<span class="badge ' +
                            l[t].class +
                            '">' +
                            l[t].title +
                            "</span>"
                        );
                    },
                },
                {
                    targets: -1,
                    title: "View",
                    searchable: !1,
                    orderable: !1,
                    render: function (e, a, t, s) {
                        return (
                            '<a href="' +
                            c +
                            '" class="btn btn-sm btn-icon"><i class="bx bx-show-alt"></i></a>'
                        );
                    },
                },
            ],
            order: [[1, "desc"]],
            dom: '<"row mx-2"<"col-sm-12 col-md-4 col-lg-6" l><"col-sm-12 col-md-8 col-lg-6"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end justify-content-center align-items-center flex-sm-nowrap flex-wrap me-1"<"me-3"f><"user_role w-px-200 pb-3 pb-sm-0">>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            language: {
                sLengthMenu: "_MENU_",
                search: "Search",
                searchPlaceholder: "Search..",
            },
            responsive: {
                details: {
                    display: $.fn.dataTable.Responsive.display.modal({
                        header: function (e) {
                            return "Details of " + e.data().full_name;
                        },
                    }),
                    type: "column",
                    renderer: function (e, a, t) {
                        t = $.map(t, function (e, a) {
                            return "" !== e.title
                                ? '<tr data-dt-row="' +
                                      e.rowIndex +
                                      '" data-dt-column="' +
                                      e.columnIndex +
                                      '"><td>' +
                                      e.title +
                                      ":</td> <td>" +
                                      e.data +
                                      "</td></tr>"
                                : "";
                        }).join("");
                        return (
                            !!t &&
                            $('<table class="table"/><tbody />').append(t)
                        );
                    },
                },
            },
            initComplete: function () {
                this.api()
                    .columns(2)
                    .every(function () {
                        var a = this,
                            t = $(
                                '<select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option></select>'
                            )
                                .appendTo(".user_role")
                                .on("change", function () {
                                    var e = $.fn.dataTable.util.escapeRegex(
                                        $(this).val()
                                    );
                                    a.search(
                                        e ? "^" + e + "$" : "",
                                        !0,
                                        !1
                                    ).draw();
                                });
                        a.data()
                            .unique()
                            .sort()
                            .each(function (e, a) {
                                t.append(
                                    '<option value="' +
                                        e +
                                        '" class="text-capitalize">' +
                                        e +
                                        "</option>"
                                );
                            });
                    });
            },
        }),
        setTimeout(() => {
            $(".dataTables_filter .form-control").removeClass(
                "form-control-sm"
            ),
                $(".dataTables_length .form-select").removeClass(
                    "form-select-sm"
                );
        }, 300);
}),
    (function () {
        var e = document.querySelectorAll(".role-edit-modal"),
            a = document.querySelector(".add-new-role"),
            t = document.querySelector(".role-title");
        (a.onclick = function () {
            t.innerHTML = "Add New Role";
        }),
            e &&
                e.forEach(function (e) {
                    e.onclick = function () {
                        t.innerHTML = "Edit Role";
                    };
                });
    })();
