export default {
    template: `<nav aria-label="分頁">
                <ul class="pagination">
                    <li class="page-item" :class="{disabled:pages.current_page ===1}">
                        <a class="page-link" href="#"  @click.prevent="previous(pages.current_page -1)" >上ㄧ頁</a>
                    </li>
                      <li class="page-item" v-for="item in pages.total_pages" :key="item" :class="{active: pages.current_page === item}">
                         <a class="page-link" href="#" @click.prevent="change(item)" >
                           {{item}}
                         </a>
                       </li>
                    <li class="page-item" :class="{disabled:pages.current_page === pages.total_pages}">
                       <a class="page-link" href="#" @click.prevent="next(pages.current_page +1)" >下一頁</a>
                     </li>
                </ul>
                </nav>`,
    props: ['pages'],
    data() {
        return {
            
        }
    },
    methods: {
        change(item) {
            this.$emit('update', item);
            console.log(item);
        },
        previous(item){
            this.$emit('update', item);
        },
        next(item){
            this.$emit('update', item);
        }
    },
}