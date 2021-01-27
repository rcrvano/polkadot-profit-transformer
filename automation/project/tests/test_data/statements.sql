CREATE STREAM BLOCK_DATA (block VARCHAR, extrinsics ARRAY<VARCHAR>, events ARRAY<VARCHAR>) WITH (kafka_topic='BLOCK_DATA', value_format='JSON');CREATE STREAM BLOCK WITH (KAFKA_TOPIC='BLOCK', PARTITIONS=1, REPLICAS=1, VALUE_FORMAT='AVRO') AS SELECT CAST(EXTRACTJSONFIELD(BLOCK_DATA.BLOCK, '$.header.number') AS INTEGER) NUMBER, EXTRACTJSONFIELD(BLOCK_DATA.BLOCK, '$.header.hash') HASH, EXTRACTJSONFIELD(BLOCK_DATA.BLOCK, '$.header.stateRoot') STATE_ROOT, EXTRACTJSONFIELD(BLOCK_DATA.BLOCK, '$.header.extrinsicsRoot') EXTRINSICS_ROOT, EXTRACTJSONFIELD(BLOCK_DATA.BLOCK, '$.header.parentHash') PARENT_HASH, EXTRACTJSONFIELD(BLOCK_DATA.BLOCK, '$.header.digest') DIGEST, CAST(EXTRACTJSONFIELD(BLOCK_DATA.EXTRINSICS[1], '$.method.args.now') AS BIGINT) CREATE_TIME FROM BLOCK_DATA BLOCK_DATA EMIT CHANGES;