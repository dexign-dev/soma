module.exports = {
  apps: [
    {
      name: 'shoutout-apis',
      script: './dist/src/main.js',
      watch: false,
      log_file: './logs/apis.log',
      error_file: './logs/error.log',
      merge_logs: true,
      instances: 'max',
      exec_mode: 'cluster',
      wait_ready: true,
      listen_timeout: 30000,
      // 로그 필터링 설정 추가
      log_type: 'json',
      log_escape: false,
      /* out_file_filter: [
        {
          exclude: true,
          pattern: /ELB-HealthChecker\/2.0.*GET \/ 200/,
        },
        {
          exclude: true,
          pattern: /GET \/ 200/,
        },
        {
          exclude: true,
          pattern: /Mapped {.*, (GET|POST|PUT|DELETE|PATCH)} route/,
        },
        {
          exclude: true,
          pattern: /{.*"context":"RouterExplorer".*}/,
        },
      ], */
    },
  ],
  pm2_logrotate: {
    retain: 5, // 로그 파일 보관 기간 (일)
    compress: true, // 로그 파일 압축 여부
    size: '100M', // 로그 파일 크기 제한
    workerInterval: '1d', // 로그 순환 주기
    rotateInterval: '0 0 * * *', // 로그 순환 주기 (cron 형식)
    rotateModule: true, // 모듈별로 로그 순환 여부
  }
};
