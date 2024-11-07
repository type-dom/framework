function logClass(target: Function) {
  console.log(`Class ${target.name} is being created`);
}

@logClass
class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const user = new User('Alice');
user.greet();
