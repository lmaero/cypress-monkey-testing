# Monkey con Cypress.io
Monkey test using recursion to fire random events over different HTML elements

## How to run this project
1. Clone this repository
```sh 
git clone https://github.com/lmaero/cypress-monkey-testing
```

2. Go inside cloned directory
```sh 
cd cypress-monkey-testing
```

3. Install dependencies using `npm` or `yarn`

|npm|yarn|
|---|----|
|```npm install```|```yarn install```|

4. Execute
```sh 
cypress open
```
You should inmediately see the following interface: [Cypress Interface](https://github.com/lmaero/cypress-monkey-testing/blob/main/assets/cypress-open-main-interface.png)
![](/assets/cypress-open-main-interface.png)


5. Automated testing should start inmediately
It is recommended to open Chrome Dev Tools' console or equivalent to follow the iterations of the recursion calls and selected HTML elements
This is the interface you should see: [Cypress Interface](https://github.com/lmaero/cypress-monkey-testing/blob/main/assets/cypress-running-tests.png)
![](/assets/cypress-running-tests.png)

6. Optional: you can change some values used to run the tests, please open `/cypress/integration/monkey-testing.spec.js`
This is the interface you should see: [Cypress Interface](https://github.com/lmaero/cypress-monkey-testing/blob/main/assets/cypress-run-values.png)
![](/assets/cypress-run-values.png)
