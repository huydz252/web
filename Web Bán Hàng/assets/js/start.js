var arrayProducts = [];
var main = {
    init: function(){
        main.getDataProduct();
        main.getTotalProduct();
        main.eventAddCart();
        main.eventAddCartOnSproduct();
    },
    getDataProduct : function(){
        $.ajax({
            type: "GET",
            url: "/data.json",
            success: function (data) {
                if(data.length > 0){
                    arrayProducts = data;
                    // in ra tất cả các sản phẩm
                    let listHTMLProducts = '';
                    for (let i = 0; i < data.length; i++) {
                        listHTMLProducts += `
                        <div class="pro">
                            <img class="imgs" src="assets/imgs/products/`+data[i].img+`" alt="">
                            <div class="des"> <!-- describe: miêu tả -->
                                <span>Adidas</span>
                                <h5 onclick="window.location.href='sproduct.html?id=`+data[i].id+`'">`+data[i].name+`</h5>
                                <div class="star">
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    
                                </div>
                                <div class="price">
                                    <p>`+data[i].price+`</p>
                                    <a class="addCart" href="javascript:void(0)" data-id="`+data[i].id+`"><i class="fa-solid fa-cart-shopping" style="color: #B197FC;"></i></a>
                                </div>
                            </div>
                        </div>`
                    }
                    $('div.all-pro').append(listHTMLProducts);
                    main.eventAddCart();

                    // in ra các sản phẩm mới
                    let listHTMLNewProducts = '';
                    let listNewProducts = data.filter(x => x.status == 1); //lọc ra các status = 1
                    for (let i = 0; i < listNewProducts.length; i++) {
                        listHTMLNewProducts += `
                        <div class="pro" onclick="window.location.href='sproduct.html'">
                            <img class="imgs" src="assets/imgs/products/`+listNewProducts[i].img+`" alt="">
                            <div class="des"> <!-- describe: miêu tả -->
                                <span>Adidas</span>
                                <h5>`+listNewProducts[i].name+`</h5>
                                <div class="star">
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    
                                </div>
                                <div class="price">
                                    <p>`+listNewProducts[i].price+`</p>
                                    <a class="addCart" href="javascript:void(0)" data-id="`+listNewProducts[i].id+`"><i class="fa-solid fa-cart-shopping" style="color: #B197FC;"></i></a>
                                </div>
                            </div>
                        </div>`
                    }
                    if (listNewProducts.length > 0) {
                        $('div.new-pro').append(listHTMLNewProducts);
                        main.eventAddCart();
                    }
                    else{
                        $('div.new-pro').append('<h5>Chưa có sản phẩm mới</h5>')
                    }

                }else{
                    alert('không tồn tại dữ liệu');
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
        
    },
    getProductDetails : function(){
        $.ajax({
            type: "GET",
            url: "data.json",
            success: function (data) {
                if(data.length > 0){
                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    const product = urlParams.get('id');
                    var getProduct = data.find(x => x.id == product);
                    console.log(getProduct);
                    if(getProduct != null && typeof getProduct !='undefined'){
                        document.getElementById('MainImg').src = 'assets/imgs/products/'+getProduct.img;
                    }
                    main.categoryProducts(data, getProduct.category, getProduct.id);
                }else{
                    alert('không tồn tại dữ liệu');
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    },
    categoryProducts : function(data, category, id){
        if(data.length > 0){
            let listCategoryProduct = data.filter(x => x.category == category && x.id != id);
            if(listCategoryProduct.length > 0){
                var listCategoryHTMLProduct = '';
                for (let i = 0; i < listCategoryProduct.length; i++) {
                    listCategoryHTMLProduct += 
                    `
                        <div class="pro">
                            <img class="imgs" src="assets/imgs/products/`+listCategoryProduct[i].img+`" alt="">
                            <div class="des"> <!-- describe: miêu tả -->
                                <span>Adidas</span>
                                <a href="sproduct.html?id=`+listCategoryProduct[i].id+`">
                                    <h5>`+listCategoryProduct[i].name+`</h5>
                                <a/>
                                <div class="star">
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                </div>
                                <div class="price">
                                    <p>`+listCategoryProduct[i].price+`</p>
                                    <a class="addCart" href="javascript:void(0)" data-id="`+listCategoryProduct[i].id+`"><i class="fa-solid fa-cart-shopping" style="color: #B197FC;"></i></a>
                                </div>
                            </div>
                        </div>
                    `
                }
            }
            if (listCategoryProduct.length > 0) {
                $('div.spTuongTu').append(listCategoryHTMLProduct);
                main.eventAddCart();
            }
            else{
                $('div.spTuongTu').append('<h5>Không có sản phẩm tương tự</h5>')
            }
        }
    },
    eventAddCart : function(){
        $('.addCart').unbind(); //xóa toàn bộ sự kiện của class addCart.
        $('.addCart').click(function(){
            alert('Đã thêm vào giỏ hàng')
            let getProductById = arrayProducts.find(x => x.id == $(this).data("id"))
            var x = localStorage.getItem("cart");
            if(typeof x != 'undefined' && x != null){
                let listCartLocal = JSON.parse(x);
                let getIndex = listCartLocal.findIndex(x => x.id == getProductById.id);
                if(getIndex != -1){
                    listCartLocal[getIndex].quantity += 1;
                }else{
                    getProductById.quantity = 1;
                    listCartLocal.push(getProductById);
                }
                localStorage.setItem("cart", JSON.stringify(listCartLocal));
                main.getTotalProduct();
            }else{
                let arrayCart = [];
                getProductById.quantity = 1;
                arrayCart.push(getProductById);
                localStorage.setItem("cart", JSON.stringify(arrayCart));
                main.getTotalProduct();
            };
        })
    },
    eventAddCartOnSproduct : function(){
        $('#addCartButton').unbind(); 
        $('#addCartButton').click(function(){
            $.ajax({
                type: "GET",
                url: "data.json",
                success: function (data) {
                    alert('Đã thêm vào giỏ hàng')
                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    const product = urlParams.get('id');
                    
                    var getProduct = data.find(x => x.id == product);
                    console.log(getProduct);
                    
                    var x = localStorage.getItem("cart");
                    var button = document.getElementById('addCartButton');
                    var quantityProduct = parseInt(button.parentElement.querySelector('input').value, 10);
                    console.log(quantityProduct);
                    if(typeof x != 'undefined' && x != null){
                        let listCartLocal = JSON.parse(x);
                        let getIndex = listCartLocal.findIndex(x => x.id == getProduct.id);
                        if(getIndex != -1){
                            listCartLocal[getIndex].quantity = parseInt(listCartLocal[getIndex].quantity, 10) + quantityProduct;        
                            localStorage.setItem("cart", JSON.stringify(listCartLocal));
                            main.getTotalProduct();
                        }else{
                            getProduct.quantity = quantityProduct;
                            listCartLocal.push(getProduct);
                            localStorage.setItem("cart", JSON.stringify(listCartLocal));
                            main.getTotalProduct();
                            main.showListCart();
                            main.totalCart();
                        }
                    }else{
                        let arrayCart = [];
                        getProduct.quantity = quantityProduct;
                        arrayCart.push(getProduct);
                        localStorage.setItem("cart", JSON.stringify(arrayCart));
                        main.getTotalProduct();
                    };
                }
        })
    })},
    getTotalProduct : function(){
        var x = localStorage.getItem("cart");
        if(typeof x != 'undefined' && x != null){
            let listCartLocal = JSON.parse(x);
            let total = 0;
            for (let i = 0; i < listCartLocal.length; i++) {
                total += listCartLocal[i].quantity;
            }
            $('span.totalProduct').html(total); //html: xóa nội dung cũ, thay bằng nội dung truyền vào.
        }
    },
    showListCart : function(){
        var x = localStorage.getItem("cart");
        if(typeof x != 'undefined' && x != null){
            let listCart = JSON.parse(x);
            var listCartHTML = '';
            for (let i = 0; i < listCart.length; i++) {
                listCartHTML += 
                `
                <tr>
                    <td><a class="icon-delete" href=""><i class="fa-solid fa-circle-xmark"></i></a></td>
                    <td><img src="assets/imgs/products/`+listCart[i].img+`" alt=""></td>
                    <td>`+listCart[i].name+`</td>
                    <td>`+listCart[i].price+`</td>
                    <td>`+listCart[i].quantity+`</td>
                    <td>`+(listCart[i].quantity*listCart[i].price)+`</td>
                </tr>
                `
            }
            $('#cart table tbody').html(listCartHTML);
        }

    },
    totalCart : function (){
        var x = localStorage.getItem("cart");
        if(typeof x != 'undefined' && x != null){
            let listCart = JSON.parse(x);
            let totalCart = 0;
            for (let i = 0; i < listCart.length; i++) {
                totalCart += listCart[i].quantity*listCart[i].price;
            }
            let HTMLTotalCart = 
            `
                <tr>
                    <td>Tổng thu</td>
                    <td>$`+totalCart+`</td>
                </tr>
                <tr>
                    <td>Phí chuyển hàng</td>
                    <td>Miễn phí</td>
                </tr>
                <tr>
                    <td>Mã giảm giá</td>
                    <td>Không có</td>
                <tr>
                    <td>Tổng</td>
                    <td>$`+totalCart+`</td>
                </tr>
            `
            $('table.totalCart').html(HTMLTotalCart); 
        }
    },
    eventDeleteProduct : function(){
        $.ajax({
            type: "GET",
            url: "data.json",
            success: function (data) {
                $('.icon-delete').click(function(){
                    let row = $(this).closest('tr');
                    let secontd = row.find('td').eq(1);
                    let imgSrc = secontd.find('img').attr('src');
                    let imgName = imgSrc.split('/').pop();
                    var getProduct = data.find(x => x.img == imgName);
                    console.log(getProduct);
                    
                    var x = localStorage.getItem("cart");
                    let listCartLocal = JSON.parse(x);
                    for (let i = 0; i < listCartLocal.length; i++) {
                        if(listCartLocal[i].id == getProduct.id){
                            if(listCartLocal[i].id == 1){
                                listCartLocal.splice(i, 1);
                                localStorage.setItem("cart", JSON.stringify(listCartLocal));
                                main.getTotalProduct();
                                main.showListCart();
                                main.totalCart();
                            }else{
                                if(listCartLocal[i].quantity > 1){
                                    listCartLocal[i].quantity -= 1;
                                }else{
                                    listCartLocal.splice(i, 1);
                                }
                                localStorage.setItem("cart", JSON.stringify(listCartLocal));
                                main.getTotalProduct();
                                main.showListCart();
                                main.totalCart();
                            }
                            
                        }
                    }   
                })
            }})

        
    },
}



