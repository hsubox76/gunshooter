export function fetchRoom (id) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/room/' + id, true);
        
        xhr.onload = () => {
            if (xhr.status === 200) {
                let data;
                try {
                    data = JSON.parse(xhr.responseText);
                } catch(e) {
                    reject('Couldn\'t parse JSON for room ID ' + id);
                }
                resolve(data);
            } else {
                reject('Fetching room ' + id + ' failed: ' + xhr.statusText);
            }
        }
        
        xhr.onerror = (e) => {
            reject('Fetching room ' + id + ' failed: ' + xhr.statusText);
        }
        
        xhr.send();
    });
}

export function fetchItems (itemIds) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/item?ids=' + itemIds.join(','), true);
        
        xhr.onload = () => {
            if (xhr.status === 200) {
                let data;
                try {
                    data = JSON.parse(xhr.responseText);
                } catch(e) {
                    reject('Couldn\'t parse JSON for item ID ' + itemIds);
                }
                resolve(data);
            } else {
                reject('Fetching item ' + itemIds + ' failed: ' + xhr.statusText);
            }
        }
        
        xhr.onerror = (e) => {
            reject('Fetching item ' + itemIds + ' failed: ' + xhr.statusText);
        }
        
        xhr.send();
    });
}