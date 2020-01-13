class HelloWorld {
  async run(): Promise<void> {
    console.log("Hello World!");
  }
}

// MAIN
const helloWorld = new HelloWorld();
helloWorld
  .run()
  .then(() => console.log('Success!'))
  .catch(reason => console.error(reason));
