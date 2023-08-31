use crate::redis::RedisConnectionPool;

pub struct Context {
    pub redis_connection_pool: RedisConnectionPool,
}

impl Context {
    pub fn new(redis_connection_pool: RedisConnectionPool) -> Self {
        Context {
            redis_connection_pool,
        }
    }
}
