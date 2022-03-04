import axios from "axios";

const ITEM_API_VIEW_URL = "http://localhost:8082/app/item/view";

const ITEM_API_ADD_URL = "http://localhost:8082/app/item/add";

const ITEM_API_PUT_URL = "http://localhost:8082/app/item/update";

const ITEM_API_DELETE_URL = "http://localhost:8082/app/item/delete";

class ItemService {
    getItem() {
        return axios.get(ITEM_API_VIEW_URL);
    }

    addItem(item) {
        return axios.post(ITEM_API_ADD_URL,item);
    }

    getItemById(itemId) {
        return axios.get(ITEM_API_VIEW_URL + '/' + itemId);
    }

    updateItem(item, itemId) {
        return axios.put(ITEM_API_PUT_URL + '/' + itemId, item);
    }

    deleteItem(itemId) {
        return axios.delete(ITEM_API_DELETE_URL + '/' + itemId);
    }
}

export default new ItemService();