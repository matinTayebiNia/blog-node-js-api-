const Agenda = require('agenda')


const jobQueue = new Agenda({
    db: {
        address: process.env.DB_URL,
        collection: "jobs",
    },
});

jobQueue.on('start', job => {
    console.log('Job %s starting', job.attrs.name);
});

jobQueue.on('complete', job => {
    console.log(`Job ${job.attrs.name} finished`);
});


module.exports = jobQueue