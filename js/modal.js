export default {
    template: ` <div class="modal-content">
                    <div class="modal-header bg-info">
                        <h5 class="modal-title " id="exampleModalLongTitle">新增產品</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group col-md-12">
                                        <label for="imageUrl">輸入圖片網址</label>
                                        <input type="text" class="form-control" v-model="tempProduct.imageUrl[0]"
                                            id="imageUrl" placeholder="請輸入圖片連結">
                                    </div>
                                    <img :src="tempProduct.imageUrl[0]" alt="" class="img-fluid">
                                </div>
                                <div class="col-sm-8">
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label for="title">標題</label>
                                            <input type="text" class="form-control" id="title"
                                                v-model="tempProduct.title" placeholder="請輸入標題">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="category">分類</label>
                                            <input type="text" class="form-control" id="category"
                                                v-model="tempProduct.category" placeholder="請輸入分類">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="unit">單位</label>
                                            <input type="text" class="form-control" id="unit" v-model="tempProduct.unit"
                                                placeholder="請輸入單位">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="origin_price">原價</label>
                                            <input type="number" class="form-control" id="origin_price"
                                                v-model="tempProduct['origin_price']" placeholder="請輸入原價">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="price">售價</label>
                                            <input type="number" class="form-control" id="price"
                                                v-model="tempProduct.price" placeholder="請輸入售價">
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label for="description">商品說明</label>
                                            <textarea class="form-control" id="description"
                                                v-model="tempProduct.description" placeholder="請輸入產品描述"
                                                rows="2"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label for="content">產品描述</label>
                                            <textarea class="form-control" id="content" v-model="tempProduct.content"
                                                placeholder="請輸入說明內容" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="enabled"
                                                    v-model="tempProduct.enabled">
                                                <label class="form-check-label" for="enabled">
                                                    是否啟用
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                        <button type="button" class="btn btn-info" @click="saveProduct">儲存</button>
                    </div>
                </div>`,
    props: ['api','tempProduct'],
    data() {
        return {
            // tempProduct: {
            //     imageUrl: []
            // },
        }
    },
    methods: {
        saveProduct() {
            if (this.tempProduct.id !== undefined) {
                let apiUrl = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
                axios.patch(apiUrl, this.tempProduct).then(response => {
                    //console.log(response);
                    this.$emit('update');
                }).catch(function (error) {
                    console.log(error, 'editSave')
                })
            }
            else{
                const id = new Date().getTime();
                this.tempProduct.id = id;
                let apiUrl = `${this.api.path}${this.api.uuid}/admin/ec/product`;
                axios.post(apiUrl, this.tempProduct).then(response => {
                    console.log(response);
                    this.tempProduct = {
                        imageUrl: []
                    };
                    this.$emit('update');
                }).catch(function (error) {
                    console.log(error, 'CreateSave')
                })
            }
        }
    },
}