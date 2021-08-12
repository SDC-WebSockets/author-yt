import http from 'k6/http';
import { check } from 'k6';

export let options = {
    scenarios: {
      constant_request_rate: {
        executor: "constant-arrival-rate",
        rate: 1000000,
        timeUnit: "1s",
        duration: "2m",
        preAllocatedVUs: 100,
        maxVUs: 300,
      },
    }
  };

export default function () {
    // const testUrl = 'http://3.15.228.199:4095/author?authorId=9123456';
    const testUrl = 'http://localhost:4095/author?authorId=9123456';
    const response = http.get(testUrl);
    check(response, {
        'response status 200': (r) => r.status === 200,
    });
}
