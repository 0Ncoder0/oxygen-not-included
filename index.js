"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var Computer = /** @class */ (function () {
    function Computer() {
        var _this = this;
        this.time = 1;
        this.providers = new Map();
        this.demands = new Map();
        this.supplies = new Map();
        this.needs = new Map();
        /** 设置时长，单位秒 */
        this.setTimeCircle = function (time) { return (_this.time = time); };
        this.addProvider = function (name, count) {
            _this.providers.set(name, (_this.providers.get(name) || 0) + count);
        };
        this.addDemand = function (name, weight) {
            _this.demands.set(name, (_this.demands.get(name) || 0) + weight);
        };
        this.addSupply = function (name, weight) {
            _this.supplies.set(name, (_this.supplies.get(name) || 0) + weight);
        };
        this.addNeed = function (name, weight) {
            _this.needs.set(name, (_this.needs.get(name) || 0) + weight);
        };
        this.findDemand = function () {
            var _a = _this, demands = _a.demands, supplies = _a.supplies;
            var name = Array.from(demands.keys()).find(function (name) { return demands.get(name) > (supplies.get(name) || 0); });
            if (!name)
                return null;
            return { name: name, weight: demands.get(name) - (supplies.get(name) || 0) };
        };
        this.findProvider = function (name) {
            return database_1.database.find(function (item) { var _a; return (_a = item["export"]) === null || _a === void 0 ? void 0 : _a.some(function (ele) { return ele.name === name; }); });
        };
        this.compute = function () {
            var _a, _b, _c;
            var _d = _this, findDemand = _d.findDemand, findProvider = _d.findProvider, addSupply = _d.addSupply, addNeed = _d.addNeed, addProvider = _d.addProvider, addDemand = _d.addDemand;
            var demand = findDemand();
            if (!demand)
                return;
            var provider = findProvider(demand.name);
            if (!provider) {
                addSupply(demand.name, demand.weight);
                addNeed(demand.name, demand.weight);
            }
            else {
                var product = (_a = provider["export"]) === null || _a === void 0 ? void 0 : _a.find(function (ele) { return ele.name === demand.name; });
                var time_1 = Math.ceil(demand.weight / ((product === null || product === void 0 ? void 0 : product.weight) || 1));
                addProvider(provider.name, time_1);
                (_b = provider["export"]) === null || _b === void 0 ? void 0 : _b.forEach(function (item) { return addSupply(item.name, item.weight * time_1); });
                (_c = provider["import"]) === null || _c === void 0 ? void 0 : _c.forEach(function (item) { return addDemand(item.name, item.weight * time_1); });
            }
            return _this.compute();
        };
    }
    /** 额外产出的资源 */
    Computer.prototype.getExtra = function () {
        var _a = this, demands = _a.demands, supplies = _a.supplies;
        var extraNames = Array.from(supplies.keys()).filter(function (name) { return supplies.get(name) > (demands.get(name) || 0); });
        return extraNames.map(function (name) { return ({ name: name, weight: supplies.get(name) - (demands.get(name) || 0) }); });
    };
    return Computer;
}());
var computer = new Computer();
var time = 600 * 10000;
var duplicates = 12;
/** 100 周期 */
computer.setTimeCircle(time);
/** 12 个复制人 100 周期消耗 */
var originDemands = [
    { name: '食物', weight: (1000 / 600) * time * duplicates },
    { name: '氧气', weight: 100 * time * duplicates }
];
originDemands.forEach(function (ele) { return computer.addDemand(ele.name, ele.weight); });
computer.compute();
console.log({
    说明: duplicates + " \u4E2A\u590D\u5236\u4EBA " + time / 600 + " \u5468\u671F\u7684\u751F\u5B58\u9700\u6C42\uFF0C\u5355\u4F4D\uFF1A\u514B\uFF0C\u7126\uFF0C\u79D2\uFF0C\u5343\u5361\uFF0CDTU",
    原始需求: originDemands,
    资源转换工具: new Map(Array.from(computer.providers.keys()).map(function (name) { return [name, Math.ceil(computer.providers.get(name) / time)]; })),
    满足需求需要的总资源: computer.needs,
    平均每秒需要提供资源: new Map(Array.from(computer.needs.keys()).map(function (name) { return [name, Math.ceil(computer.needs.get(name) / time)]; })),
    满足需求后的额外产出: computer.getExtra()
});
