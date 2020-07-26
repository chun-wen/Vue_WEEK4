export default {
    template: ` <div class="modal-content">
    <div class="modal-header bg-danger">
        <h5 class="modal-title" id="exampleModalLongTitle">刪除產品</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 h3">
                    是否要刪除<span class="font-weight-bold">{{ tempProduct.title }}?</span>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
        <button type="button" class="btn btn-danger" @click="deleteProduct">刪除</button>
    </div>
</div>`,
    props: ['api', 'tempProduct'],
    data() {
        return {

        }
    },
    methods:{
        deleteProduct(){
            let apiUrl = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
                axios.delete(apiUrl, this.tempProduct).then(response => {
                    //console.log(response);
                    this.$emit('update-delete');
                }).catch(function (error) {
                    console.log(error, 'updateDelete')
                })
        }
    }
}