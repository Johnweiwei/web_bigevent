$(function () {
    // 调用 getUserInfo 获取用户基本信息
    // getUserInfo()

    var layer = layui.layer

    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })
})


function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.mas("获取用户信息失败");
            }

            renderAvartar(res.data);
        }
    })
}


function renderAvartar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);

    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic).show()
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show();
    }
}