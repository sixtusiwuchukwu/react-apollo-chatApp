import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/notfound";
import Group from "./components/group";
import JoinGroup from "./components/joinGroup";

// import { WebSocketLink } from "apollo-link-ws";

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:2080/graphql`,
//   options: {
//     reconnect: true,
//   },
// });
// const COMMENTS_SUBSCRIPTION = gql`
//   subscription OnCommentAdded($postID: ID!) {
//     commentAdded(postID: $postID) {
//       id
//       content
//     }
//   }
// `;

// function LatestComment({ postID }) {
//   const { data: { commentAdded }, loading } = useSubscription(
//     COMMENTS_SUBSCRIPTION,
//     { variables: { postID } }
//   );
//   return <h4>New comment: {!loading && commentAdded.content}</h4>;
// }

// import {
//   ApolloClient,
//   InMemoryCache,
//   gql,
//   NormalizedCacheObject
// } from '@apollo/client';

// const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
//   uri: 'http://localhost:4000/',
//   cache: new InMemoryCache()
// });

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={JoinGroup} />
          <Route path="/letschat" component={Group} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
