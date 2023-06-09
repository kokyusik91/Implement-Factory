"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Department = /** @class */ (function () {
    // 객체가 만들어지면서 실행되는 메서드
    // 클래스가 생성될때 n을 인자로 받아서 내부 변수인 team에 n을 할당함.
    function Department(team, id) {
        this.team = team;
        this.id = id;
        // 키 이름만 정의된 상태
        // team: string
        this.employees = [];
    }
    Department.createEmployee = function (name) {
        return { name: name };
    };
    Department.prototype.describer = function () {
        console.log("This team is ".concat(this.team));
    };
    Department.prototype.addEmployee = function (person) {
        this.employees.push(person);
    };
    Department.prototype.printEmployeeInfo = function () {
        console.log(this.employees.length);
        console.log(this.employees);
    };
    return Department;
}());
var employee = Department.createEmployee('korilapeople');
console.log('employee', employee);
var accountring = new Department('Accounting', '2');
accountring.addEmployee('kokyusik');
accountring.addEmployee('najonghwan');
accountring.printEmployeeInfo();
accountring.describer();
console.log('accountring', accountring);
var ITDepartment = /** @class */ (function (_super) {
    __extends(ITDepartment, _super);
    function ITDepartment(team, admins) {
        var _this = _super.call(this, team, 'Development') || this;
        _this.admins = admins;
        return _this;
    }
    return ITDepartment;
}(Department));
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment(id, reports) {
        var _this = _super.call(this, 'Accounting', id) || this;
        _this.reports = reports;
        _this.lastReports = reports[0];
        return _this;
    }
    Object.defineProperty(AccountingDepartment.prototype, "mostRecentReport", {
        get: function () {
            if (this.lastReports) {
                return this.lastReports;
            }
            throw new Error('There is no Reports');
        },
        set: function (value) {
            if (!value) {
                throw new Error('Please pass in a valid report');
            }
            this.addEmployee(value);
        },
        enumerable: false,
        configurable: true
    });
    AccountingDepartment.prototype.addEmployee = function (person) {
        if (person === 'Nancy') {
            return;
        }
        this.employees.push(person);
    };
    AccountingDepartment.prototype.addReports = function (text) {
        this.reports.push(text);
        this.lastReports = text;
    };
    AccountingDepartment.prototype.printReports = function () {
        console.log(this.reports);
    };
    return AccountingDepartment;
}(Department));
var account = new AccountingDepartment('d2', ['payment']);
account.addReports('checked');
account.addEmployee('kokoa');
console.log(account);
var itDepartment = new ITDepartment('d1', ['minus']);
console.log('itDepartment', itDepartment);
