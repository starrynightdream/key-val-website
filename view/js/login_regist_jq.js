function toIndex() {
    window.location.href = '/';
}
function toKeyVal() {
    window.location.href = '/sas';
}
function toLogin() {
    window.location.href = '/lar';
}

function regist() {
    var pass = $('#pass');
    var rePass = $('#rePass');
    var id = $('#id');

    var errMess = document.getElementById('errMess');

    if (!(pass.val() && rePass.val() && id.val()) || pass.val() !== rePass.val()) {
        errMess.innerHTML = "请填写完整信息";
        return;
    }
    errMess.innerHTML = "";

    $.post('/regist', {
        'id': id.val(),
        'pass': pass.val()
    }, function (data) {

        if (data.code == 1)
            window.location.href = '/';
        else
            errMess.innerHTML = "注册失败";
    });
}

function login() {
    var pass = $('#pass');
    var id = $('#id');

    var errMess = document.getElementById('errMess');
    $.post('/login', {
        'id': id.val(),
        'pass': pass.val()
    }, function(data) {

        if (data.code == 1)
            window.location.href = '/';
        else
            errMess.innerHTML = "登录失败";
    });
}

var isLogin = false;
function changePlan() {
    isLogin = !isLogin;
    var errMess = document.getElementById('errMess');
    errMess.innerHTML = '';
    if (isLogin) {
        $('#login').removeClass('hide');
        $('#regist').addClass('hide');
    } else {
        $('#regist').removeClass('hide');
        $('#login').addClass('hide');
    }
}

$(function() {
    changePlan();
});