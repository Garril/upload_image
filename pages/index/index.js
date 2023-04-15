Page({
    data: {
        // 图片列表
        imgList: [],
        // 权限相关的参数
        host: '',
        ossAccessKeyId: '',
        signature: '',
        policy: '',
        key: '',
    },
    // 上传图片到oss
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
    // 生命周期onLoad
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
        // const res = this.uploadFile('/pages/assets/test.png')
        // res.then(res => {
        //     console.log(res)
        // })
    },
    // 小程序上传触发的函数
    touchUpload(event) {
        var that = this;
        wx.showLoading({
            title: '上传中...'
        })
        console.log(event);
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
    chooseAndUpload: function () {
        var that = this;
        wx.chooseMedia({
            count: 1, // 最多上传1张图片(后端没域名暂时，只能写死拿一张)
            mediaType: ['image'], // 文件类型
            sourceType: ['album', 'camera'], // 可以从相册或拍照选择
            sizeType: ['compressed'], // 选择压缩过的图片
            camera: 'back', // 摄像头，前置front 后置back
            success: (res) => {
                // 从本地选择的图片文件的临时路径（即暂存路径）。
                // 选择一张照片后，小程序会将其复制到一个临时文件夹，并返回该文件的临时路径给开发者。
                const tempFiles = res.tempFiles[0];
                const tempFilePath = tempFiles.tempFilePath;
                const new_imgList = that.data.imgList;
                // new_imgList.push(tempFilePath);
                new_imgList[0] = tempFilePath;
                that.setData({
                    imgList: new_imgList
                })
                wx.showLoading({
                    title: '上传中...',
                })
                console.log("that.data.imgList: ", that.data.imgList)
                that.uploadFile(tempFilePath).then(res => {
                    console.log("res: ", res);
                    wx.hideLoading();
                    wx.showToast({
                        title: '上传成功',
                        icon: "success",
                        duration: 1500
                    })
                })
            },
            fail: (err) => {
                console.log("err: ", err);
            }
        })
    }
})