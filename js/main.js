import modalContent from './modal.js';
import paginationContent from './pagination.js';
import deletemodalContent from './deletemodal.js';

//元件名稱(前) 元件內容(後)
Vue.component('pagination', paginationContent);
Vue.component('modal', modalContent);
Vue.component('deletemodal', deletemodalContent);




new Vue({
    el: "#app",
    data: {
        products: [],
        pagination: {},
        //imageUrl結構是陣列
        tempProduct: {
            imageUrl: []
        },
        api: {
            uuid: '0651180d-9a32-4622-8af7-cd0265f7aa39',
            path: 'https://course-ec-api.hexschool.io/api/'
        },
        token: '',
    },
    created() {
        //將token直接放入created生命週期中,這樣每個methods就可以直接帶入
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (this.token === "") {
            window.location = 'login.html';
            alert("沒有權限進入頁面！");
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.getProducts();
    },
    methods: {
        openModal(isNew, item) {
            switch (isNew) {
                case 'new':
                    this.tempProduct = {
                        imageUrl: [],
                    };
                    $("#addModal").modal("show")
                    break;
                case 'edit':
                    let apiUrl = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;
                    axios.get(apiUrl).then(res => {
                        this.tempProduct = res.data.data
                        $("#addModal").modal("show");
                    });
                    break;
                case 'delete':
                    this.tempProduct = Object.assign({}, item)
                    $("#deleteModal").modal("show")
                    break;
                default:
                    break;
            }
        },
        getProducts(num = 1) {
            let apiUrl = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${num}`;
            axios.get(apiUrl).then(response => {
                //console.log(response)
                this.products = response.data.data;
                this.pagination = response.data.meta.pagination;
            })
                .catch(function (error) {
                    console.log(error, 'getProducts');
                    alert(error.response.data.message);
                })
        },
        closeModal(){
            alert('更新成功！')
            $("#addModal").modal("hide");
            this.getProducts();
        },
        closeDeleteModal(){
            alert('刪除成功！')
            $("#deleteModal").modal("hide");
            this.getProducts();
        }
    },
});

