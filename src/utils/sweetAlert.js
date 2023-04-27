import Swal from "sweetalert2";

export const swalAlert = (message, icon, btnName) => {
    Swal.fire({
        title: message,
        icon: icon,
        confirmButtonText: btnName,
    });
}

export const swalConfirmAlert = async (message, icon, btnName, cancelBtnText) => {
    return await new Promise((resolve, reject) => {
        // icon: "warning" / "error" / "success" / "info"
        Swal.fire({
            title: message,
            icon: icon,
            showCloseButton: true,
            allowOutsideClick: false,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: btnName,
            cancelButtonText: cancelBtnText ? cancelBtnText : "Cancel",
            focusConfirm: true
        }).then((result) => {
            if (result.isConfirmed) {
                return resolve(true)
            } else if (result.dismiss === "close") {
                return resolve(0)
            } else {
                return resolve(false)
            }
        });
    })
}

export const loader = (titel) => {
    let timerInterval;
    Swal.fire({
        title: titel ? titel : "Loading...",
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer();
                if (content) {
                    const b = content.querySelector("b");
                    if (b) {
                        b.textContent = Swal.getTimerLeft();
                    }
                }
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        },
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
    });
}

export const stopLoader = () => {
    Swal.close()
    Swal.close()
}

export const sweetAlertWithTimer = (message, icon, timer) => {
    Swal.fire({
        icon: icon,//'success',
        title: message,
        showConfirmButton: false,
        allowOutsideClick: false,
        showCancelButton: false,
        timer: timer
    })
}

export const sweetAlert_HMTL = (message, img) => {
    Swal.fire({
        html: '<p style=" background: lightgray; color: black; height: 106px; font-size: 17px; margin-top: 19px; padding: 15px;">' + message + ' </p>' +
            '<a href="https://www.google.com/" target="blank">' + `<img src='${img}' id="img-clck" style="margin-bottom: 15px;"/>` + '</a> ',
        showCloseButton: true,
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Hello',
        focusConfirm: true
    }).then((result) => {
        if (result.isConfirmed) {
            return 1
        } else {
            return 0
        }
    });
}
