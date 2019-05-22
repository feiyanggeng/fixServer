/**
 * Created by Administrator on 2019/5/22 0022.
 */
let store = {
    data: {
        code: ''
    },
    getCode() {
        return this.data.code
    },
    setCode(code) {
        this.data.code = code
    }
}

module.exports = store