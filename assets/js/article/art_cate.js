$(function () {
    var layer = layui.layer;
    var form = layui.form;
    // 获取文章分类的列表
    initArtCateList();
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 添加类别
    var indexAdd = null;
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList();
                layer.msg('新增分类成功！');
                layer.close(indexAdd);
            }
        })
    })

    // 编辑按钮
    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
        var name = $(this).attr('data-name')
        var alias = $(this).attr('data-alias')
        form.val('form-edit', {
            Id: id,
            name: name,
            alias: alias
        })
    })

    // 确认修改按钮
    $('body').on('submit','#form-edit',function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList();
            }
        })
    })

    // 删除按钮
    $('tbody').on('click','.btn-delete',function() {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if(res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList();
                }
            })
        })
        
    })
})