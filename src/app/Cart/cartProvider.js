const cartDao = require("../Cart/cartDao");

// 장바구니 내역 보기
exports.cartList = async function (userid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await cartDao.cartList(connection, userid);
    connection.release();
    return result;
};

// 장바구니 이미 담겨있는지 확인하기
exports.getCartIsExist = async function (userIdx, id){
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await cartDao.getCartIsExist(connection,userIdx,id);
    connection.release();
    return result;
}

// 장바구니 가격 계산하기
exports.calcCart = async function (userIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await cartDao.calcCart(connection,userIdx);
    connection.release();
    return result;
}