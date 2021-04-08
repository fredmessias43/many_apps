export default class  Customer {
    constructor(dbName) {
        this.dbName = dbName;
        this.allQueries = [];
        this.dbExists = window.localStorage.getItem(this.dbName) !== null;
        this.allData = this.dbExists ? JSON.parse(window.localStorage.getItem(this.dbName)) : [];
    }

    initialLoad(){
        if (!this.dbExists) {
            window.localStorage.setItem(this.dbName,"[]");
        }else {
            //console.log('this DB already exists');
        }
    }

    loadDB(data){
        const newData = JSON.stringify([...this.allData, data ]);
        window.localStorage.setItem(this.dbName, newData)
    }

    queryAllDB(){
        return this.allData;
    }

    clearAll() {
        window.localStorage.clear();
    }
}

const DBNAME = '@CustomerDB'

export function initialLoad() {
    console.log('initialLoad');

    let customer = new Customer(DBNAME);
    customer.initialLoad();
}
export function LoadDB(data) {
    let customer = new Customer(DBNAME);
    customer.loadDB(data);
    console.log('LoadDB');
}
export function queryDB() {
    let customer = new Customer(DBNAME);
    console.log('queryDB');
    return customer.queryAllDB();
}
export function clearDB() {
    let customer = new Customer(DBNAME);
    customer.clearAll();
    console.log('clearDB');
}