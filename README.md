## Art Collection

It is a Art Collection portal with The Art Institute of Chicago api integration

### Steps to run the project without docker

```
npm install
npm start
```

To run the test

```
npm run test
```

To get the coverage report of the test

```
npm run test:coverage
```

The summary of the coverage report is shown below
![image](https://user-images.githubusercontent.com/20539488/189496295-171d82fe-d63c-45aa-886e-d7bd7c5527a0.png)

The project will be run in http://localhost:4200

```
npm run build
```

The build file will be stored in the dist folder. Run the dist folder to any live server

![image](https://user-images.githubusercontent.com/20539488/189496259-3a39e898-08b1-4989-b07d-798181494e92.png)

### Walkthrough

1. In the root url, you will find the Artwork Collection. If there is any image from the api, the image will be shown. Otherwise default image will be shown
2. Click on filter and choose any one them, it will show filtered artwork collection. You can choose multiple title and get result regarding those selection.
3. Click on short and select one of them, artworks will be shown as per the shorted property
4. You will see pagination at the bottom of the Artworks Collection, you can choose any page from there and you can navigate between pages by clicking on those navigations.

### Features

1. Single Page Applicaiton
2. The project is build from scratch with angular cli
3. Unit test coverage. Jest is used for implementing test spec.
4. Mobile Responsive
5. Rxjs operator is used to prevent manage subscription
6. Lazy loaded routing implemented
7. HttpClientModule used to get api data

Feel free to reach out, if you think any improvement point of the project
