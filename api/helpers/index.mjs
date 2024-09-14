export function checkRequiredConfigs(requiredConfig) {
  requiredConfig.forEach(name => {
    if (!process.env[name]) {
      console.error(`[Error] Missing config: ${name}`)
      process.exit(1)
    }
  })
}
