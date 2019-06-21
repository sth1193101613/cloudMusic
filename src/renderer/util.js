
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
            let objectStore = db.createObjectStore(music, {keyPath: 'id', autoIncrement: true});
            objectStore.createIndex('name', 'name', {unique: true});
            objectStore.createIndex('songId', 'songId', {unique: true});
            objectStore.createIndex('auth', 'auth', {unique: true});
            objectStore.createIndex('time', 'time', {unique: true});
            objectStore.transaction.oncomplete = () => {
                const transaction = db.transaction(music, 'readwrite')
                const objStore = transaction.objectStore(music)
                objStore.put({
                    id: 1,
                    name: '李白' ,
                    songId:'1',
                    auth:'',
                    time:''
                })
            }
        };
    })
}
export function updateData(data) {
    clearData()
    let transaction = db.transaction(music, 'readwrite')
    let objectStore = transaction.objectStore(music)
    let request
    for(let i in data){
        request = objectStore.put(data[i])
    }
    transaction.oncomplete =  (event) => {
        console.log('transaction add complete')
    }

    transaction.onerror =  (error) => {
        console.error('add error', error)
    }
    request.onsuccess = (event) => {
        console.log('add complete')
    }

}//整个列表
export function addMusic(data) {
    let transaction = db.transaction(music, 'readwrite')
    let objectStore = transaction.objectStore(music)
    let request = objectStore.put({
        id:Math.random() * 10,
        name:data.name,
        songId:data.id,
        auth:data.song.artists[0].name,
        time:data.song.bMusic.playTime,
        pic:data.song.album.blurPicUrl,
    })
    transaction.oncomplete =  (event) => {
        console.log('transaction add complete')
    }

    transaction.onerror =  (error) => {

    }
    request.onsuccess = (event) => {
        console.log('add complete')
    }
}//添加单个音乐
export function getAllData() {
    return new Promise((resolve, reject) => {
        let store = db.transaction(music, 'readwrite')
        let objectStore = store.objectStore(music);
        let request = objectStore.openCursor();
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