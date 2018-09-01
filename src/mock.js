export default function service(){
    console.log('mock');
}
function async(item) {
    var randomDelay=Math.floor(Math.random()*1000);
    var d=new Promise(function(resolve,reject){
        setTimeout(() => { resolve(item) }, randomDelay);
    });
    return d;
}
function generateDocs(_count) {
    var retval=[];
    for (var i=0;i<_count;i++) {
        retval.push({
            _id:'todo_' + i + '_' + new Date().getTime(),
            text:'item '+i,
            completed:false
        });
    }
    return retval
}

var items=generateDocs(10);

export function fetchItems() {
    return async(items);
}
export function saveItem(_item) {
    console.log('saveItem _item',_item);
    var i=items.findIndex(d=>{return d._id==_item._id});
    if (i >= 0) {
        items[i]=_item;
    } else {
        items.push(_item);
    }
    return async(true);
}
export function removeItem(_item) {
    var i=items.findIndex(d=>{return d._id==_item._id});
    if (i >= 0) {
        items.splice(i,1);
    }
    return async(true);
}