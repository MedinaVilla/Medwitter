
import {environment} from "src/environments/environment";

console.log(environment)

const SERVER_URL = !environment.production
    ? "http://localhost:3000"
    :  environment;


export const STREAM_URL = `${SERVER_URL}/stream`;

export const ssEvents:EventSource = new EventSource(STREAM_URL);