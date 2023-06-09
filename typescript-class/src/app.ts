class Department {
  // 키 이름만 정의된 상태
  // team: string
  protected employees: string[] = []
  static fisicalyear: number = 2020
  // 객체가 만들어지면서 실행되는 메서드
  // 클래스가 생성될때 n을 인자로 받아서 내부 변수인 team에 n을 할당함.
  constructor(private team: string, private id: string) {}

  static createEmployee(name: string) {
    return { name: name }
  }

  describer(this: Department) {
    console.log(`This team is ${this.team}`)
  }

  addEmployee(person: string) {
    this.employees.push(person)
  }

  printEmployeeInfo() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

const employee = Department.createEmployee('korilapeople')
console.log('employee', employee)

const accountring = new Department('Accounting', '2')
accountring.addEmployee('kokyusik')
accountring.addEmployee('najonghwan')

accountring.printEmployeeInfo()

accountring.describer()

console.log('accountring', accountring)

class ITDepartment extends Department {
  admins: string[]
  constructor(team: string, admins: string[]) {
    super(team, 'Development')
    this.admins = admins
  }
}

class AccountingDepartment extends Department {
  private lastReports: string
  constructor(id: string, private reports: string[]) {
    super('Accounting', id)
    this.lastReports = reports[0]
  }

  get mostRecentReport() {
    if (this.lastReports) {
      return this.lastReports
    }
    throw new Error('There is no Reports')
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid report')
    }
    this.addEmployee(value)
  }

  addEmployee(person: string): void {
    if (person === 'Nancy') {
      return
    }

    this.employees.push(person)
  }

  addReports(text: string) {
    this.reports.push(text)
    this.lastReports = text
  }

  printReports() {
    console.log(this.reports)
  }
}

const account = new AccountingDepartment('d2', ['payment'])
account.addReports('checked')
account.addEmployee('kokoa')
console.log(account)

const itDepartment = new ITDepartment('d1', ['minus'])
console.log('itDepartment', itDepartment)
