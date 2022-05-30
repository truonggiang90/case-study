// Modal PHẦN GIỎ HÀNG
var modal = document.getElementById("myModal");
// lấy phần tử có tên đặt tên cart
var btn = document.getElementById("cart");
// nút ( x )để thoát
var close = document.getElementsByClassName("close")[0];
// tại sao lại có [0] như  thế này bởi vì mỗi close là một html colection nên khi mình muốn lấy giá trị html thì phải thêm [0].
// Nếu mình có 2 cái component cùng class thì khi [0] nó sẽ hiển thị component 1 còn [1] thì nó sẽ hiển thị component 2.
var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];
btn.onclick = function () {
    modal.style.display = "block";
}
//  close để xóa trang nhỏ bằng dấu ( x ) bằng hàm function
close.onclick = function () {
    modal.style.display = "none";
}
// gọi close_footer bằng nút clik chuột có chữ ( đóng ) bằng hàm function
close_footer.onclick = function () {
    modal.style.display = "none";
}
// gọi oder bằng sự kiện click chuột có chữ (thanh toán) bằng hàm function
order.onclick = function () {
    // hiện thị khi bấm thanh toán
    alert("Cảm ơn bạn đã thanh toán đơn hàng")
}
// cửa sổ click
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "block";
        }
    }
// xóa cart
    var remove_cart = document.getElementsByClassName("btn-danger");
    for (var i = 0; i < remove_cart.length; i++) {
        var button = remove_cart[i]
        button.addEventListener("click", function () {
            var button_remove = event.target
            button_remove.parentElement.parentElement.remove()
        })
    }

// update cart (CẬP NHẬP GIỎ HÀNG) . TỔNG TIỀN
    function updatecart() {
        var cart_item = document.getElementsByClassName("cart-items")[0];
        var cart_rows = cart_item.getElementsByClassName("cart-row");
        var total = 0;
        for (var i = 0; i < cart_rows.length; i++) {
            var cart_row = cart_rows[i]
            var price_item = cart_row.getElementsByClassName("cart-price ")[0]
            var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
            var price = parseFloat(price_item.innerText)// chuyển một chuổi string sang number để tính tổng tiền.
            var quantity = quantity_item.value // lấy giá trị trong thẻ input
            total = total + (price * quantity)
        }
        document.getElementsByClassName("cart-total-price")[0].innerText = total  *1000+ 'vnd'
        // Thay đổi text = total trong .cart-total-price. Chỉ có một .cart-total-price nên mình sử dụng [0].
    }

// Thêm vào giỏ .....
// gom tất cả các btn-cart
// khai báo biến add_cart = lấy các phần tử theo lớp tên có chung tên (btn-cart)
    var add_cart = document.getElementsByClassName("btn-cart");
// cho chạy vòng lặp để duyệt các sp có trong mảng
    for (var i = 0; i < add_cart.length; i++) {
        var add = add_cart[i];
        // tạo hàm thêm trình xử lí sự kiện click có hàm số tên sự kiện
        add.addEventListener("click", function (event) {
            // khai báo sự kiện nút button mục tiêu là (thêm vào giỏ hàng)
            var button = event.target;
            // khai báo nút chọn sp từ phần ngoài đẩy vào phần trang nhỏ .
            var product = button.parentElement.parentElement;
            // sp có chứa ảnh đẩy từ ngoài lên trang nhỏ, đẩy lên thuộc tính src
            var img = product.parentElement.getElementsByClassName("img-prd")[0].src
            // tên sp , được in ra thuộc tính innertext
            var title = product.getElementsByClassName("content-product-h3")[0].innerText
            // giá của sp , được in ra thuộc tính innertext
            var price = product.getElementsByClassName("price")[0].innerText
            // sp được thêm các mục vào xe hàng  gồm ,tên sp , giá sp , ảnh sp
            addItemToCart(title, price, img)
            // khi sp được chọn sẽ lập tực hiện thị lên trang nhỏ .
            modal.style.display = "none";

            updatecart()
        })
    }

    function addItemToCart(title, price, img) {
        //tạo thẻ div
        var cartRow = document.createElement('div')
        // thêm class cho thẻ div
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cart_title = cartItems.getElementsByClassName('cart-item-title')
        // Nếu title của sản phẩm bằng với title mà bạn thêm vao giỏ hàng thì sẽ thông cho user.
        // mục đích kiểm tra xem sản phẩm đã tồn tại trong rỏ hàng hay chưa?
        for (var i = 0; i < cart_title.length; i++) {
            if (cart_title[i].innerText == title) {
                alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
                return
            }
        }

        var cartRowContents = `
<!-- tạo thẻ div để khi chọn sp sẽ đẩy vào phần chọ sp -->
  <div class="cart-item cart-column">
      <img class="cart-item-image" src="${img}" width="200" height="200">
      <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">Xóa</button>
  </div>`
        // giỏ hàng bên trong = nội dung hàng
        cartRow.innerHTML = cartRowContents
        // Thêm sản phẩm vào giỏ hàng
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
            var button_remove = event.target
            button_remove.parentElement.parentElement.remove()
            updatecart()
        })
        // tự động cộng lên 1 giá trị khi chọn sp
        // thêm giỏ hàng thêm trình xử lí sự kiện , biến đổi gọi hàm sự kiện function
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
            var input = event.target
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1;
            }
            updatecart()
        })
}

