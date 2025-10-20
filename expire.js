// scripts/expire.js
import fetch from 'node-fetch';

const SUPABASE_URL = 'https://ztpantzzrvdxsqegwyub.supabase.co';
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

if (!SERVICE_ROLE) {
  console.error('Missing SUPABASE_SERVICE_ROLE env var');
  process.exit(1);
}

async function run() {
  const url = `${SUPABASE_URL}/rest/v1/rpc/fn_expire_inactive_users`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE,
      'Authorization': `Bearer ${SERVICE_ROLE}`
    },
    body: '{}' // no payload
  });

  if (!res.ok) {
    console.error('RPC call failed', res.status, await res.text());
    process.exit(2);
  }
  console.log('Successfully called fn_expire_inactive_users()');
}

run().catch(err => { console.error(err); process.exit(3); });
