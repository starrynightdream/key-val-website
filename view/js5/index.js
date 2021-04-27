window.onload = function () {

    let main = new Vue({
        el: "#main",
        data: {
            name: undefined
        },
        methods: {
            toIndex() {
                window.location.href = '/';
            },
            toKeyVal() {
                window.location.href = '/sas';
            },
            toLogin() {
                window.location.href = '/lar';
            }
        },
        created() {
            const that = this;
            this.$http.post("/user").then(req => {

                if (req.body.message) that.name = req.body.message;else that.name = '无名';
            });
        }
    });
};