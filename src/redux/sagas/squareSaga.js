import { takeEvery, call, put} from 'redux-saga/effects';
import axios from 'axios';

//gets previous transactions from square api
function* squareGet(action){
    console.log('transaction info saga')
    try {
        const squareGet = yield call(axios.get, '/api/square/get');
        const cashGet = yield call(axios.get, '/api/square/getcash');
        console.log(squareGet.data)
        console.log(cashGet.data)
        yield put({
            type: 'DISPLAY_HISTORY',
            payload: {credit:squareGet.data.transactions,
                        cash: cashGet.data}
        })
    } catch (error) {}
}
//posts transaciton to square api
function* squarePost(action) {
    console.log('in postSaga')
    try {
        console.log('ACTION HERE', action.payload)
        const postTransaction = yield call(axios.post, '/api/square', [action.payload]);
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
//posts new product to the square api
function* squareNewProductPost(action){
    console.log('post new product')
    try {
        const productPost = yield call(axios.post, '/api/square/postproduct', action.payload);
        console.log('products',productPost.data)
        yield put({
            type: 'GET_PRODUCTS'
             
        })
    } catch (error) {}
    
}

//post request to trigger delete
function* deleteProduct(action){
    console.log('delete', action.payload)
    try {
        const deleteProduct = yield call(axios.post, '/api/square/deleteproduct', [action.payload]);
        yield put({
            type: 'GET_PRODUCTS'
            
        })
    } catch (error) {}
}
//toggles payment pages
function* toggleCashPage(action){
    
    try {
        yield put({
            type: 'SHOW_CASH',
            payload: action.payload
        })
    } catch (error) {}
}

//holds the total for the cash payment page
function* cashTotalSaga(action){
   
    try {
        yield put({
            type: 'POST_CASH',
            payload: action.payload
        })
    } catch (error) {}
}
//posts cash payment to the db
function* cashPaymentPost(action){
    console.log('post new product')
    try {
        const cashPaymentPost = yield call(axios.post, '/api/square/postcash', action.payload);
        
    } catch (error) {}
}
//pulls all the info for the market view page
function* marketViewGet(action){
   
    
    try {
        const squareGet = yield call(axios.get, '/api/square/get');
        const cashGet = yield call(axios.get, '/api/square/getcash');
         const weatherGet = yield call(axios.post, '/api/square/getWeather', action.payload);
        //  const eventsGet = yield call(axios.post, '/api/square/getevents', action.payload);
        console.log("transactions credit",squareGet.data)
        console.log("transactions cash",cashGet.data)
        console.log("weather data",weatherGet.data.history.dailysummary)
        // console.log("event data",eventsGet.data.events.event)
        yield put({
            type: 'MARKET_VIEW',
            payload: {credit:squareGet.data.transactions,
                        cash: cashGet.data,
                    weather: weatherGet.data.history.dailysummary,
        events: {},
                    spinner: false}
        })
    } catch (error) {}
}
//'POST_PRODUCT_EDIT'
function* productEditPost(action){
    console.log('post edit product')
    try {
        const productedit = yield call(axios.post, '/api/square/productedit', action.payload);
        console.log('products',productedit.data)
        yield put({
            type: 'GET_PRODUCTS'
             
        })
    } catch (error) {}
    
}

function* squareSaga() {
    yield takeEvery('POST_PRODUCT', squareNewProductPost);
    yield takeEvery('GET_TRANSACTIONS', squarePost);
    yield takeEvery('GET_HISTORY', squareGet);
    yield takeEvery('GET_PRODUCTS', squareProductGet);
    yield takeEvery('DELETE_PRODUCT', deleteProduct);
    yield takeEvery('TOGGLE_CASH', toggleCashPage);
    yield takeEvery('TOTAL_CASH', cashTotalSaga);
    yield takeEvery('CASH_TRANSACTION', cashPaymentPost);
    yield takeEvery('MARKET_GET', marketViewGet);
    yield takeEvery('POST_PRODUCT_EDIT', productEditPost);
}

export default squareSaga;