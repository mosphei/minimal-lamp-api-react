export default function service(){
    console.log('service');
}
const table='sampleTodos';
const apiUrl='api.php';
export function fetchItems() {
    return fetch(
        apiUrl+'?table='+table
    )
    .then((response)=>(response.json()))
    .then((result)=>{
        return result.docs;
    })
    .catch((err)=>{
        console.log('err getting items',err);
    });
}
export function saveItem(_item) {
    const data={
        doc: Object.assign({},_item),
        table:table
    };
    return fetch(
        apiUrl,
        {
            method:'POST',
            body:JSON.stringify(data)
        }
    );
}
export function removeItem(_item) {
    const data={
        doc: Object.assign({},_item),
        table:table
    };
    console.log('removeItem data',data);
    return fetch(
        apiUrl,
        {
            method:"DELETE",
            body:JSON.stringify(data)
        }   
    );
}