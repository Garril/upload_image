Page({
    data: {
        fileList: [],
        host: '',
        ossAccessKeyId: '',
        signature: '',
        policy: '',
        key: ''
    },
    // 上传图片
    uploadFile(filePath) {
        var that = this;
        that.filePath = filePath;
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: that.data.host, // 开发者服务器的URL。
                filePath: that.filePath,
                name: 'file', // 必须填file。
                timeout: 60000,
                formData: {
                    key: that.data.key,
                    policy: that.data.policy,
                    OSSAccessKeyId: that.data.ossAccessKeyId,
                    signature: that.data.signature,
                    // 'x-oss-security-token': securityToken // 使用STS签名时必传。
                },
                success: (res) => {
                    if (res.statusCode === 204) {
                        console.log('上传成功');
                    }
                    resolve(res)
                },
                fail: err => {
                    console.log(err);
                    reject(err)
                }
            });
        })
    },
    onLoad: function () {
        const {
            host,
            ossAccessKeyId,
            signature,
            policy,
            key
        } = require('./config')
        this.setData({
            host,
            ossAccessKeyId,
            signature,
            policy,
            key
        })
        // this.uploadImgToOss()
    },
    // 小程序上传触发的函数
    afterRead(event) {
        var that = this;
        wx.showLoading({
            title: '上传中...'
        })
        const {
            file
        } = event.detail //获取所需要上传的文件列表
        let uploadPromiseTask = [] //定义上传的promise任务栈
        for (let i = 0; i < file.length; i++) {
            uploadPromiseTask.push(this.uploadFile(file[i].path)) //push进每一张所需要的上传的图片promise栈
        }
        Promise.all(uploadPromiseTask).then(res => {
            //全部上传完毕
            that.setData({
                fileList: that.data.fileList.concat(res)
            })
            wx.hideLoading()
        }).catch(error => {
            //存在有上传失败的文件
            wx.hideLoading()
            wx.showToast({
                title: '上传失败！',
                icon: 'none',
            })
        })
    },
    // 删除图片
    deleteImg(event) {
        const delIndex = event.detail.index
        const {
            fileList
        } = this.data
        fileList.splice(delIndex, 1)
        this.setData({
            fileList
        })
    }
})