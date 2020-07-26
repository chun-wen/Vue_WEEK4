const api = `https://course-ec-api.hexschool.io/api/`;
const uuid = `0651180d-9a32-4622-8af7-cd0265f7aa39`;


new Vue({
    el: "#app",
    data: {
        user: {
            email: '',
            password: '',
        },
        token: ''
    },
    methods: {
        signIn() {
            const apiUrl = `${api}auth/login`;
            axios.post(apiUrl, this.user).then(function (response) {
                console.log(response.data);
                let expired = response.data.expired;
                let token = response.data.token;
                //this.token = token;
                document.cookie = `hexToken=${token}; expires=${new Date(expired * 1000)}; path=/`;
                window.location='./product.html';
                // this.getProducts();
                
            })
                .catch(error => {
                    console.log(error.response);
                    alert(error.response.data.message);
                });
        },
        signOut() {
            document.cookie = `loginApi=; expires=; path=/`;
        }
    }

})