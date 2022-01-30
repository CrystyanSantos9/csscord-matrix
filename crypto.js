const { createHmac } = require('crypto')

const secret = 'vegeta2020';

const hash = createHmac('sha256', secret).update('vermeMaldito').digest('hex')

console.log(process.env.SUPABASE_URL)
console.log(hash)
