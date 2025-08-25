// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch

require('dotenv').config({
    path: '.env.test'
});

// console.log('Estoy en test')
jest.mock('./src/helpers/getEnvironments',() =>({
    getEnvironments: () =>({...process.env})
    
}));



