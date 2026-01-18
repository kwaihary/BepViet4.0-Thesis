import $ from "jquery";
/**
 * 
 * @param {*} dulieu : Dữ liệu gửi lên server (FormData)
 * @param {*} yeucau : {
 *      url: Đường dẫn API,
 *      PhuongThuc: 1 (POST) | 2 (GET),
 *      token: Token (nếu có),
 *      fileArray: Mảng file (nếu có)
 * }
 * @returns Promise
 */
export function CallAPI(dulieu = null, yeucau) {
    const URL = 'http://127.0.0.1:8000/';
    const DuongDan = URL + yeucau.url;

    if (yeucau.fileArray) {
        if (dulieu === null) {
            dulieu = new FormData();
        }
        yeucau.fileArray.forEach(file => {
            dulieu.append("files", file);
        });
    }

    let ajaxOptions = {
        url: DuongDan,
        type: yeucau.PhuongThuc === 1 ? "POST" : "GET",
        xhrFields: { withCredentials: true }, // tương đương credentials: "include"
        processData: false,
        contentType: false,
        data: dulieu,
        headers: {}
    };

    if (yeucau.token) {
        ajaxOptions.headers["Authorization"] = `Bearer ${yeucau.token}`;
    }

    return $.ajax(ajaxOptions)
        .then(function (response) {
            return response;
        })
        .catch(function (xhr) {
            return {
                status: false,
                message: `Lỗi HTTP ${xhr.status}: ${xhr.responseText ? xhr.responseText.substring(0, 50) + "..." : "Không rõ"}`
            };
        });
}
