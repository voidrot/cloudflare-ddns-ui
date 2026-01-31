export default defineTask({
  meta: {
    name: 'update-ddns',
    description: 'Update DDNS records on Cloudflare',
  },
  // TODO: remove eslint comment below once payload and context are used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  run({ payload, context}) {
    // Your task implementation here
    console.log('Running DDNS update task...')
    return { result: 'Success' }
  }
})
