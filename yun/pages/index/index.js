// pages/index/index.js
Page({
    data: {
        num1: "",
        num2: "",
        sum: "",
        queryWayList: [
            {
                name: "名字",
                param: "name"
            },
            {
                name: "年龄",
                param: "age"
            },
            {
                name: "性别",
                param: "genre"
            }
        ],
        currentWayObj: {
            name: "名字",
            param: "name"
        },
        queryVal: "",
        resultList: [],
        userList: [],
        addObj: {
            name: "",
            age: "",
            genre: ""
        },
        updateObj:{
            name: '',
            age: ''
        },
        removeObj:{
            name: ''
        }
    },
    onShow() {
        wx.cloud.init();
    },
    handleCal() {
        const self = this;
        wx.showToast({
            title: "计算中"
        });
        wx.cloud.callFunction({
            name: "add",
            data: {
                a: self.data.num1,
                b: self.data.num2
            },
            success(res) {
                wx.hideToast({});
                self.setData({
                    sum: res.result.sum
                });
            },
            fail(err) {
                console.log(err);
            }
        });
    },
    handleInput1(e) {
        this.setData({
            num1: e.detail.value
        });
    },
    handleInput2(e) {
        this.setData({
            num2: e.detail.value
        });
    },
    handleTypePick(e) {
        const index = e.detail.value;
        let obj = {};
        obj.name = this.data.queryWayList[index].name;
        obj.param = this.data.queryWayList[index].param;
        this.setData({
            currentWayObj: obj
        });
    },
    handleQueryInput(e) {
        this.setData({
            queryVal: e.detail.value
        });
    },
    handleInput(e) {
        const type = e.currentTarget.dataset.name;
        this.setData({
            [type]: e.detail.value
        });
    },
    getData() {
        const queryVal = this.data.queryVal;
        this.setData({
            userList: []
        });
        if (!queryVal) {
            wx.showToast({
                title: "不能为空",
                icon: "none"
            });
            return false;
        }
        const self = this;
        wx.showToast({
            none: "none",
            title: "正在查询"
        });
        wx.cloud.callFunction({
            name: "queryUser",
            data: {
                param: self.data.currentWayObj.param,
                val: queryVal
            },
            success(res) {
                const data = res.result.data;
                if (!data || !data.length) {
                    wx.showToast({
                        none: "none",
                        title: "暂无数据"
                    });
                } else {
                    self.setData({
                        userList: res.result.data
                    });
                }
            },
            fail(err) {
                console.log(err);
            }
        });
    },
    addData() {
        const addObj = this.data.addObj;
        const name = addObj.name;
        const age = addObj.age;
        const genre = addObj.genre;
        if (!name) {
            wx.showToast({
                title: "名字不能为空",
                icon: "none"
            });
            return false;
        }
        if (!age) {
            wx.showToast({
                title: "年龄不能为空",
                icon: "none"
            });
            return false;
        }
        if (!genre) {
            wx.showToast({
                title: "性别不能为空",
                icon: "none"
            });
            return false;
        }
        const self = this;
        wx.showToast({
            none: "none",
            title: "正在插入"
        });
        wx.cloud.callFunction({
            name: "addUser",
            data: {
                name: name,
                age: age,
                genre: genre
            },
            success(res) {
                if (res.code == 1) {
                    wx.showToast({
                        none: "none",
                        title: "插入成功"
                    });
                } else {
                    wx.showToast({
                        none: "none",
                        title: res.result.msg
                    });
                }
            },
            fail(err) {
                console.log(err);
            }
        });
    },
    updateData(){
        const updateObj = this.data.updateObj;
        const name = updateObj.name;
        const age = updateObj.age;
        if (!name) {
            wx.showToast({
                title: "名字不能为空",
                icon: "none"
            });
            return false;
        }
        if (!age) {
            wx.showToast({
                title: "年龄不能为空",
                icon: "none"
            });
            return false;
        }
        const self = this;
        wx.showToast({
            none: "none",
            title: "正在更新"
        });
        wx.cloud.callFunction({
            name: "updateUser",
            data: {
                name: name,
                age: age
            },
            success(res) {
                if (res.code == 1) {
                    wx.showToast({
                        none: "none",
                        title: "更新成功"
                    });
                } else {
                    wx.showToast({
                        none: "none",
                        title: res.result.msg
                    });
                }
            },
            fail(err) {
                console.log(err);
            }
        });
    },
    removeData(){
        const removeObj = this.data.removeObj;
        const name = removeObj.name;
        if (!name) {
            wx.showToast({
                title: "名字不能为空",
                icon: "none"
            });
            return false;
        }
        const self = this;
        wx.showToast({
            none: "none",
            title: "正在删除"
        });
        wx.cloud.callFunction({
            name: "removeUser",
            data: {
                name: name
            },
            success(res) {
                if (res.code == 1) {
                    wx.showToast({
                        none: "none",
                        title: "删除成功"
                    });
                } else {
                    wx.showToast({
                        none: "none",
                        title: res.result.msg
                    });
                }
            },
            fail(err) {
                console.log(err);
            }
        });
    }
});
