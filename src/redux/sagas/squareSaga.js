import { takeEvery, call, put} from 'redux-saga/effects';
import axios from 'axios';

//gets previous transactions from square api
function* squareGet(action){
    console.log('transaction info saga')
    try {
        const squareGet = yield call(axios.get, '/api/square/get');
        console.log(squareGet.data)
        yield put({
            type: 'DISPLAY_HISTORY',
            payload: squareGet.data
        })
    } catch (error) {}
}
//posts transaciton to square api
function* squarePost(action) {
    console.log('in postSaga')
    try {
        console.log('ACTION HERE', action)
        const postTransaction = yield call(axios.post, '/api/square', action.payload);
        console.log('post transaction', postTransaction.data);
        yield put({
            type: 'DISPLAY_TRANSACTIONS',
            payload: postTransaction.data
        })
    } catch (error) {
        console.log('postSaga ERROR', error)
    }
}
// post to get for products square api
function* squareProductGet(action){
    
    try {
        const productsGet = yield call(axios.post, '/api/square/getproducts', action.payload);
        console.log('products',productsGet.data)
        yield put({
            type: 'DISPLAY_PRODUCTS',
            payload: productsGet.data
        })
    } catch (error) {}
}

function* squareNewProductPost(action){
    console.log('post new product')
    try {
        const productPost = yield call(axios.post, '/api/square/postproduct', action.payload);
        console.log('products',productPost.data)
        yield put({
            type: 'GET_PRODUCTS',
             payload: productPost.data
        })
    } catch (error) {}
}

//post request to trigger delete
function* deleteProduct(action){
    console.log('delete', action.payload)
    try {
        const deleteProduct = yield call(axios.post, '/api/square/deleteproduct', [action.payload]);
        yield put({
            type: 'GET_PRODUCTS',
            payload: deleteProduct.data
        })
    } catch (error) {}
}

function* toggleCashPage(action){
    
    try {
        yield put({
            type: 'SHOW_CASH',
            payload: action.payload
        })
    } catch (error) {}
}
function* cashTotalSaga(action){
   
    try {
        yield put({
            type: 'POST_CASH',
            payload: action.payload
        })
    } catch (error) {}
}
// 'POST_CASH'
function* squareSaga() {
    
    yield takeEvery('GET_TRANSACTIONS', squarePost);
    yield takeEvery('GET_HISTORY', squareGet);
    yield takeEvery('GET_PRODUCTS', squareProductGet);
    yield takeEvery('POST_PRODUCT', squareNewProductPost);
    yield takeEvery('DELETE_PRODUCT', deleteProduct);
    yield takeEvery('TOGGLE_CASH', toggleCashPage);
    yield takeEvery('TOTAL_CASH', cashTotalSaga);
}

export default squareSaga;