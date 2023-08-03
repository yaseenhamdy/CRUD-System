var proName = document.getElementById("proName");
var proPrice = document.getElementById("proPrice");
var proDesc = document.getElementById("proDesc");
var s = document.getElementById('search')
var ele;
productArray = [];
if (localStorage.getItem("products") != null) {
    productArray = JSON.parse(localStorage.getItem("products"));
    displayProduct();
}

function product() {
    if (proName.value == "" || proPrice.value == "" || proDesc.value == "") {
        swal({
            title: "Fill in the fields!",
            icon: "error",
            button: "OK",
        });
        clearInputs()
    } else {
        productObject = {
            name: proName.value,
            price: proPrice.value,
            desc: proDesc.value,
        };
        productArray.push(productObject);
        localStorage.setItem("products", JSON.stringify(productArray));
        displayProduct();
        
        clearInputs()
    }
}

function displayProduct() {
    var car = ``;
    for (var i = 0; i < productArray.length; i++) {
        car += `
        <tr>
        <td>${productArray[i].name}</td>
        <td>${productArray[i].price}</td>
        <td>${productArray[i].desc}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger my-2 text-white">Delete<i class="fa-solid fa-trash ps-4"></i></button>
        <button onclick="updateinputs(${i})" class="btn btn-dark text-white my-2">Ubdate<i class="fa-solid fa-pen ps-4"></i></button>
        </td>
        </tr>
        `
    }
    document.getElementById("demo").innerHTML = car;
}
function clearInputs() {
    proName.value = "";
    proPrice.value = "";
    proDesc.value = "";
}
function deleteProduct(index) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                productArray.splice(index, 1);
                localStorage.setItem("products", JSON.stringify(productArray));
                displayProduct();
                swal("Poof! Product has been deleted!", {
                    icon: "success",
                });
            }
        });

}

function updateinputs(index) {
    proName.value = productArray[index].name;
    proPrice.value = productArray[index].price;
    proDesc.value = productArray[index].desc;
    document.getElementById("update").className = "d-inline-block btn btn-dark text-white";
    document.getElementById("add").className = "d-none"
    ele = index;
}

function updateProduct(index) {
    var index = ele;
    productObject2 = {
        name: proName.value,
        price: proPrice.value,
        desc: proDesc.value,
    }
    productArray[index] = productObject2;
    localStorage.setItem("products", JSON.stringify(productArray));
    displayProduct();
    clearInputs()
    document.getElementById("update").className = "d-none btn btn-dark text-white";
    document.getElementById("add").className = "d-inline-block btn btn-info text-white"
}
function clearProducts() {
    if (localStorage.getItem("products") == null) {
        swal({
            title: "There is no data for you to clean up!",
            icon: "error",
            button: "OK",
        });
    }
    else {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {

                if (willDelete) {
                    localStorage.clear();
                    productArray = []
                    displayProduct();
                    swal("Poof! data has been deleted!", {
                        icon: "success",
                    });
                }
            });
    }
}
function searchProduct(search) {
    var car = ``;
    for (var i = 0; i < productArray.length; i++) {
        if (productArray[i].name.toLowerCase().includes(search.toLowerCase())) {
            indexS = productArray[i].name.toLowerCase().indexOf(search.toLowerCase())
            car += `
        <tr>
            <td>${productArray[i].name.replace(productArray[i].name.substring(indexS, indexS + search.length), `<span>${productArray[i].name.substring(indexS, indexS + search.length)}</span>`)}</td>
            <td>${productArray[i].price}</td>
            <td>${productArray[i].desc}</td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger my-2 text-white">Delete<i class="fa-solid fa-trash ps-4"></i></button>
            <button onclick="updateinputs(${i})" class="btn btn-dark text-white my-2">Ubdate<i class="fa-solid fa-pen ps-4"></i></button>
           </td>

        </tr>
            `
        }
    }
    document.getElementById("demo").innerHTML = car;
}