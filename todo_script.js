
$(document).ready(function () {
            tanggal = ambil_tanggal(0);
            // get todo in local storage
            var todo = JSON.parse(localStorage.getItem("todo"));
            if (todo == null) {
                todo = {
                    [tanggal]: []
                }
            }
            console.log(tanggal)
            // show item
            function ambil_tanggal(i) {
            date = new Date(new Date().getTime() + i * (24 * 60 * 60 * 1000));
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var tanggal = day + "/" + month + "/" + year;
            return tanggal
        }
var show_item = function () {
                var todo_item = todo[tanggal];
                var html = "";

                for (var i = 0; i < todo_item.length; i++) {
                    if (todo_item[i].status == "done") {
                        var status = `<input class="form-check-input check-box fs-4 me-2 mt-0 " type="checkbox" value=""
                            id="flexCheckDefault" checked>`
                        var strike = `<h5 class = "done"> ${todo_item[i].nama}</h5>`
                    } else {
                        var status = `<input class="form-check-input check-box fs-4 me-2 mt-0 " type="checkbox" value=""
                            id="flexCheckDefault">`
                        var strike = `<h5> ${todo_item[i].nama}</h5>`
                    }

                    html += `<div class="item py-3">
                        <div class="row list-item">
                            <!-- item -->
                            <div class="col-10">
                                ${status}
                                <label class="form-check-label" for="flexCheckDefault">
                                    ${strike}
                                </label>
                            </div>
                            <!-- end of item -->
                            <div class="col-2 text-end ">
                                <!-- dropdown menu -->            
                                <i class="fas fa-solid fa-trash pointer enter delete"></i>
                            </div>
                        </div>
                    </div>`;
                }

                $(".list-item").html(html);
            }



            show_item()
            // input task
            $(".input_task").keypress(function (event) {
                if (event.which == 13 && $(this).val() != "") {
                    // get val
                    var task = $(this).val();
                    todo[tanggal].push({
                        nama: task,
                        status: "undone"
                    });
                    localStorage.setItem("todo", JSON.stringify(todo));
                    $(this).val("");
                    show_item();
                }
            });
            // delete item
            $(".list-item").on("click", ".delete", function () {
                var index = $(this).parent().parent().parent().index();
                todo[tanggal].splice(index, 1);
                localStorage.setItem("todo", JSON.stringify(todo));
                show_item();
                console.log(index)
            });

            // done status
            $(".list-item").on("click", ".check-box", function () {
                var index = $(this).parent().parent().parent().index();
                if (todo[tanggal][index].status == "undone") {
                    todo[tanggal][index].status = "done";
                } else {
                    todo[tanggal][index].status = "undone";
                }
                localStorage.setItem("todo", JSON.stringify(todo));
                show_item();
            });
        });