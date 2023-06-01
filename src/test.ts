class testPool {
    private static instance: testPool;

    private testPool: { [id: string]: string };

    private constructor() {
        this.testPool = {};
    }


    public static getInstace() {
        if (!testPool.instance) {
            testPool.instance = new testPool();
        }
        return testPool.instance;
    }

    public addTest(test: string, value: string) {
        this.testPool[test] = value;
    }

    public getTest(test: string): string {      
        return this.testPool[test];
    }
}

let teste = testPool.getInstace();
teste.addTest("testeID", "testeVALUE");
console.log(teste.getTest("testeID"));
console.log(teste.getTest("testeID2"));
if(teste.getTest("testeID2") == undefined){
    console.log("INDEFINIDO");
}
