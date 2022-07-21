//---------------- GET: lấy dữ liêu từ server-------------
function layDanhSachProduct() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET'
    });
    //Xử lý thành công
    promise.then(function (result) {
        console.log(result.data);
        //Sau khi lấy dữ liệu từ backend về dùng dữ liệu đó tạo ra tr trên table
        renderProduct(result.data);
    });

    //Xử lý thất bại
    promise.catch(function (err) {

    });
}

window.onload = function () {
    layDanhSachProduct();
}

//--------------- POST: Thêm dữ liệu (Tạo dữ liệu) --------------------
document.querySelector('#btnCreate').onclick = function () {

    var product = new Product();

    //Lấy thông tin từ phía giao diện
    product.id = document.querySelector('#id').value;
    product.img = document.querySelector('#img').value;
    product.name = document.querySelector('#name').value;
    product.type = document.querySelector('#type').value;
    product.price = document.querySelector('#price').value;
    product.description = document.querySelector('#description').value;

    //Gọi api đưa dữ liệu về backend
    var promise = axios({
        url: 'https://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: product // dữ liệu gửi đi
    })
    promise.then(function (result) {
        console.log(result.data);
        //Gọi lại api lấy danh sách sinh viên sau khi thêm thành công
        layDanhSachProduct();
    });

    promise.catch(function (err) {
        console.log(err);
    })



}

function renderProduct(arrProduct) { //param : input :arrProduct
    var html = ''; //output: string html 
    for (var i = 0; i < arrProduct.length; i++) {
        var sp = arrProduct[i]; //Mỗi lần duyệt lấy ra 1 object sinhVien từ mảng {maSinhVien:'1',tenSinhVien:'...',...}
        html += `
            <tr>
                <td>${sp.id}</td>
                <td><img src="${sp.img}" alt="" style="width: 100px;"></td>
                <td>${sp.name}</td>
                <td>${sp.price}</td>
                <td>${sp.description}</td>
                <td>${sp.type}</td>
                <td class="row">
                    <button class="btn btn-danger" onclick="xoaProduct('${sp.id}')">
                    <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <button class="btn btn-primary" onclick="chinhSua('${sp.id}')">
                    <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </td>
            </tr>
        `;
    }
    document.querySelector('#tblProduct').innerHTML = html;
}

function xoaProduct(idProductClick) {
    alert(idProductClick);

    var promise = axios({
        url: 'https://svcy.myclass.vn/api/Product/DeleteProduct/' + idProductClick,
        method: 'DELETE'
    });

    //Thành công
    promise.then(function (result) {
        console.log(result.data);
        //Gọi api lây danh sách sản phẩm sau khi xóa thành công => render lại table;
        layDanhSachProduct();
    });

    //Thất bại
    promise.catch(function (err) {

    })
}

function chinhSua(idProduct) {
    var promise = axios({
        url: 'https://svcy.myclass.vn/api/Product/GetById/' + idProduct,
        method: 'GET'
    })

    //Thành công
    promise.then(function (result) {
        var product = result.data;

        document.querySelector('#id').value = product.id;
        document.querySelector('#img').value = product.img;
        document.querySelector('#name').value = product.name;
        document.querySelector('#type').value = product.type;
        document.querySelector('#price').value = product.price;
        document.querySelector('#description').value = product.description;
    });

    //Thất bại
    promise.catch(function (err) {
        console.log(err);
    })
}


document.querySelector('#btnUpdate').onclick = function () {
    var productUpdate = new Product();
    productUpdate.id = document.querySelector('#id').value;
    productUpdate.img = document.querySelector('#img').value;
    productUpdate.name = document.querySelector('#name').value;
    productUpdate.type = document.querySelector('#type').value;
    productUpdate.price = document.querySelector('#price').value;
    productUpdate.description = document.querySelector('#description').value;


    //Call api
    var promise = axios({
        url: 'https://svcy.myclass.vn/api/Product/UpdateProduct/' + productUpdate.id,
        method: 'PUT',
        data: productUpdate
    });

    promise.then(function (result) {
        //Thành công
        console.log(result.data);
        layDanhSachProduct(); //Load lại table
    });

    promise.catch(function (err) {
        console.log(err);
    })
}


document.querySelector('#btnSearch').onclick = function () {
    var nameProduct = document.querySelector('#search').value;

    var promise = axios({
        url: 'https://svcy.myclass.vn/api/Product/SearchByName?name=' + nameProduct,
        method: 'GET'
    })

    //Xử lý thành công
    promise.then(function (result) {
        console.log(result.data);
        //Sau khi lấy dữ liệu từ backend về dùng dữ liệu đó tạo ra tr trên table
       
        renderProduct(result.data);

    });

    //Xử lý thất bại
    promise.catch(function (err) {
        alert('Không tìm thấy')
    });

    // renderProduct(result.data);


}