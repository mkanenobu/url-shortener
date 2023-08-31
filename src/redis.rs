use anyhow::Result;
use futures::future;
use rand::Rng;
use redis::aio::Connection;

const REDIS_URL: &str = "redis://127.0.0.1:16379/";

pub fn create_client() -> Result<redis::Client> {
    let client = redis::Client::open(REDIS_URL)?;
    Ok(client)
}

pub async fn open_connection(client: &redis::Client) -> Result<Connection> {
    let conn = client.get_tokio_connection().await?;
    Ok(conn)
}

/**
 * NOTE: redis crate がコネクションプールに対応していないので簡易なものを実装
 */
pub struct RedisConnectionPool {
    pub connections: Vec<Connection>,
}

impl RedisConnectionPool {
    async fn create_connection_pool(connection_count: usize) -> Vec<Connection> {
        let client = create_client().unwrap();

        let mut connection_open_tasks = Vec::new();

        for _ in 0..connection_count {
            let conn = open_connection(&client);
            connection_open_tasks.push(conn);
        }

        let connections = future::join_all(connection_open_tasks)
            .await
            .into_iter()
            .map(|c| c.unwrap())
            .collect();

        connections
    }

    pub async fn new(connection_count: usize) -> Self {
        let connections = Self::create_connection_pool(connection_count).await;

        Self { connections }
    }
}

impl RedisConnectionPool {
    // 利用状況は見ずにランダムなコネクションを返す
    pub fn get_connection_from_pool(&self) -> &Connection {
        let mut rng = rand::thread_rng();
        let i = rng.gen_range(0..self.connections.len());
        self.connections.get(i).unwrap()
    }
}
