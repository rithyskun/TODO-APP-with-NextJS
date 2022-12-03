import { NextApiRequest, NextApiResponse } from 'next'
import { sampleTodoData } from '../../../utils/sample-data'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleTodoData)) {
      throw new Error('Cannot find todo data')
    }

    res.status(200).json(sampleTodoData)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler