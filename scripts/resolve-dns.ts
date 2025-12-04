import dns from 'dns';

const host = 'db.lmrchyurzohxcgmqqlyo.supabase.co';

console.log(`Resolving ${host}...`);

dns.lookup(host, (err, address, family) => {
    if (err) {
        console.error('DNS Lookup Error:', err);
    } else {
        console.log(`Resolved: ${address} (IPv${family})`);
    }
});

// Also try the pooler host just in case
const pooler = 'aws-0-us-east-1.pooler.supabase.com';
console.log(`Resolving ${pooler}...`);
dns.lookup(pooler, (err, address, family) => {
    if (err) {
        console.error('Pooler DNS Lookup Error:', err);
    } else {
        console.log(`Pooler Resolved: ${address} (IPv${family})`);
    }
});
