
# Example broken photon functionality - specifically aws lambda

## Serverless Lambda Paths
path: /photon - working test of pure photon only call with plain http return<br/>
path: / - full graphql lambda server including nexus, not working suspect as no location to run photon.disconnect() ?<br/>
path: /graphql - simplified graphql service, returns and works correctly only if photonTest.disconnect() is called after.<br/>