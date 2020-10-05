const DEVTOOLS_RTT_ADJUSTMENT_FACTOR = 3.75;
const DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR = 0.7;

const config = {
  lighthouseConfig: {
    extends: "lighthouse:default",
    settings: {
      onlyCategories: ["performance"],
      disableNetworkThrottling: true,
      disableStorageReset: true,
      emulatedFormFactor: "desktop",
      throttlingMethod: "devtools",
      throttling: {
        rttMs: 280,
        throughputKbps: 1.4 * 1024,
        requestLatencyMs: 300 * DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
        downloadThroughputKbps:
          1.6 * 1024 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
        uploadThroughputKbps: 750 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
        cpuSlowdownMultiplier: 6,
      },
      connection: "threegfast",
      requestLatencyMs: 6,
    },
  },
};

module.exports = config;
