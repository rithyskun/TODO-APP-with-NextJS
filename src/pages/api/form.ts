import type { NextApiRequest, NextApiResponse } from 'next'


type ResponseData = {
    data: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const body = req.body
    console.log('body: ' , body)

    if (!body.todo) return res.json({ data: 'Todo not found' })

    res.json({ data: `${body.todo}` })
}