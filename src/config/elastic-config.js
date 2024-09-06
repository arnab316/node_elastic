import {Client} from '@elastic/elasticsearch'

export const esClient = new Client({ node: 'http://localhost:9200' })



//? Check if Elastic Search is available or not
export const checkConnections = async() =>{
    try {
        const health = await esClient.cluster.health();
        console.log(health);
        console.log('Elasticsearch cluster health:', health.status);

    } catch (error) {
        console.log('Error connecting to Elasticsearch:', error)
    }
}

