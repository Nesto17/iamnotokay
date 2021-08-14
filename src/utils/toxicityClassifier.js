import '@tensorflow/tfjs';

const toxicity = require('@tensorflow-models/toxicity');

const toxicityTreshold = 0.9;

export default () =>
    new Promise((resolve, reject) => {
        toxicity
            .load(toxicityTreshold)
            .then((res) => {
                if (res) resolve(res);
                else reject(res);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
