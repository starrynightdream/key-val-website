// id pass
window.onload = function () {

    let main = new Vue({
        el: "#main",
        data: {
            name: undefined,
            id: "",
            pass: "",
            rePass: "",
            isLogin: true,
            errMessage: ""
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
            },

            regist() {

                if (!(this.pass && this.rePass && this.id) || this.rePass !== this.pass) {
                    this.errMessage = "请填写完整";
                    return;
                }
                this.errMessage = "";

                const that = this;
                this.$http.post("/regist", {
                    'id': that.id,
                    'pass': that.pass
                }).then(req => {

                    if (req.body.code == 1) {
                        window.location.href = '/';
                    } else {
                        that.errMessage = "注册失败";
                    }
                });
            },

            login() {
                const that = this;
                this.$http.post("/login", {
                    'id': that.id,
                    'pass': that.pass
                }).then(req => {

                    if (req.body.code == 1) {
                        window.location.href = '/';
                    } else {
                        that.errMessage = "登录失败";
                    }
                });
            },

            changePlan() {
                this.isLogin = !this.isLogin;
                this.errMessage = "";
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