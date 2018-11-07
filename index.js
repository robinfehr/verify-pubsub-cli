const dbWrapper = require('verify-pubsub');

require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('publish', 'Start publishing data to a key for a database type (e.g. redis) with certain throughput.', (yargs) => {
    yargs.option('dbtype', {
      desc: 'Set the database e.g. "redis"',
      alias: 'db',
      demandOption: true
    })
    .option('host', {
      desc: 'Set the host of the database',
      alias: 'h',
      demandOption: true
    })
    .option('port', {
      desc: 'Set the port of the database',
      alias: 'po',
      demandOption: true
    })
    .option('interval', {
      desc: 'Set the interval of the publisher in [ms]',
      alias: 'i',
      default: 10
    })
    .option('key', {
      desc: 'Set the key',
      alias: 'k',
      demandOption: true
    })
    .option('password', {
      desc: 'Set the password for the database',
      alias: 'p',
    })
    .option('progress', {
      desc: 'Show the progress. 1 = true, 0 = false',
      alias: 'v',
    })
  } , (argv) => {
    console.info('Publish - Starting to setup the db connection');
    new dbWrapper({
      database: argv.dbtype,
      host: argv.host,
      port: argv.port,
      password: argv.password,
      progress: !!argv.progress
    }, (db) => {
      db.startPublish(argv.key, argv.interval);
    });

  })
  .example('$0 publish --dbtype redis --interval 10 --host localhost --port 6379 --password somePassword --key fooBar', '')
  .command('listen', 'Start subscribing to a certain key for a database type', (yargs) => {
    yargs.option('dbtype', {
      desc: 'Set the database e.g. "redis"',
      alias: 'db',
      demandOption: true
    })
      .option('host', {
        desc: 'Set the host of the database',
        alias: 'h',
        demandOption: true
      })
      .option('port', {
        desc: 'Set the port of the database',
        alias: 'po',
        demandOption: true
      })
      .option('interval', {
        desc: 'Set the interval of the subscriber in [ms]',
        alias: 'i',
        default: 10
      })
      .option('key', {
        desc: 'Set the key',
        alias: 'k',
        demandOption: true
      })
      .option('password', {
        desc: 'Set the password for the database',
        alias: 'p',
      })
      .option('progress', {
        desc: 'Show the progress. 1 = true, 0 = false',
        alias: 'v',
      })
  }, (argv) => {
    console.info('Subscribe - Starting to setup the db connection');
    new dbWrapper({
      database: argv.dbtype,
      host: argv.host,
      port: argv.port,
      password: argv.password,
      progress: !!argv.progress
    }, (db) => {
      db.startListen(argv.key, argv.interval);
    });

  })
  .example('$0 subscribe --dbtype redis --host localhost --port 6379 --password somePassword --key fooBar', '')
  .demandCommand(1, 1, 'Use either the publish or subscribe command')
  // open the help if no command was provided
  .help()
  // define the column size
  .wrap(90)
  // display the version in the package.json
  .version()
  .argv
