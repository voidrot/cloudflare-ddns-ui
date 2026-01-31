export default defineTask({
  meta: {
    name: 'update-ddns',
    description: 'Update DDNS records on Cloudflare',
  },
  run({ payload, context}) {
    // Your task implementation here
    console.log('Running DDNS update task...')
    return { result: 'Success' }
  }
})
