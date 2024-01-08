import { Client } from 'pg'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

export const createClientAndConnect = async (): Promise<Client | null> => {
  const client = new Client({
    user: POSTGRES_USER,
    host: 'postgres',
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: Number(POSTGRES_PORT),
  })

  let attempts = 5
  while (attempts > 0) {
    try {
      await client.connect()
      console.log('Connected to the database')
      return client
    } catch (e) {
      console.error(e)
      attempts--
      console.log(`Retrying to connect, attempts left: ${attempts}`)
      await new Promise(resolve => setTimeout(resolve, 5000)) // задержка 5 секунд
    }
  }

  return null
}
