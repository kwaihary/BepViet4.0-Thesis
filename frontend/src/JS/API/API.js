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
    const URL = 'http://localhost:8000/api/';
    const DuongDan = URL + yeucau.url;

    // Nếu có file đính kèm thì append vào FormData
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
        xhrFields: { withCredentials: true },
        processData: false,
        contentType: false,
        data: dulieu,
        headers: {
            "Accept": "application/json"
        }
    };

    // Nếu có token thì thêm vào header
    if (yeucau.token) {
        ajaxOptions.headers["Authorization"] = `Bearer ${yeucau.token}`;
    }

    return $.ajax(ajaxOptions)
        .then(function (response) {
            return response;
        })
.catch(function (xhr) {
    let msg = "Có lỗi xảy ra";
    try {
        // Parse chuỗi JSON từ server trả về
        const response = JSON.parse(xhr.responseText);
        // Lấy đúng trường "message" mà bạn đã viết ở Laravel
        msg = response.message; 
    } catch (e) {
        msg = "Lỗi " + xhr.status;
    }

    return {
        status: false,
        message: msg // Đảm bảo trả về chuỗi thuần túy
    };
});
}