import http from 'k6/http';
import { check } from 'k6';

export let options = {
    scenarios: {
      constant_request_rate: {
        executor: "constant-arrival-rate",
        rate: 10000,
        timeUnit: "1s",
        duration: "30s",
        preAllocatedVUs: 100,
        maxVUs: 300,
      },
    }
  };

export default function () {
    const testUrl = 'http://localhost:4095/author?authorId=9123456789';
    const response = http.get(testUrl);
    check(response, {
        'response status 200': (r) => r.status === 200,
    });
}
