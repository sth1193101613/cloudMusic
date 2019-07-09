let db = {}
let music = 'music'
export function createdData() {
    return new Promise((resolve, reject) => {
        let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
        if (!indexedDB)console.log('你的浏览器不支持IndexedDB');
        let musicLists = window.indexedDB.open('musicList', 1);
        musicLists.onsuccess = (e) => {
            db = e.target.result;
            //成功
        };
        musicLists.onerror = (e) =>{
            console.log(e.currentTarget.error.message);
        };
        musicLists.onupgradeneeded = (e) => {
            db = e.target.result;
            if(!db.objectStoreNames.contains(music)){
                let objectStore = db.createObjectStore(music, {keyPath: 'id', autoIncrement: true});
                objectStore.createIndex('name', 'name', {unique: false});
                objectStore.createIndex('songId', 'songId', {unique: false});
                objectStore.createIndex('auth', 'auth', {unique: false});
                objectStore.createIndex('time', 'time', {unique: false});
                objectStore.createIndex('pic', 'pic', {unique: false});
                objectStore.transaction.oncomplete = () => {
                    const transaction = db.transaction(music, 'readwrite')
                    const objStore = transaction.objectStore(music)
                    objStore.put({
                        id: 1,
                        name: '' ,
                        songId:'',
                        auth:'',
                        time:'1'
                    })
                }
            }
        };
    })
}
export function addMusic(data) {
    let transaction = db.transaction(music, 'readwrite')
    let objectStore = transaction.objectStore(music)
    let arr = data.length > 50 ?  data.slice(0,40) :data
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
        objectStore.put(arr[i])
    }
}//添加单个音乐//或者全部音乐
export function getAllData() {
    return new Promise((resolve, reject) => {
        let store = db.transaction(music, 'readwrite')
        let objectStore = store.objectStore(music);
        let request = objectStore.openCursor();
        console.log(request)
        let data = []
        request.onerror = () => {
            console.error('getDataByKey error');
        };
        request.onsuccess = (e) =>{
            let result = e.target.result;
            if (result && result !== null) {
                data.push(result.value);
                result.continue();
            } else {
                resolve(data)
            }
        }
    })
}//获取全部音乐
export function clearData() { //删除全部
    let store = db.transaction(music, 'readwrite')
    let objectStore = store.objectStore(music);
    objectStore.clear();
}//删除全部音乐
export function deleteData(item) {
    let store  = db.transaction(music, 'readwrite');
    let objectStore = store.objectStore(music)
    objectStore.delete(item)
}//删除单个音乐
export function getAuth(data) {
    let arr = []
    for(let i in data){
        arr.push(data[i].name)
    }
    return arr.join('/')
}
