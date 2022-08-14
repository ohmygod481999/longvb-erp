import React from "react";

//import Scss
import "./assets/scss/themes.scss";
import "./styles/index.scss"

//imoprt Route
import Route from "./Routes";

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// Fake Backend
import fakeBackend from "./helpers/AuthType/fakeBackend";
import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "./helpers/graphql-client.ts";

// Activating fake backend
fakeBackend();

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

function App() {
    return (
        <React.Fragment>
            <ApolloProvider client={graphqlClient}>
                <Route />
            </ApolloProvider>
        </React.Fragment>
    );
}

export default App;
